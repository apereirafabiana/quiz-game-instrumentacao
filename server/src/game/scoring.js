export function calculateAnswerScore({
  isCorrect,
  elapsedMs,
  durationMs,
  maxScore = 1000
}) {
  if (!isCorrect) {
    return 0;
  }

  const safeDuration = Math.max(durationMs, 1);
  const clampedElapsed = Math.min(Math.max(elapsedMs, 0), safeDuration);
  const remainingRatio = (safeDuration - clampedElapsed) / safeDuration;
  const timeFactor = Math.max(0.25, remainingRatio);

  return Math.round(maxScore * timeFactor);
}

export function buildRanking(players) {
  return [...players]
    .sort((leftPlayer, rightPlayer) => {
      if (rightPlayer.score !== leftPlayer.score) {
        return rightPlayer.score - leftPlayer.score;
      }

      if (rightPlayer.correctAnswers !== leftPlayer.correctAnswers) {
        return rightPlayer.correctAnswers - leftPlayer.correctAnswers;
      }

      if (leftPlayer.totalResponseTimeMs !== rightPlayer.totalResponseTimeMs) {
        return leftPlayer.totalResponseTimeMs - rightPlayer.totalResponseTimeMs;
      }

      return leftPlayer.joinedAt - rightPlayer.joinedAt;
    })
    .map((player, index) => ({
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      score: player.score,
      correctAnswers: player.correctAnswers,
      connected: player.connected,
      position: index + 1
    }));
}