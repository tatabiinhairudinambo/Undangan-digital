import { useEffect, useRef } from "react";

/** Jarak scroll (px) untuk berpindah satu langkah/app. */
const DEFAULT_STEP_PX = 120;
// Let the 180ms crossfade (240ms initial open) settle before another step.
const STEP_LOCK_MS = 260;
const GESTURE_IDLE_MS = 180;

type Options = {
  /** Jarak scroll per langkah. */
  stepPx?: number;
  /** Hanya hitung scroll bila event ini relevan (mis. layar sudah terbuka). */
  isActive: (target: EventTarget | null) => boolean;
  /** Dipanggil +1 (scroll ke bawah) atau -1 (scroll ke atas). */
  onStep: (direction: 1 | -1) => void;
};

/**
 * Membaca scroll (wheel / swipe) sebagai langkah per langkah.
 *
 * Scroll di dalam konten yang masih bisa digulir (Catatan, Foto, dll.) tidak
 * dihitung, jadi fitur scroll bawaan tiap app tetap berjalan. Begitu konten
 * mencapai ujung, scroll berikutnya baru berpindah app.
 */
export function useScrollSteps({
  stepPx = DEFAULT_STEP_PX,
  isActive,
  onStep,
}: Options) {
  const accumulator = useRef(0);
  const touch = useRef<{ y: number; x: number; target: EventTarget | null } | null>(null);

  const activeRef = useRef(isActive);
  const onStepRef = useRef(onStep);

  // Sinkronkan callback terbaru tanpa memasang ulang listener di tiap render.
  useEffect(() => {
    activeRef.current = isActive;
    onStepRef.current = onStep;
  });

  useEffect(() => {
    let lockedUntil = 0;
    let lastInputAt = 0;
    let touchStepped = false;

    const move = (delta: number, target: EventTarget | null) => {
      if (!activeRef.current(target) || delta === 0) return false;
      const now = performance.now();
      if (now < lockedUntil) {
        accumulator.current = 0;
        return false;
      }
      // A new gesture or a direction reversal must not inherit stale input.
      if (now - lastInputAt > GESTURE_IDLE_MS || accumulator.current * delta < 0) {
        accumulator.current = 0;
      }
      lastInputAt = now;

      // Biarkan konten yang masih bisa digulir mengambil scroll-nya sendiri.
      if (canScrollInDirection(target, delta)) {
        accumulator.current = 0;
        return false;
      }

      accumulator.current += delta;

      if (Math.abs(accumulator.current) >= stepPx) {
        const direction = accumulator.current > 0 ? 1 : -1;
        accumulator.current = 0;
        lockedUntil = now + STEP_LOCK_MS;
        onStepRef.current(direction);
        return true;
      }
      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      // deltaMode: 0 = piksel, 1 = baris, 2 = halaman.
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      move(event.deltaY * unit, event.target);
    };

    const onTouchStart = (event: TouchEvent) => {
      accumulator.current = 0;
      touchStepped = false;
      const t = event.touches[0];
      if (!t) return;
      touch.current = { y: t.clientY, x: t.clientX, target: event.target };
    };

    const onTouchMove = (event: TouchEvent) => {
      const start = touch.current;
      const t = event.touches[0];
      if (!start || !t || touchStepped || event.touches.length !== 1) return;

      const dy = start.y - t.clientY;
      const dx = start.x - t.clientX;

      // Abaikan gerakan horizontal (mis. geser kartu/lightbox).
      if (Math.abs(dy) <= Math.abs(dx)) {
        start.y = t.clientY;
        start.x = t.clientX;
        return;
      }

      start.y = t.clientY;
      start.x = t.clientX;
      touchStepped = move(dy, start.target);
    };

    const onTouchEnd = () => {
      touch.current = null;
      accumulator.current = 0;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [stepPx]);
}

/** Apakah ada leluhur yang masih bisa digulir ke arah `delta`? */
function canScrollInDirection(target: EventTarget | null, delta: number): boolean {
  if (!(target instanceof Element)) return false;

  let el: HTMLElement | null = target as HTMLElement;

  while (el && el !== document.body && el !== document.documentElement) {
    const overflowY = getComputedStyle(el).overflowY;

    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      const max = el.scrollHeight - el.clientHeight;

      if (max > 1) {
        if (delta > 0 && el.scrollTop < max - 1) return true;
        if (delta < 0 && el.scrollTop > 1) return true;
      }
    }

    el = el.parentElement;
  }

  return false;
}
