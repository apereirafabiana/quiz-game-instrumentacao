import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getRemainingMs(deadlineAt) {
  return deadlineAt ? Math.max(deadlineAt - Date.now(), 0) : 0;
}

export default function TimerBar({ deadlineAt, durationMs }) {
  const [remainingMs, setRemainingMs] = useState(getRemainingMs(deadlineAt));

  useEffect(() => {
    setRemainingMs(getRemainingMs(deadlineAt));

    if (!deadlineAt) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setRemainingMs(getRemainingMs(deadlineAt));
    }, 120);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [deadlineAt]);

  const secondsRemaining = Math.ceil(remainingMs / 1000);
  const progress = durationMs ? (remainingMs / durationMs) * 100 : 0;
  const isDanger = remainingMs <= 7000;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="muted-label">Tempo restante</span>
        <span
          className={`headline-font text-4xl font-black sm:text-5xl ${
            isDanger ? "text-brand-gold" : "text-white"
          }`}
        >
          {secondsRemaining}s
        </span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.12 }}
          className={`h-full rounded-full ${
            isDanger
              ? "bg-gradient-to-r from-brand-gold to-brand-coral"
              : "bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-lime"
          }`}
        />
      </div>
    </div>
  );
}
