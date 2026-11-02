import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Tiga foto bergantian di belakang halaman Undangan.
const SLIDES = ["/wallpaper-lock.jpeg", "/wallpaper-home.jpeg", "/photos/12.jpeg"];
const HOLD_MS = 9000; // lama tiap foto terlihat sebelum berganti

/**
 * Latar bergantian lambat: crossfade 2 detik + zoom halus (Ken Burns).
 * Lapisan krem tipis menjaga teks tetap terbaca di atas foto.
 */
export default function GraduationBackdrop() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % SLIDES.length),
      HOLD_MS
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const current = reduceMotion ? 0 : active;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {SLIDES.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: index === current ? 1 : 0,
            transform: index === current ? "scale(1.08)" : "scale(1)",
            transition: reduceMotion
              ? undefined
              : "opacity 2000ms cubic-bezier(0.4,0,0.2,1), transform 9000ms linear",
            willChange: "opacity, transform",
          }}
        />
      ))}

      {/* Selubung gelap tipis: warna asli foto tetap, hanya diredupkan. */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,16,18,0.34)" }}
      />
    </div>
  );
}
