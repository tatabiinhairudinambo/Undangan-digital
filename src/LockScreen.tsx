import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { GraduationCap, LockKeyhole } from "lucide-react";
import { getGuestName } from "../lib/guest";
import { Clock } from "../components/Clock";
import FloralCardFrame from "./FloralCardFrame";
import { useNotificationSound } from "./useNotificationSound";

interface LockScreenProps {
  y: MotionValue<number>;
  onUnlock: () => void;
  ready: boolean;
}

export default function LockScreen({ y, onUnlock, ready }: LockScreenProps) {
  const radius = useTransform(y, [-150, 0], [48, 0], { clamp: true });
  const reduceMotion = useReducedMotion();
  const notificationDelay = reduceMotion ? 0 : 0.5;
  useNotificationSound(ready, notificationDelay);

  return (
    <motion.div
      style={{
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        backgroundImage: "linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.2) 35%, rgba(0,0,0,.65)), url('/wallpaper-lock.jpeg')",
        color: "#fff",
      }}
      className="relative w-full h-full font-sans bg-cover bg-center bg-no-repeat overflow-y-auto"
    >
      <div className="relative flex min-h-full flex-col items-center px-6 pb-10 pt-6 text-center">
        <LockKeyhole size={22} strokeWidth={2.5} aria-hidden="true" />
        <Clock showDate />
        <motion.button
          type="button"
          onClick={onUnlock}
          aria-label="Buka undangan wisuda"
          initial={{ opacity: 0, y: -180 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : -180 }}
          transition={{ delay: ready ? notificationDelay : 0, duration: reduceMotion ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-6 w-full cursor-pointer rounded-[26px] border border-white/70 bg-white/55 px-8 py-7 text-left text-[#1c1c1e] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_32px_rgba(0,0,0,0.15)] backdrop-blur-[6px] backdrop-saturate-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <FloralCardFrame />
          <div className="relative">
          <div className="flex items-center justify-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#007aff] text-white"><GraduationCap size={21} aria-hidden="true" /></span>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#48484a]">Undangan Wisuda</p>
          </div>
          <h1 className="mt-3 text-center text-xl font-semibold tracking-tight">Raka Dwi Pratama, S.Kom.</h1>
          <p className="mt-1 text-sm leading-relaxed text-[#48484a]">Sistem Informasi · Universitas Cakrawala Nusantara</p>
          <div className="my-4 h-px bg-black/10" />
          <p className="text-center text-xs text-[#48484a]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="mt-1 break-words text-center text-lg font-semibold">{getGuestName() || "Tamu Undangan"}</p>
          <p className="mt-2 text-sm leading-relaxed">Kami mengundang Anda untuk merayakan hari kelulusan bersama.</p>
          <p className="mt-3 text-center text-xs font-medium text-[#48484a]">11 November 2026 · 11.00 WIB<br />Gedung Serbaguna Melati</p>
          </div>
        </motion.button>
        <div className="min-h-4 flex-1" />
        <motion.button
          type="button"
          onClick={onUnlock}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: ready && !reduceMotion ? notificationDelay + 0.6 : 0, duration: reduceMotion ? 0 : 0.6 }}
          className="mt-3 flex min-h-11 cursor-pointer items-center justify-center gap-1 rounded-full border border-white/50 bg-white/65 px-4 py-2 text-xs font-semibold text-black shadow-sm backdrop-blur-xl transition-colors hover:bg-white/90 active:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Lihat Selengkapnya
        </motion.button>
        <p className="mt-3 text-xs text-white/90">Ketuk kartu notifikasi untuk melihat undangan Anda</p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-white" />
    </motion.div>
  );
}
