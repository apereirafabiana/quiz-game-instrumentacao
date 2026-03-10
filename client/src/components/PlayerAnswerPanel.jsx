import { motion } from "framer-motion";

const OPTION_THEMES = [
  "from-rose-500 to-orange-400",
  "from-cyan-500 to-blue-500",
  "from-lime-400 to-emerald-500",
  "from-fuchsia-500 to-violet-500"
];

export default function PlayerAnswerPanel({
  question,
  hasAnswered,
  selectedAnswer,
  onSubmit
}) {
  return (
    <div className="space-y-4">
      <div className="glass-panel p-5 sm:p-6">
        <p className="muted-label">
          Pergunta {question.number} de {question.totalQuestions}
        </p>
        <h1 className="headline-font mt-3 text-2xl font-black text-white sm:text-3xl">
          {question.question}
        </h1>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <motion.button
              key={option}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onSubmit(index)}
              disabled={hasAnswered}
              className={`rounded-[1.7rem] border px-4 py-5 text-left text-base font-bold text-white transition sm:px-5 sm:py-6 sm:text-lg ${
                isSelected
                  ? "border-white/80 shadow-neon"
                  : "border-white/10 hover:border-white/25"
              } ${
                hasAnswered && !isSelected ? "opacity-60" : "opacity-100"
              } bg-gradient-to-r ${OPTION_THEMES[index % OPTION_THEMES.length]}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/30 text-sm font-black">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: hasAnswered ? 1 : 0.8, scale: hasAnswered ? 1 : 0.98 }}
        className="rounded-[1.7rem] border border-white/10 bg-white/10 px-4 py-4 text-center text-sm text-slate-100"
      >
        {hasAnswered
          ? "Resposta enviada. Agora e so aguardar o ranking."
          : "Toque em uma alternativa para enviar sua resposta."}
      </motion.div>
    </div>
  );
}
