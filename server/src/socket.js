import { createGameManager } from "./game/gameManager.js";
import { createRoomStore } from "./game/roomStore.js";

function emitSocketError(socket, error) {
  socket.emit("room_error", {
    code: error.code ?? "UNKNOWN_ERROR",
    message: error.message ?? "Ocorreu um erro inesperado."
  });
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

    socket.on("submit_answer", (payload = {}) => {
      try {
        gameManager.submitAnswer(payload.roomCode, {
          playerId: payload.playerId,
          answerIndex: payload.answerIndex
        });
      } catch (error) {
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