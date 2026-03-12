import {
  DEFAULT_THEME,
  QUESTION_THEMES,
  getQuestionsForTheme
} from "../../../shared/sampleQuestions.js";
import { DEFAULT_AVATAR, normalizeAvatar } from "../../../shared/avatarOptions.js";
import {
  buildQuestionPayload,
  getCurrentQuestion,
  getQuestionProgress,
  hasPlayerAnsweredCurrentQuestion
} from "./questionEngine.js";
import { buildRanking, calculateAnswerScore } from "./scoring.js";
import { generateRoomCode } from "../utils/generateRoomCode.js";

const RANKING_DISPLAY_MS = 6500;

function createPlayer({ id, name, avatar, socketId }) {
  return {
    id,
    name,
    avatar,
    socketId,
    connected: true,
    score: 0,
    correctAnswers: 0,
    totalResponseTimeMs: 0,
    joinedAt: Date.now()
  };
}

function createRoom({ code, teacherSocketId }) {
  return {
    code,
    teacherSocketId,
    teacherConnected: true,
    createdAt: Date.now(),
    state: "lobby",
    selectedTheme: DEFAULT_THEME,
    questionIndex: -1,
    questions: getQuestionsForTheme(DEFAULT_THEME),
    players: new Map(),
    answersByQuestion: {},
    currentQuestionStartedAt: null,
    currentQuestionEndsAt: null,
    questionTimeoutId: null,
    transitionTimeoutId: null,
    transitionEndsAt: null
  };
}

function clampName(name) {
  return Array.from(`${name ?? ""}`.trim())
    .slice(0, 24)
    .join("");
}

function generatePlayerId() {
  return `player_${Math.random().toString(36).slice(2, 10)}`;
}

function getConnectedPlayerCount(room) {
  return [...room.players.values()].filter((player) => player.connected).length;
}

function ensureUniquePlayerName(room, desiredName, currentPlayerId = null) {
  const baseName = clampName(desiredName) || "Jogador";
  const existingNames = new Set(
    [...room.players.values()]
      .filter((player) => player.id !== currentPlayerId)
      .map((player) => player.name.toLocaleLowerCase())
  );

  if (!existingNames.has(baseName.toLocaleLowerCase())) {
    return baseName;
  }

  let suffix = 2;
  let candidate = `${baseName} ${suffix}`;

  while (existingNames.has(candidate.toLocaleLowerCase())) {
    suffix += 1;
    candidate = `${baseName} ${suffix}`;
  }

  return candidate;
}

function clearRoomTimers(room) {
  if (room.questionTimeoutId) {
    clearTimeout(room.questionTimeoutId);
    room.questionTimeoutId = null;
  }

  if (room.transitionTimeoutId) {
    clearTimeout(room.transitionTimeoutId);
    room.transitionTimeoutId = null;
  }
}

function hasMoreQuestions(room) {
  return room.questionIndex < room.questions.length - 1;
}

export function createGameManager({ io, roomStore }) {
  function emitRoomEvent(roomCode, eventName, payload) {
    io.to(roomCode).emit(eventName, payload);
  }

  function buildTeacherState(room) {
    const ranking = buildRanking(room.players.values());
    const question = buildQuestionPayload(room, {
      revealCorrectAnswer: room.state === "answer_reveal"
    });
    const progress = getQuestionProgress(room);
    const connectedPlayersCount = getConnectedPlayerCount(room);

    return {
      roomCode: room.code,
      phase: room.state,
      createdAt: room.createdAt,
      selectedTheme: room.selectedTheme,
      availableThemes: QUESTION_THEMES,
      players: ranking,
      connectedPlayersCount,
      canStartQuiz:
        room.state === "lobby" && connectedPlayersCount > 0 && room.questions.length > 0,
      ranking,
      question,
      answeredCount: progress.answeredCount,
      totalConnectedPlayers: progress.totalConnectedPlayers,
      transitionEndsAt: room.transitionEndsAt
    };
  }

  function buildPlayerState(room, player) {
    const ranking = buildRanking(room.players.values());
    const question = buildQuestionPayload(room, {
      revealCorrectAnswer: room.state === "answer_reveal"
    });
    const currentQuestion = getCurrentQuestion(room);
    const answerForCurrentQuestion =
      currentQuestion && room.answersByQuestion[currentQuestion.id]
        ? room.answersByQuestion[currentQuestion.id][player.id]
        : null;
    const progress = getQuestionProgress(room);
    const playerPosition =
      ranking.find((entry) => entry.id === player.id)?.position ?? ranking.length;

    return {
      roomCode: room.code,
      phase: room.state,
      selectedTheme: room.selectedTheme,
      player: {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        score: player.score,
        position: playerPosition,
        hasAnsweredCurrentQuestion: Boolean(answerForCurrentQuestion)
      },
      ranking,
      question,
      answeredCount: progress.answeredCount,
      totalConnectedPlayers: progress.totalConnectedPlayers,
      answer: answerForCurrentQuestion
        ? {
            answerIndex: answerForCurrentQuestion.answerIndex,
            isCorrect: answerForCurrentQuestion.isCorrect,
            pointsAwarded: answerForCurrentQuestion.pointsAwarded
          }
        : null,
      transitionEndsAt: room.transitionEndsAt
    };
  }

  function syncRoomState(roomCode) {
    const room = roomStore.getRoom(roomCode);

    if (!room) {
      return;
    }

    if (room.teacherSocketId) {
      io.to(room.teacherSocketId).emit("teacher_state", buildTeacherState(room));
    }

    room.players.forEach((player) => {
      if (player.connected && player.socketId) {
        io.to(player.socketId).emit("player_state", buildPlayerState(room, player));
      }
    });
  }

  function getRoomOrThrow(roomCode) {
    const normalizedCode = `${roomCode ?? ""}`.trim().toUpperCase();
    const room = roomStore.getRoom(normalizedCode);

    if (!room) {
      const error = new Error("Sala n\u00e3o encontrada.");
      error.code = "ROOM_NOT_FOUND";
      throw error;
    }

    return room;
  }

  function createUniqueRoomCode() {
    let attempts = 0;
    let roomCode = generateRoomCode();

    while (roomStore.getRoom(roomCode) && attempts < 20) {
      roomCode = generateRoomCode();
      attempts += 1;
    }

    return roomCode;
  }

  function scheduleTransition(room, delayMs, callback) {
    room.transitionEndsAt = Date.now() + delayMs;
    room.transitionTimeoutId = setTimeout(callback, delayMs);
  }

  function startQuestion(roomCode, questionIndex) {
    const room = getRoomOrThrow(roomCode);
    const nextQuestion = room.questions[questionIndex];

    if (!nextQuestion) {
      finishQuiz(roomCode);
      return;
    }

    clearRoomTimers(room);
    room.state = "question";
    room.questionIndex = questionIndex;
    room.currentQuestionStartedAt = Date.now();
    room.currentQuestionEndsAt =
      room.currentQuestionStartedAt + (nextQuestion.durationMs ?? 30000);
    room.transitionEndsAt = null;

    emitRoomEvent(room.code, "question_started", {
      roomCode: room.code,
      question: buildQuestionPayload(room)
    });

    syncRoomState(room.code);

    room.questionTimeoutId = setTimeout(() => {
      endCurrentQuestion(room.code, "timer");
    }, nextQuestion.durationMs ?? 30000);
  }

  function finishQuiz(roomCode) {
    const room = getRoomOrThrow(roomCode);
    clearRoomTimers(room);
    room.state = "final";
    room.transitionEndsAt = null;
    room.currentQuestionEndsAt = null;

    const ranking = buildRanking(room.players.values());
    emitRoomEvent(room.code, "quiz_finished", {
      roomCode: room.code,
      ranking
    });
    syncRoomState(room.code);
  }

  function goToNextStage(roomCode) {
    const room = getRoomOrThrow(roomCode);

    if (room.state === "question") {
      endCurrentQuestion(roomCode, "teacher_skip");
      return;
    }

    if (room.state === "answer_reveal") {
      showRanking(roomCode);
      return;
    }

    if (room.state === "ranking") {
      if (hasMoreQuestions(room)) {
        startQuestion(roomCode, room.questionIndex + 1);
      } else {
        finishQuiz(roomCode);
      }
    }
  }

  function showRanking(roomCode) {
    const room = getRoomOrThrow(roomCode);

    if (room.state !== "answer_reveal") {
      return;
    }

    clearRoomTimers(room);

    const ranking = buildRanking(room.players.values());
    const isLastQuestion = !hasMoreQuestions(room);

    room.state = "ranking";
    room.currentQuestionEndsAt = null;
    scheduleTransition(room, RANKING_DISPLAY_MS, () => {
      if (hasMoreQuestions(room)) {
        startQuestion(room.code, room.questionIndex + 1);
      } else {
        finishQuiz(room.code);
      }
    });

    emitRoomEvent(room.code, "ranking_update", {
      roomCode: room.code,
      ranking,
      questionNumber: room.questionIndex + 1,
      totalQuestions: room.questions.length,
      autoAdvanceAt: room.transitionEndsAt,
      isLastQuestion
    });

    syncRoomState(room.code);
  }

  function endCurrentQuestion(roomCode, reason = "timer") {
    const room = getRoomOrThrow(roomCode);

    if (room.state !== "question") {
      return;
    }

    clearRoomTimers(room);

    const ranking = buildRanking(room.players.values());
    const currentQuestion = getCurrentQuestion(room);

    room.state = "answer_reveal";
    room.currentQuestionEndsAt = null;
    room.transitionEndsAt = null;

    emitRoomEvent(room.code, "question_ended", {
      roomCode: room.code,
      reason,
      questionId: currentQuestion?.id ?? null,
      correctIndex: currentQuestion?.correctIndex ?? null,
      ranking
    });

    emitRoomEvent(room.code, "answer_revealed", {
      roomCode: room.code,
      questionId: currentQuestion?.id ?? null,
      correctIndex: currentQuestion?.correctIndex ?? null
    });

    syncRoomState(room.code);
  }

  function createTeacherRoom(socket) {
    const roomCode = createUniqueRoomCode();
    const room = createRoom({ code: roomCode, teacherSocketId: socket.id });
    roomStore.createRoom(room);
    socket.join(room.code);
    socket.emit("room_created", buildTeacherState(room));
    syncRoomState(room.code);
    return room;
  }

  function restoreTeacher(socket, { roomCode }) {
    const room = getRoomOrThrow(roomCode);
    roomStore.setTeacherSocket(room.code, socket.id);
    socket.join(room.code);
    socket.emit("teacher_restored", buildTeacherState(room));
    syncRoomState(room.code);
    return room;
  }

  function joinPlayer(socket, { roomCode, name, avatar, playerId }) {
    const room = getRoomOrThrow(roomCode);
    const normalizedName = clampName(name);
    const normalizedAvatar = normalizeAvatar(avatar);

    if (!normalizedName && !playerId) {
      const error = new Error("Informe um nome para entrar.");
      error.code = "INVALID_NAME";
      throw error;
    }

    const existingPlayer =
      playerId && room.players.has(playerId) ? room.players.get(playerId) : null;

    if (room.state !== "lobby" && !existingPlayer) {
      const error = new Error(
        room.state === "final"
          ? "O quiz j\u00e1 terminou nesta sala."
          : "O quiz j\u00e1 come\u00e7ou. Entradas novas foram bloqueadas."
      );
      error.code = "ROOM_LOCKED";
      throw error;
    }

    let player = existingPlayer;

    if (player) {
      player.name = ensureUniquePlayerName(room, normalizedName || player.name, player.id);
      player.avatar = normalizedAvatar || player.avatar || DEFAULT_AVATAR;
      roomStore.setPlayerSocket(room.code, player.id, socket.id);
    } else {
      const newPlayerId = generatePlayerId();
      player = createPlayer({
        id: newPlayerId,
        name: ensureUniquePlayerName(room, normalizedName),
        avatar: normalizedAvatar || DEFAULT_AVATAR,
        socketId: socket.id
      });
      room.players.set(player.id, player);
      roomStore.setPlayerSocket(room.code, player.id, socket.id);
    }

    socket.join(room.code);

    socket.emit("join_success", {
      roomCode: room.code,
      playerId: player.id,
      playerName: player.name,
      playerAvatar: player.avatar
    });

    emitRoomEvent(room.code, "player_joined", {
      roomCode: room.code,
      player: {
        id: player.id,
        name: player.name,
        avatar: player.avatar
      }
    });

    syncRoomState(room.code);
    return { room, player };
  }

  function setTheme(roomCode, theme) {
    const room = getRoomOrThrow(roomCode);

    if (room.state !== "lobby") {
      const error = new Error("O tema s\u00f3 pode ser alterado antes do in\u00edcio do quiz.");
      error.code = "THEME_LOCKED";
      throw error;
    }

    if (!QUESTION_THEMES.includes(theme)) {
      const error = new Error("Tema de quiz inv\u00e1lido.");
      error.code = "INVALID_THEME";
      throw error;
    }

    room.selectedTheme = theme;
    room.questions = getQuestionsForTheme(theme);
    room.questionIndex = -1;
    room.currentQuestionStartedAt = null;
    room.currentQuestionEndsAt = null;
    room.transitionEndsAt = null;
    room.answersByQuestion = {};
    clearRoomTimers(room);
    syncRoomState(room.code);
    return room;
  }

  function startQuiz(roomCode) {
    const room = getRoomOrThrow(roomCode);

    if (room.state !== "lobby") {
      const error = new Error("O quiz j\u00e1 foi iniciado.");
      error.code = "QUIZ_ALREADY_STARTED";
      throw error;
    }

    if (getConnectedPlayerCount(room) === 0) {
      const error = new Error("Adicione pelo menos um jogador conectado para iniciar.");
      error.code = "NOT_ENOUGH_PLAYERS";
      throw error;
    }

    room.questions = getQuestionsForTheme(room.selectedTheme);

    if (room.questions.length === 0) {
      const error = new Error("Este tema ainda n\u00e3o possui perguntas dispon\u00edveis.");
      error.code = "EMPTY_THEME";
      throw error;
    }

    emitRoomEvent(room.code, "quiz_started", {
      roomCode: room.code,
      totalQuestions: room.questions.length,
      theme: room.selectedTheme
    });

    startQuestion(room.code, 0);
    return room;
  }

  function submitAnswer(roomCode, { playerId, answerIndex }) {
    const room = getRoomOrThrow(roomCode);

    if (room.state !== "question") {
      const error = new Error("N\u00e3o h\u00e1 pergunta ativa neste momento.");
      error.code = "NO_ACTIVE_QUESTION";
      throw error;
    }

    const player = room.players.get(playerId);

    if (!player) {
      const error = new Error("Jogador n\u00e3o encontrado nesta sala.");
      error.code = "PLAYER_NOT_FOUND";
      throw error;
    }

    if (hasPlayerAnsweredCurrentQuestion(room, playerId)) {
      const error = new Error("Voc\u00ea j\u00e1 respondeu esta pergunta.");
      error.code = "ANSWER_ALREADY_SENT";
      throw error;
    }

    const currentQuestion = getCurrentQuestion(room);
    const elapsedMs = Date.now() - room.currentQuestionStartedAt;
    const isCorrect = currentQuestion.correctIndex === answerIndex;
    const pointsAwarded = calculateAnswerScore({
      isCorrect,
      elapsedMs,
      durationMs: currentQuestion.durationMs ?? 30000
    });

    if (!room.answersByQuestion[currentQuestion.id]) {
      room.answersByQuestion[currentQuestion.id] = {};
    }

    room.answersByQuestion[currentQuestion.id][playerId] = {
      answerIndex,
      elapsedMs,
      isCorrect,
      pointsAwarded
    };

    player.score += pointsAwarded;
    player.totalResponseTimeMs += elapsedMs;

    if (isCorrect) {
      player.correctAnswers += 1;
    }

    if (player.socketId) {
      io.to(player.socketId).emit("answer_received", {
        roomCode: room.code,
        pointsAwarded,
        isCorrect
      });
    }

    syncRoomState(room.code);

    const connectedPlayers = [...room.players.values()].filter(
      (candidate) => candidate.connected
    );
    const everyoneAnswered =
      connectedPlayers.length > 0 &&
      connectedPlayers.every((candidate) =>
        hasPlayerAnsweredCurrentQuestion(room, candidate.id)
      );

    if (everyoneAnswered) {
      emitRoomEvent(room.code, "all_answered", {
        roomCode: room.code,
        questionId: currentQuestion.id
      });
      endCurrentQuestion(room.code, "all_answered");
    }
  }

  function restartQuiz(roomCode) {
    const room = getRoomOrThrow(roomCode);
    clearRoomTimers(room);
    room.state = "lobby";
    room.questionIndex = -1;
    room.currentQuestionStartedAt = null;
    room.currentQuestionEndsAt = null;
    room.transitionEndsAt = null;
    room.questions = getQuestionsForTheme(room.selectedTheme);
    room.answersByQuestion = {};

    room.players.forEach((player) => {
      player.score = 0;
      player.correctAnswers = 0;
      player.totalResponseTimeMs = 0;
    });

    emitRoomEvent(room.code, "quiz_restarted", {
      roomCode: room.code
    });

    syncRoomState(room.code);
  }

  function handleDisconnect(socketId) {
    const session = roomStore.removeSocket(socketId);

    if (!session) {
      return;
    }

    const room = roomStore.getRoom(session.roomCode);

    if (!room) {
      return;
    }

    if (session.role === "teacher") {
      room.teacherConnected = false;
      room.teacherSocketId = null;
      return;
    }

    const player = room.players.get(session.playerId);

    if (!player) {
      return;
    }

    player.connected = false;
    player.socketId = null;
    syncRoomState(room.code);

    if (room.state === "question") {
      const connectedPlayers = [...room.players.values()].filter(
        (candidate) => candidate.connected
      );
      const everyoneAnswered =
        connectedPlayers.length > 0 &&
        connectedPlayers.every((candidate) =>
          hasPlayerAnsweredCurrentQuestion(room, candidate.id)
        );

      if (everyoneAnswered) {
        endCurrentQuestion(room.code, "all_answered");
      }
    }
  }

  return {
    createTeacherRoom,
    endCurrentQuestion,
    goToNextStage,
    handleDisconnect,
    joinPlayer,
    restartQuiz,
    restoreTeacher,
    setTheme,
    showRanking,
    startQuiz,
    submitAnswer
  };
}