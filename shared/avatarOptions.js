export const AVATAR_OPTIONS = [
  "\u{1F600}",
  "\u{1F60E}",
  "\u{1F916}",
  "\u{1F393}",
  "\u{1F4DA}",
  "\u2699\uFE0F",
  "\u{1F527}",
  "\u{1F4A1}",
  "\u{1F680}",
  "\u{1F3C6}"
];

export const DEFAULT_AVATAR = "\u{1F393}";

export function normalizeAvatar(avatar) {
  return AVATAR_OPTIONS.includes(avatar) ? avatar : DEFAULT_AVATAR;
}