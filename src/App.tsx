import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import IosAppFolder from "./IosAppFolder";
import LockScreen from "./LockScreen";
import { MusicProvider } from "./music";
import BootScreen from "./boot/BootScreen";

const LOCK_TRANSITION = { duration: 0.85, ease: [0.32, 0.72, 0, 1] } as const;

// Lock-screen layers are `fixed` inside the transformed #root, so they span the
// phone frame — measure its height, not the window's (which differs on desktop).
const frameHeight = () =>
  document.getElementById("root")?.getBoundingClientRect().height ??
  window.innerHeight;

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  /** Shared y for the lock-screen layer. 0 = covering; -innerHeight = hidden above. */
  const y = useMotionValue(0);

  // Snap to the target whenever isLocked changes (e.g. drag crossed threshold).
  useEffect(() => {
    const target = isLocked ? 0 : -frameHeight();
    const controls = animate(y, target, LOCK_TRANSITION);
    return () => controls.stop();
  }, [isLocked, y]);

  return (
    <MusicProvider>
      <div inert={isLocked || booting}>
        <IosAppFolder openInvitation={!isLocked} />
      </div>
      {/* <NotificationsStack /> */}

      {/* Sampul undangan; tombol Buka Undangan membuka layar utama. */}
      <motion.div
        className="fixed inset-0 z-[20000]"
        inert={!isLocked}
        style={{ y, pointerEvents: isLocked ? "auto" : "none" }}
      >
        <LockScreen y={y} ready={!booting} onUnlock={() => setIsLocked(false)} />
      </motion.div>

      {/* Top-edge handle: pan to pull the lock screen down in real-time. */}
      {!isLocked && (
        <motion.div
          className="fixed top-0 inset-x-0 h-11 z-[20001] touch-none"
          onPan={(_, info) => {
            const h = frameHeight();
            const delta = Math.max(0, Math.min(h, info.offset.y));
            y.set(-h + delta);
          }}
          onPanEnd={(_, info) => {
            const h = frameHeight();
            const past = info.offset.y > h * 0.25 || info.velocity.y > 500;
            if (past) setIsLocked(true);
            else animate(y, -h, LOCK_TRANSITION);
          }}
        />
      )}

      {/* Boot screen on top; fades out once critical assets finish loading. */}
      <AnimatePresence>
        {booting && (
          <BootScreen key="boot" onFinished={() => setBooting(false)} />
        )}
      </AnimatePresence>
    </MusicProvider>
  );
}
