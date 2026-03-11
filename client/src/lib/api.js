function normalizeBaseUrl(url) {
  if (!url) {
    return "";
  }

  return /^https?:\/\//i.test(url) ? url : `http://${url}`;
}

export const API_BASE_URL =
  import.meta.env.DEV && import.meta.env.VITE_SERVER_URL
    ? import.meta.env.VITE_SERVER_URL
    : "";

export async function fetchServerMeta() {
  const response = await fetch(`${API_BASE_URL}/api/meta`);

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os dados do servidor.");
  }

  return response.json();
}

export function buildJoinUrl({ roomCode, suggestedJoinBaseUrl }) {
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "";
  const isLocalHost = ["localhost", "127.0.0.1"].includes(currentHost);
  const preferredBaseUrl = isLocalHost
    ? suggestedJoinBaseUrl || currentOrigin
    : currentOrigin || suggestedJoinBaseUrl;
  const normalizedBaseUrl = normalizeBaseUrl(preferredBaseUrl);

  if (!normalizedBaseUrl) {
    return "";
  }

  return `${normalizedBaseUrl.replace(/\/$/, "")}/join?room=${encodeURIComponent(roomCode)}`;
}

export function formatJoinUrl(joinUrl) {
  return joinUrl ? joinUrl.replace(/^https?:\/\//i, "") : "";
}