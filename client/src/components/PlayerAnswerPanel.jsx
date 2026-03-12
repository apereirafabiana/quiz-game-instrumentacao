import { motion } from "framer-motion";
import { getOptionStyle } from "../lib/questionUi";

export default function PlayerAnswerPanel({
  question,
  hasAnswered,
  selectedAnswer,
  showCorrectAnswer = false,
  onSubmit
}) {
  const correctIndex = question.correctIndex;
  const correctLetter =
    typeof correctIndex === "number" ? String.fromCharCode(65 + correctIndex) : null;
  const selectedLetter =
    typeof selectedAnswer === "number" ? String.fromCharCode(65 + selectedAnswer) : null;
  const selectedWasCorrect = typeof selectedAnswer === "number" && selectedAnswer === correctIndex;

  let feedbackMessage = "Toque em uma alternativa para enviar sua resposta.";

  if (showCorrectAnswer) {
    if (hasAnswered && selectedWasCorrect) {
      feedbackMessage = `Parabéns! Você acertou a alternativa ${correctLetter}.`;
    } else if (hasAnswered && selectedLetter) {
      feedbackMessage = `Quase! Você marcou ${selectedLetter}, mas a correta era ${correctLetter}.`;
    } else {
      feedbackMessage = `Tempo encerrado. A correta era a alternativa ${correctLetter}.`;
    }
  } else if (hasAnswered) {
    feedbackMessage = "Resposta enviada. Agora é só aguardar a correção e o ranking.";
  }

  return (
    <div className="space-y-4">
      <div className="glass-panel p-5 sm:p-6">
        <p className="muted-label">
          Pergunta {question.number} de {question.totalQuestions}
        </p>
        <h1 className="headline-font mt-3 text-2xl font-black text-white sm:text-3xl">
          {question.question}
        </h1>

        {question.media?.type === "image" ? (
          <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/40 p-2">
            <img
              src={question.media.src}
              alt={question.media.alt}
              className="w-full rounded-[1rem] object-contain"
            />
          </div>
        ) : null}
      </div>

      {showCorrectAnswer ? (
        <div className="glass-panel p-4 sm:p-5">
          <p className="muted-label text-emerald-100/90">Resposta correta</p>
          <p className="headline-font mt-2 text-2xl font-black text-white">
            Alternativa {correctLetter}
          </p>
          <p className="mt-3 text-sm text-slate-200">
            {question.options[correctIndex]}
          </p>
        </div>
      ) : null}

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const optionStyle = getOptionStyle(index);
          const isSelected = selectedAnswer === index;
          const isCorrect = correctIndex === index;

          return (
            <motion.button
              key={`${question.id}-${optionStyle.letter}`}
              type="button"
              whileTap={showCorrectAnswer ? undefined : { scale: 0.98 }}
              onClick={() => onSubmit(index)}
              disabled={hasAnswered || showCorrectAnswer}
              className={`rounded-[1.7rem] border bg-gradient-to-r px-4 py-5 text-left text-base font-bold text-white transition sm:px-5 sm:py-6 sm:text-lg ${optionStyle.gradient} ${
                showCorrectAnswer
                  ? isCorrect
                    ? "border-emerald-200/80 ring-2 ring-emerald-300/80 shadow-[0_0_0_1px_rgba(167,243,208,0.25),0_18px_38px_rgba(16,185,129,0.24)]"
                    : isSelected
                      ? "border-white/30 ring-1 ring-white/30 opacity-55"
                      : "border-white/10 opacity-40"
                  : isSelected
                    ? "border-white/80 shadow-neon"
                    : "border-white/10 hover:border-white/25"
              } ${
                !showCorrectAnswer && hasAnswered && !isSelected ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black text-white ${optionStyle.badgeClass}`}
                >
                  {optionStyle.letter}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-[1.7rem] border px-4 py-4 text-center text-sm ${
          showCorrectAnswer && selectedWasCorrect
            ? "border-emerald-300/30 bg-emerald-500/12 text-emerald-50"
            : showCorrectAnswer
              ? "border-amber-300/25 bg-amber-500/10 text-amber-50"
              : "border-white/10 bg-white/10 text-slate-100"
        }`}
      >
        {feedbackMessage}
      </motion.div>
    </div>
  );
}