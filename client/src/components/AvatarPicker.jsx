import { motion } from "framer-motion";
import { AVATAR_OPTIONS } from "../../../shared/avatarOptions.js";

export default function AvatarPicker({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="muted-label">Avatar</p>
          <p className="mt-2 text-sm text-slate-300">
            Escolha um emoji para aparecer no lobby, no ranking e no p\u00f3dio.
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-white/10 bg-slate-950/40 text-3xl shadow-[0_12px_24px_rgba(15,23,42,0.18)]">
          {value}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {AVATAR_OPTIONS.map((avatar) => {
          const isSelected = avatar === value;

          return (
            <motion.button
              key={avatar}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(avatar)}
              className={`flex h-14 items-center justify-center rounded-[1.3rem] border text-2xl transition sm:h-16 sm:text-3xl ${
                isSelected
                  ? "border-brand-cyan/60 bg-brand-cyan/12 ring-2 ring-brand-cyan/40"
                  : "border-white/10 bg-slate-950/35 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {avatar}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}