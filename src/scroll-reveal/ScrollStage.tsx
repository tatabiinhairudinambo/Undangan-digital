import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

// Cepat & halus: konten lama memudar, konten baru masuk tanpa menutup modal.
const STAGE_TRANSITION = { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const };

const STAGE_VARIANTS: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0, pointerEvents: "none" },
};

/**
 * Isi modal untuk mode scroll. Satu modal tetap terbuka, lalu kontennya
 * berganti ke app berikutnya / sebelumnya tanpa menutup ke layar utama.
 * Navigasi murni lewat scroll — tanpa tombol tutup/kembali di dalam app.
 */
export function ScrollStage() {
  const { apps, step } = useScrollReveal();
  const reducedMotion = useReducedMotion();

  const app = apps[step - 1] ?? null;
  if (!app) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: app.background ?? "#ffffff" }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={app.key}
          className="absolute inset-0"
          variants={STAGE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={reducedMotion ? { duration: 0 } : STAGE_TRANSITION}
        >
          {app.render()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
