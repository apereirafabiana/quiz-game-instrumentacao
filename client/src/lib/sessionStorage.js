const PLAYER_SESSION_KEY = "quiz-game-player-session";
const TEACHER_SESSION_KEY = "quiz-game-teacher-session";

export function saveTeacherRoom(roomCode) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TEACHER_SESSION_KEY, roomCode);
}

export function getTeacherRoom() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TEACHER_SESSION_KEY);
}

export function clearTeacherRoom() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TEACHER_SESSION_KEY);
}

export function savePlayerSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PLAYER_SESSION_KEY, JSON.stringify(session));
}

export function getPlayerSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = window.localStorage.getItem(PLAYER_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    return null;
  }
}

export function clearPlayerSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PLAYER_SESSION_KEY);
}
