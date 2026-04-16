import { AnimatePresence, motion } from "framer-motion";
import { DEFAULT_AVATAR } from "../../../shared/avatarOptions.js";

export default function ConnectedPlayersList({ players }) {
  const connectedPlayersCount = players.filter((player) => player.connected).length;

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="muted-label">Participantes</p>
          <h3 className="headline-font mt-2 text-2xl font-black text-white">
            Jogadores conectados
          </h3>
        </div>
        <span className="player-badge">{connectedPlayersCount} online</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
              className="rounded-3xl border border-white/10 bg-slate-950/40 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan/30 via-white/10 to-brand-rose/30 text-2xl shadow-[0_12px_24px_rgba(15,23,42,0.16)]">
                    {player.avatar ?? DEFAULT_AVATAR}
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">{player.name}</p>
                    <p className="text-sm text-slate-300">
                      {player.connected ? "Pronto para jogar" : "Reconectando"}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-200">#{player.position}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {players.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-white/15 bg-white/5 px-4 py-8 text-center text-slate-300">
          O lobby está esperando os primeiros alunos entrarem.
        </div>
      ) : null}
    </div>
  );
}
