import { useEffect, useRef } from "react";

/** Foto latar full-bleed dari bawah header sampai dasar kartu, termasuk di balik footer kaca. */
export default function GraduationBackdrop() {
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = backdrop.current;
    const container = element?.parentElement;
    if (!element || !container) return;
    const header = container.querySelector<HTMLElement>("[data-invitation-header]");
    if (!header) return;
    const resize = () => {
      element.style.top = `${header.offsetHeight}px`;
      // Foto ikut turun sampai dasar kartu supaya footer kaca tetap
      // memperlihatkan warna foto, bukan warna kosong di belakangnya.
      element.style.bottom = "0px";
    };
    const observer = new ResizeObserver(resize);
    observer.observe(header);
    resize();
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={backdrop}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#E8E6E1]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,16,18,0.34)" }}
      />
    </div>
  );
}
