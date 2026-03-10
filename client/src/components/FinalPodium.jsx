import { motion } from "framer-motion";

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

function PodiumBlock({ entry, heightClass, tintClass, playerId }) {
  if (!entry) {
    return null;
  }

  const isCurrentPlayer = entry.id === playerId;

  return (
    <div className="flex flex-1 flex-col items-center justify-end gap-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full rounded-[2rem] border px-4 py-6 text-center ${
          isCurrentPlayer ? "ring-2 ring-brand-cyan" : ""
        } ${tintClass}`}
      >
        <p className="headline-font text-2xl font-black text-white">{entry.name}</p>
        <p className="mt-2 text-base font-semibold text-slate-100">{entry.score} pts</p>
        <p className="mt-1 text-sm text-slate-300">{entry.correctAnswers} acertos</p>
      </motion.div>
      <motion.div
        initial={{ scaleY: 0.3, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`flex w-full origin-bottom items-center justify-center rounded-t-[2rem] border border-white/10 bg-white/10 text-4xl font-black text-white ${heightClass}`}
      >
        {entry.position}
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
          <h1 className="projection-title mt-4">Podio final</h1>
          <p className="mt-4 text-lg text-slate-200">
            O quiz terminou com um clima de competicao pronto para sala de aula.
          </p>
        </div>

        <div className="glass-panel overflow-hidden p-5 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3 md:items-end">
            <PodiumBlock
              entry={second}
              heightClass="h-40"
              tintClass="border-slate-200/20 bg-slate-200/10"
              playerId={playerId}
            />
            <PodiumBlock
              entry={first}
              heightClass="h-52"
              tintClass="border-amber-200/30 bg-amber-300/12"
              playerId={playerId}
            />
            <PodiumBlock
              entry={third}
              heightClass="h-32"
              tintClass="border-orange-200/20 bg-orange-300/10"
              playerId={playerId}
            />
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="muted-label">Demais colocacoes</p>
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
                    <div>
                      <p className="text-base font-bold text-white">{entry.name}</p>
                      <p className="text-sm text-slate-300">{entry.correctAnswers} acertos</p>
                    </div>
                  </div>
                  <p className="text-lg font-black text-white">{entry.score} pts</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-slate-300">
                So houve tres participantes nesta rodada.
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
