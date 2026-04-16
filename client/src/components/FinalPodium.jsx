import { motion } from "framer-motion";
import { DEFAULT_AVATAR } from "../../../shared/avatarOptions.js";

const CONFETTI = [
  { left: "6%", delay: 0.1, color: "bg-brand-cyan" },
  { left: "13%", delay: 0.25, color: "bg-brand-gold" },
  { left: "21%", delay: 0.05, color: "bg-brand-rose" },
  { left: "29%", delay: 0.35, color: "bg-brand-lime" },
  { left: "37%", delay: 0.15, color: "bg-brand-coral" },
  { left: "46%", delay: 0.42, color: "bg-brand-cyan" },
  { left: "55%", delay: 0.22, color: "bg-brand-gold" },
  { left: "64%", delay: 0.3, color: "bg-brand-rose" },
  { left: "72%", delay: 0.12, color: "bg-brand-lime" },
  { left: "80%", delay: 0.4, color: "bg-brand-coral" },
  { left: "88%", delay: 0.18, color: "bg-brand-cyan" }
];

const PODIUM_STYLES = {
  1: {
    label: "Campeão",
    trophy: "🏆",
    heightClass: "h-64",
    cardClass: "from-amber-300/38 via-yellow-400/24 to-amber-700/12 border-amber-200/45",
    glowClass: "shadow-[0_28px_70px_rgba(245,158,11,0.34)] ring-2 ring-amber-200/35",
    pedestalClass: "from-amber-300/35 via-yellow-400/20 to-amber-700/20",
    trophyClass: "text-amber-200"
  },
  2: {
    label: "Vice",
    trophy: "🏆",
    heightClass: "h-52",
    cardClass: "from-slate-200/22 via-slate-300/12 to-slate-500/10 border-slate-200/25",
    glowClass: "shadow-[0_20px_50px_rgba(203,213,225,0.18)]",
    pedestalClass: "from-slate-200/25 via-slate-300/12 to-slate-600/20",
    trophyClass: "text-slate-100"
  },
  3: {
    label: "Top 3",
    trophy: "🏆",
    heightClass: "h-44",
    cardClass: "from-orange-400/28 via-amber-500/14 to-orange-900/12 border-orange-300/25",
    glowClass: "shadow-[0_18px_44px_rgba(249,115,22,0.18)]",
    pedestalClass: "from-orange-300/25 via-amber-500/12 to-orange-900/18",
    trophyClass: "text-orange-100"
  }
};

function PodiumColumn({ entry, playerId }) {
  if (!entry) {
    return null;
  }

  const style = PODIUM_STYLES[entry.position] ?? PODIUM_STYLES[3];
  const isCurrentPlayer = entry.id === playerId;

  return (
    <div className="flex flex-1 flex-col items-center justify-end gap-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.42 }}
        className={`w-full rounded-[2.2rem] border bg-gradient-to-br px-5 py-6 text-center ${style.cardClass} ${style.glowClass} ${
          isCurrentPlayer ? "ring-2 ring-brand-cyan" : ""
        }`}
      >
        <div
          className={`mx-auto text-5xl drop-shadow-[0_14px_26px_rgba(15,23,42,0.24)] ${style.trophyClass}`}
        >
          {style.trophy}
        </div>
        <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-[1.8rem] border border-white/15 bg-white/10 text-5xl shadow-[0_14px_30px_rgba(15,23,42,0.18)]">
          {entry.avatar ?? DEFAULT_AVATAR}
        </div>
        <p className="mt-4 text-xs font-black uppercase tracking-[0.28em] text-slate-100/80">
          {style.label}
        </p>
        <p className="headline-font mt-3 text-2xl font-black text-white sm:text-3xl">
          {entry.name}
        </p>
        <p className="mt-3 text-lg font-black text-white">{entry.score} pts</p>
        <p className="mt-1 text-sm text-slate-200/80">{entry.correctAnswers} acertos</p>
      </motion.div>

      <motion.div
        initial={{ scaleY: 0.3, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.42, delay: 0.06 }}
        className={`flex w-full origin-bottom flex-col items-center justify-center rounded-t-[2.2rem] border border-white/10 bg-gradient-to-b px-4 py-4 text-white ${style.pedestalClass} ${style.heightClass}`}
      >
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">Lugar</span>
        <span className="headline-font mt-2 text-5xl font-black">{entry.position}º</span>
      </motion.div>
    </div>
  );
}

export default function FinalPodium({
  ranking,
  playerId,
  onRestart,
  onNewRoom,
  showTeacherActions = false
}) {
  const [first, second, third] = [ranking[0], ranking[1], ranking[2]];
  const remainingPlayers = ranking.slice(3);

  return (
    <motion.section
      key="final-podium"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
      className="stage-wrap overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {CONFETTI.map((piece, index) => (
          <motion.span
            key={`${piece.left}-${index}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: [0, 1, 1], y: [0, 180, 420], rotate: [0, 80, 220] }}
            transition={{ repeat: Infinity, duration: 4.6, delay: piece.delay, ease: "easeIn" }}
            className={`absolute top-0 h-4 w-2 rounded-full ${piece.color}`}
            style={{ left: piece.left }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="text-center">
          <p className="muted-label">Fim de jogo</p>
          <h1 className="projection-title mt-4">Pódio final</h1>
          <p className="mt-4 text-lg text-slate-200">
            A partida terminou em clima de competição, com destaque total para os três melhores
            colocados.
          </p>
        </div>

        <div className="glass-panel overflow-hidden p-5 sm:p-8">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 md:items-end">
            <PodiumColumn entry={second} playerId={playerId} />
            <PodiumColumn entry={first} playerId={playerId} />
            <PodiumColumn entry={third} playerId={playerId} />
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="muted-label">Demais colocações</p>
              <h3 className="headline-font mt-2 text-2xl font-black text-white">
                Ranking completo
              </h3>
            </div>
            <span className="player-badge">{ranking.length} jogadores</span>
          </div>

          <div className="mt-5 grid gap-3">
            {remainingPlayers.length > 0 ? (
              remainingPlayers.map((entry) => (
                <div
                  key={entry.id}
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
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                        {entry.avatar ?? DEFAULT_AVATAR}
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">{entry.name}</p>
                        <p className="text-sm text-slate-300">{entry.correctAnswers} acertos</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-black text-white">{entry.score} pts</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-slate-300">
                Só houve três participantes nesta rodada.
              </div>
            )}
          </div>
        </div>

        {showTeacherActions ? (
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onRestart} className="primary-button min-w-[15rem]">
              Jogar novamente
            </button>
            <button type="button" onClick={onNewRoom} className="secondary-button min-w-[15rem]">
              Nova sala
            </button>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}
