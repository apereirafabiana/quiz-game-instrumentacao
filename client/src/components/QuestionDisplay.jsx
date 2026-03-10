import { motion } from "framer-motion";
import TimerBar from "./TimerBar";

export default function QuestionDisplay({
  question,
  answeredCount,
  totalPlayers,
  onForceContinue
}) {
  return (
    <motion.section
      key={`teacher-question-${question?.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.3 }}
      className="stage-wrap items-center"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <span className="player-badge mb-6">
          Pergunta {question.number} de {question.totalQuestions}
        </span>
        <h1 className="projection-title max-w-4xl">{question.question}</h1>
        <div className="mt-10 w-full max-w-3xl">
          <TimerBar deadlineAt={question.deadlineAt} durationMs={question.durationMs} />
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold text-slate-100">
            {answeredCount} de {totalPlayers} responderam
          </div>
          <button type="button" onClick={onForceContinue} className="secondary-button">
            Encerrar etapa agora
          </button>
        </div>
      </div>
    </motion.section>
  );
}
