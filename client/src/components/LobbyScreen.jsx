import { motion } from "framer-motion";
import ConnectedPlayersList from "./ConnectedPlayersList";
import QRJoinCard from "./QRJoinCard";

export default function LobbyScreen({
  roomCode,
  players,
  connectedPlayersCount,
  joinUrl,
  networkHint,
  selectedTheme,
  availableThemes,
  onSelectTheme,
  onStartQuiz,
  canStartQuiz
}) {
  return (
    <motion.section
      key="teacher-lobby"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
      className="stage-wrap"
    >
      <div className="grid gap-6 xl:grid-cols-[1.18fr,0.82fr]">
        <div className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="floating-orb left-[-5rem] top-[-4rem] h-40 w-40 bg-brand-cyan/25" />
          <div className="floating-orb bottom-[-4rem] right-[-4rem] h-44 w-44 bg-brand-rose/20" />

          <div className="relative z-10 flex h-full flex-col gap-8">
            <div className="max-w-3xl">
              <p className="muted-label">Lobby do professor</p>
              <h1 className="headline-font mt-4 max-w-[14ch] text-4xl font-black leading-[0.95] text-white sm:text-5xl xl:text-6xl">
                Sala pronta para receber jogadores.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
                Escolha o tema, mostre o QR Code, acompanhe a entrada da turma e inicie quando todos estiverem prontos.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/25 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="muted-label">Tema do quiz</p>
                  <h2 className="headline-font mt-3 text-2xl font-black text-white sm:text-3xl">
                    Escolha antes de iniciar
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                    Apenas as perguntas do tema selecionado entram na partida atual.
                  </p>
                </div>
                <span className="player-badge">10 perguntas por tema</span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {availableThemes.map((theme) => {
                  const isSelected = theme === selectedTheme;

                  return (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => onSelectTheme(theme)}
                      className={`rounded-[1.6rem] border px-4 py-4 text-left transition sm:px-5 ${
                        isSelected
                          ? "border-brand-cyan/55 bg-brand-cyan/12 shadow-[0_20px_42px_rgba(34,211,238,0.15)]"
                          : "border-white/10 bg-slate-950/30 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-white">
                        {theme}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {isSelected
                          ? "Tema selecionado para a pr\u00f3xima partida."
                          : "Clique para usar este conjunto de perguntas."}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 sm:p-6">
                <p className="muted-label">C\u00f3digo da sala</p>
                <p className="display-code mt-5">{roomCode}</p>
                <p className="mt-4 text-sm text-slate-300">
                  Os alunos tamb\u00e9m podem entrar digitando esse c\u00f3digo manualmente.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5 sm:p-6">
                <p className="muted-label">Conectados</p>
                <p className="mt-5 text-6xl font-black text-white">{connectedPlayersCount}</p>
                <p className="mt-3 text-sm text-slate-300">
                  jogador{connectedPlayersCount === 1 ? "" : "es"} online no momento.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/25 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Pronto para come\u00e7ar</p>
                  <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                    Quando a lista de participantes estiver certa, inicie o quiz e o tel\u00e3o muda para a primeira pergunta do tema escolhido.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onStartQuiz}
                  disabled={!canStartQuiz}
                  className="primary-button min-w-[16rem]"
                >
                  Iniciar quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-6">
          <QRJoinCard joinUrl={joinUrl} roomCode={roomCode} networkHint={networkHint} />
          <ConnectedPlayersList players={players} />
        </div>
      </div>
    </motion.section>
  );
}