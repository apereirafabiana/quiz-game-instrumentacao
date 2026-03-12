export function getCurrentQuestion(room) {
  if (room.questionIndex < 0 || room.questionIndex >= room.questions.length) {
    return null;
  }

  return room.questions[room.questionIndex];
}

export function buildQuestionPayload(room, options = {}) {
  const question = getCurrentQuestion(room);

  if (!question) {
    return null;
  }

  const revealCorrectAnswer = options.revealCorrectAnswer ?? room.state === "answer_reveal";

  return {
    id: question.id,
    number: room.questionIndex + 1,
    totalQuestions: room.questions.length,
    question: question.question,
    options: [...question.options],
    durationMs: question.durationMs ?? 30000,
    deadlineAt: room.state === "question" ? room.currentQuestionEndsAt : null,
    correctIndex: revealCorrectAnswer ? question.correctIndex : null,
    media: question.media ? { ...question.media } : null
  };
}

export function hasPlayerAnsweredCurrentQuestion(room, playerId) {
  const question = getCurrentQuestion(room);

  if (!question) {
    return false;
  }

  return Boolean(room.answersByQuestion[question.id]?.[playerId]);
}

export function getConnectedPlayers(room) {
  return [...room.players.values()].filter((player) => player.connected);
}

export function getQuestionProgress(room) {
  const question = getCurrentQuestion(room);

  if (!question) {
    return {
      answeredCount: 0,
      totalConnectedPlayers: getConnectedPlayers(room).length
    };
  }

  const answersForQuestion = room.answersByQuestion[question.id] ?? {};
  const connectedPlayers = getConnectedPlayers(room);
  const answeredCount = connectedPlayers.filter(
    (player) => answersForQuestion[player.id]
  ).length;

  return {
    answeredCount,
    totalConnectedPlayers: connectedPlayers.length
  };
}