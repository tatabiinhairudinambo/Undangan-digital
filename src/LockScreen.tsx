import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { GraduationCap, LockKeyhole } from "lucide-react";
import { getGuestName } from "../lib/guest";
import { Clock } from "../components/Clock";
import { useMusic } from "./music";
import EnvelopeFloralFrame from "./EnvelopeFloralFrame";

interface LockScreenProps {
  y: MotionValue<number>;
  onUnlock: () => void;
  ready: boolean;
}

export default function LockScreen({ y, onUnlock, ready }: LockScreenProps) {
  const radius = useTransform(y, [-150, 0], [48, 0], { clamp: true });
  const reduceMotion = useReducedMotion();
  const notificationDelay = reduceMotion ? 0 : 0.5;
  const { playing, togglePlay } = useMusic();
  const openInvitation = () => {
    if (!playing) togglePlay();
    onUnlock();
  };

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
      <div className="relative flex min-h-full flex-col items-center px-4 pb-10 pt-6 text-center">
        <LockKeyhole size={20} strokeWidth={2.5} aria-hidden="true" />
        <Clock showDate />
        <motion.button
          type="button"
          onClick={openInvitation}
          aria-label="Buka undangan wisuda"
          initial={{ opacity: 0, y: -180 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : -180 }}
          transition={{ delay: ready ? notificationDelay : 0, duration: reduceMotion ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="invitation-envelope relative mt-5 w-full cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <svg aria-hidden="true" className="envelope-folds" viewBox="0 0 420 360" preserveAspectRatio="none" fill="none">
            <path d="M0 0H420V360H0Z" fill="#E8D8BE" />
            <path d="M0 0L236 197L0 360Z" fill="#F5E9D5" />
            <path d="M420 0L184 197L420 360Z" fill="#EEDFC5" />
            <path d="M0 360V350L210 159L420 350V360Z" fill="#FFFAEF" />
            <path d="M0 350L210 159L420 350" stroke="#C6A36A" strokeOpacity=".6" />
            <path d="M0 0L210 185L420 0" stroke="#A78043" strokeOpacity=".3" strokeWidth="3" />
          </svg>
          <svg aria-hidden="true" className="envelope-flap" viewBox="0 0 420 184" preserveAspectRatio="none" fill="none">
            <path d="M0 0H420L222 174Q210 185 198 174Z" fill="#9E2036" />
            <path d="M0 0H420L222 166Q210 177 198 166Z" fill="#BE2941" />
            <path d="M9 7H411L219 163Q210 171 201 163Z" stroke="#E6C88F" strokeOpacity=".8" />
            <path d="M22 13H398" stroke="#E6C88F" strokeOpacity=".45" />
          </svg>
          <EnvelopeFloralFrame />
          <div className="envelope-heading">
            <p className="text-xs font-medium uppercase tracking-[0.2em]">Undangan Wisuda</p>
            <h1 className="mt-2 leading-tight font-serif text-base">
              Febrianti Ayu Widianingsih
              <span className="mt-0.5 block text-[11px] tracking-[0.08em] text-[#F7E4B9]">A.Md.Kep</span>
            </h1>
            <p className="mt-1 text-[10px] uppercase tracking-widest">11 November 2026</p>
          </div>
          <span
            aria-hidden="true"
            className="envelope-seal relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-red-700 shadow-sm"
          >
            <GraduationCap size={22} strokeWidth={1.5} className="text-white" />
          </span>
          <div className="envelope-recipient">
            <p className="text-xs text-[#68563F]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="mt-1 break-words font-serif text-lg text-[#463320]">{getGuestName() || "Tamu Undangan"}</p>
            <span className="mx-auto my-3 block h-px w-10 bg-[#B89256]" aria-hidden="true" />
            <p className="text-[10px] tracking-wide text-[#68563F]">Sebuah undangan istimewa untuk Anda</p>
          </div>
        </motion.button>
        <motion.button
          type="button"
          onClick={openInvitation}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: ready && !reduceMotion ? notificationDelay + 0.6 : 0, duration: reduceMotion ? 0 : 0.6 }}
          className="mt-6 flex min-h-11 cursor-pointer items-center justify-center gap-1 rounded-full border border-white/50 bg-white/65 px-4 py-2 text-xs font-semibold text-black shadow-sm backdrop-blur-xl transition-colors hover:bg-white/90 active:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Buka Undangan
        </motion.button>
        <div className="min-h-6 flex-1" />
        <p className="text-xs text-white/90">Ketuk amplop untuk membuka undangan Anda</p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full bg-white" />
    </motion.div>
  );
}
