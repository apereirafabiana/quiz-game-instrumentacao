export function createRoomStore() {
  const rooms = new Map();
  const socketSessions = new Map();

  function getRoom(roomCode) {
    return rooms.get(roomCode);
  }

  function createRoom(room) {
    rooms.set(room.code, room);

    if (room.teacherSocketId) {
      socketSessions.set(room.teacherSocketId, {
        roomCode: room.code,
        role: "teacher"
      });
    }

    return room;
  }

  function setTeacherSocket(roomCode, socketId) {
    const room = getRoom(roomCode);

    if (!room) {
      return null;
    }

    if (room.teacherSocketId && room.teacherSocketId !== socketId) {
      socketSessions.delete(room.teacherSocketId);
    }

    room.teacherSocketId = socketId;
    room.teacherConnected = true;
    socketSessions.set(socketId, { roomCode, role: "teacher" });

    return room;
  }

  function setPlayerSocket(roomCode, playerId, socketId) {
    const room = getRoom(roomCode);
    const player = room?.players.get(playerId);

    if (!room || !player) {
      return null;
    }

    if (player.socketId && player.socketId !== socketId) {
      socketSessions.delete(player.socketId);
    }

    player.socketId = socketId;
    player.connected = true;
    socketSessions.set(socketId, { roomCode, role: "player", playerId });

    return player;
  }

  function removeSocket(socketId) {
    const session = socketSessions.get(socketId);

    if (!session) {
      return null;
    }

    socketSessions.delete(socketId);
    return session;
  }

  function getSessionBySocket(socketId) {
    return socketSessions.get(socketId) ?? null;
  }

  function deleteRoom(roomCode) {
    const room = rooms.get(roomCode);

    if (!room) {
      return;
    }

    if (room.teacherSocketId) {
      socketSessions.delete(room.teacherSocketId);
    }

    room.players.forEach((player) => {
      if (player.socketId) {
        socketSessions.delete(player.socketId);
      }
    });

    rooms.delete(roomCode);
  }

  return {
    createRoom,
    deleteRoom,
    getRoom,
    getSessionBySocket,
    removeSocket,
    rooms,
    setPlayerSocket,
    setTeacherSocket
  };
}
