import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { formatJoinUrl } from "../lib/api";

export default function QRJoinCard({ joinUrl, roomCode, networkHint }) {
  const visibleJoinUrl = formatJoinUrl(joinUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-panel flex h-full flex-col justify-between p-5 sm:p-6"
    >
      <div>
        <p className="muted-label">Entrada pelo celular</p>
        <h3 className="headline-font mt-2 text-2xl font-black text-white">
          QR Code da sala
        </h3>
        <p className="mt-3 max-w-sm text-sm text-slate-300">
          Escaneie o QR Code ou digite o endere\u00e7o exibido abaixo no navegador do celular.
        </p>
      </div>

      <div className="my-6 flex items-center justify-center rounded-[2rem] bg-white p-5 shadow-neon">
        {joinUrl ? <QRCode value={joinUrl} size={210} /> : <span className="text-slate-900">QR indispon\u00edvel</span>}
      </div>

      <div className="space-y-3">
        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">C\u00f3digo</p>
          <p className="mt-2 text-2xl font-black tracking-[0.28em] text-white">{roomCode}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Endere\u00e7o para o celular</p>
          <p className="mt-2 break-all text-sm font-semibold leading-6 text-slate-100">
            {visibleJoinUrl || "URL indispon\u00edvel"}
          </p>
        </div>

        <p className="text-xs leading-6 text-slate-300">{networkHint}</p>
      </div>
    </motion.div>
  );
}
