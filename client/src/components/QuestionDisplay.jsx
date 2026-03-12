import { motion } from "framer-motion";
import { getOptionStyle } from "../lib/questionUi";
import TimerBar from "./TimerBar";

function optionStyleKey(index) {
  return getOptionStyle(index).letter;
}

function ProjectedOption({ option, index, correctIndex, showCorrectAnswer }) {
  const optionStyle = getOptionStyle(index);
  const isCorrect = correctIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[2rem] border bg-gradient-to-r px-5 py-5 text-left text-white transition md:px-6 md:py-6 ${optionStyle.gradient} ${
        showCorrectAnswer
          ? isCorrect
            ? "border-emerald-200/80 ring-2 ring-emerald-300/80 shadow-[0_0_0_1px_rgba(167,243,208,0.25),0_24px_55px_rgba(16,185,129,0.28)]"
            : "border-white/10 opacity-40"
          : "border-white/15 shadow-[0_18px_38px_rgba(15,23,42,0.22)]"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white ${optionStyle.badgeClass}`}
        >
          {optionStyle.letter}
        </span>
        <span className="text-lg font-bold leading-snug sm:text-xl xl:text-2xl">{option}</span>
      </div>
    </motion.div>
  );
}

export default function QuestionDisplay({
  question,
  answeredCount,
  totalPlayers,
  selectedTheme,
  showCorrectAnswer = false,
  onForceContinue
}) {
  const correctLetter =
    typeof question.correctIndex === "number"
      ? String.fromCharCode(65 + question.correctIndex)
      : null;

  return (
    <motion.section
      key={`teacher-question-${question?.id}-${showCorrectAnswer ? "reveal" : "live"}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.3 }}
      className="stage-wrap"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="player-badge">Tema: {selectedTheme}</span>
            <span className="player-badge">
              Pergunta {question.number} de {question.totalQuestions}
            </span>
            <span className="player-badge">
              {answeredCount} de {totalPlayers} responderam
            </span>
          </div>

          <h1 className="projection-title mx-auto mt-6 max-w-5xl">{question.question}</h1>

          {question.media?.type === "image" ? (
            <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/35 p-3">
              <img
                src={question.media.src}
                alt={question.media.alt}
                className="mx-auto max-h-[20rem] w-full rounded-[1.4rem] object-contain"
              />
            </div>
          ) : null}

          <div className="mx-auto mt-6 w-full max-w-4xl">
            {showCorrectAnswer ? (
              <div className="rounded-[1.6rem] border border-emerald-300/30 bg-emerald-400/12 px-5 py-5 text-center">
                <p className="muted-label text-emerald-100/90">Resposta correta</p>
                <p className="headline-font mt-3 text-2xl font-black text-white sm:text-3xl">
                  Alternativa {correctLetter}
                </p>
                <p className="mt-3 text-sm text-emerald-50/85 sm:text-base">
                  A resposta correta fica em destaque. Comente com a turma e avance quando quiser.
                </p>
              </div>
            ) : (
              <TimerBar deadlineAt={question.deadlineAt} durationMs={question.durationMs} />
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {question.options.map((option, index) => (
            <ProjectedOption
              key={`${question.id}-${optionStyleKey(index)}-${option}`}
              option={option}
              index={index}
              correctIndex={question.correctIndex}
              showCorrectAnswer={showCorrectAnswer}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold text-slate-100">
            {showCorrectAnswer
              ? "Professor no controle: avance para o ranking quando terminar o comentário."
              : `${answeredCount} de ${totalPlayers} responderam`}
          </div>
          <button type="button" onClick={onForceContinue} className="secondary-button">
            {showCorrectAnswer ? "Mostrar ranking" : "Encerrar pergunta agora"}
          </button>
        </div>
      </div>
    </motion.section>
  );
}