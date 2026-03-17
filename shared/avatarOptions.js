export const AVATAR_OPTIONS = [
  "😀",
  "😎",
  "🤖",
  "🎓",
  "📚",
  "⚙️",
  "🔧",
  "💡",
  "🚀",
  "🏆"
];

export const DEFAULT_AVATAR = "🎓";

export function normalizeAvatar(avatar) {
  return AVATAR_OPTIONS.includes(avatar) ? avatar : DEFAULT_AVATAR;
}