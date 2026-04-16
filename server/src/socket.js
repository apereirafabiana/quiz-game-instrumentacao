import { createGameManager } from "./game/gameManager.js";
import { createRoomStore } from "./game/roomStore.js";

function buildSocketErrorPayload(error) {
  return {
    code: error.code ?? "UNKNOWN_ERROR",
    message: error.message ?? "Ocorreu um erro inesperado."
  };
}

function emitSocketError(socket, error) {
  socket.emit("room_error", buildSocketErrorPayload(error));
}

export function registerSocketHandlers(io) {
  const roomStore = createRoomStore();
  const gameManager = createGameManager({ io, roomStore });

  io.on("connection", (socket) => {
    socket.on("create_room", () => {
      try {
        gameManager.createTeacherRoom(socket);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("restore_teacher", (payload = {}) => {
      try {
        gameManager.restoreTeacher(socket, payload);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("join_room", (payload = {}) => {
      try {
        gameManager.joinPlayer(socket, payload);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("set_quiz_theme", (payload = {}) => {
      try {
        gameManager.setTheme(payload.roomCode, payload.theme);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("start_quiz", (payload = {}) => {
      try {
        gameManager.startQuiz(payload.roomCode);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("next_question", (payload = {}) => {
      try {
        gameManager.goToNextStage(payload.roomCode);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("submit_answer", (payload = {}, callback) => {
      try {
        const result = gameManager.submitAnswer(payload.roomCode, {
          playerId: payload.playerId,
          answerIndex: payload.answerIndex
        });

        if (typeof callback === "function") {
          callback({
            ok: true,
            ...result
          });
        }
      } catch (error) {
        if (typeof callback === "function") {
          callback({
            ok: false,
            ...buildSocketErrorPayload(error)
          });
          return;
        }

        emitSocketError(socket, error);
      }
    });

    socket.on("restart_quiz", (payload = {}) => {
      try {
        gameManager.restartQuiz(payload.roomCode);
      } catch (error) {
        emitSocketError(socket, error);
      }
    });

    socket.on("disconnect", () => {
      gameManager.handleDisconnect(socket.id);
    });
  });
}
