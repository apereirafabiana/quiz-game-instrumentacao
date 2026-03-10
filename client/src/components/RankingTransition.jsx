import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MEDALS = {
  1: {
    label: "Ouro",
    badge: "1",
    cardClass: "from-amber-300/35 to-yellow-500/15 border-amber-200/40",
    glowClass: "shadow-[0_18px_40px_rgba(245,158,11,0.2)]"
  },
  2: {
    label: "Prata",
    badge: "2",
    cardClass: "from-slate-200/20 to-slate-400/10 border-slate-200/25",
    glowClass: "shadow-[0_18px_40px_rgba(203,213,225,0.14)]"
  },
  3: {
    label: "Bronze",
    badge: "3",
    cardClass: "from-orange-400/25 to-amber-600/10 border-orange-300/25",
    glowClass: "shadow-[0_18px_40px_rgba(249,115,22,0.14)]"
  }
};

function getCountdown(deadlineAt) {
  return deadlineAt ? Math.max(Math.ceil((deadlineAt - Date.now()) / 1000), 0) : 0;
}

function TopCard({ entry, playerId }) {
  if (!entry) {
    return null;
  }

  const medal = MEDALS[entry.position] ?? MEDALS[3];
  const isCurrentPlayer = entry.id === playerId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[2rem] border bg-gradient-to-br p-5 sm:p-6 ${medal.cardClass} ${medal.glowClass} ${
        isCurrentPlayer ? "ring-2 ring-brand-cyan" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-100/80">
          {medal.label}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl font-black text-white">
          {medal.badge}
        </span>
      </div>
      <p className="headline-font mt-8 text-2xl font-black text-white sm:text-3xl">
        {entry.name}
      </p>
      <p className="mt-3 text-lg font-bold text-slate-100">{entry.score} pts</p>
      <p className="mt-2 text-sm text-slate-200/80">{entry.correctAnswers} acertos</p>
    </motion.div>
  );
}

export default function RankingTransition({
  ranking,
  playerId,
  autoAdvanceAt,
  onContinue,
  title = "Ranking parcial",
  subtitle = "A disputa esta esquentando.",
  showContinueButton = false
}) {
  const [countdown, setCountdown] = useState(getCountdown(autoAdvanceAt));

  useEffect(() => {
    setCountdown(getCountdown(autoAdvanceAt));

    if (!autoAdvanceAt) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCountdown(getCountdown(autoAdvanceAt));
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [autoAdvanceAt]);

  const topThree = [ranking[1], ranking[0], ranking[2]].filter(Boolean);
  const remainingPlayers = ranking.slice(3);

  return (
    <motion.section
      key="ranking-screen"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
      className="stage-wrap"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="text-center">
          <p className="muted-label">Etapa concluida</p>
          <h1 className="projection-title mt-4">{title}</h1>
          <p className="mt-4 text-lg text-slate-200">{subtitle}</p>
          {autoAdvanceAt ? (
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">
              Proxima etapa em {countdown}s
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {topThree.map((entry) => (
            <TopCard key={entry.id} entry={entry} playerId={playerId} />
          ))}
        </div>

        <div className="glass-panel p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="muted-label">Classificacao</p>
              <h3 className="headline-font mt-2 text-2xl font-black text-white">
                Placar atualizado
              </h3>
            </div>
            <span className="player-badge">{ranking.length} participantes</span>
          </div>

          <div className="mt-5 grid gap-3">
            {remainingPlayers.length > 0 ? (
              remainingPlayers.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center justify-between gap-4 rounded-3xl border px-4 py-4 ${
                    entry.id === playerId
                      ? "border-brand-cyan/40 bg-brand-cyan/10"
                      : "border-white/10 bg-slate-950/35"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-black text-white">
                      {entry.position}
                    </span>
                    <div>
                      <p className="text-base font-bold text-white">{entry.name}</p>
                      <p className="text-sm text-slate-300">{entry.correctAnswers} acertos</p>
                    </div>
                  </div>
                  <p className="text-lg font-black text-white">{entry.score} pts</p>
                </motion.div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-slate-300">
                O podio ja esta completo acima.
              </div>
            )}
          </div>
        </div>

        {showContinueButton ? (
          <div className="flex justify-center">
            <button type="button" onClick={onContinue} className="secondary-button min-w-[14rem]">
              Continuar agora
            </button>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}
