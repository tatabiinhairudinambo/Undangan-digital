import { useEffect, useRef } from "react";

/** Foto utuh di antara header dan footer, mengikuti ukuran keduanya. */
export default function GraduationBackdrop() {
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = backdrop.current;
    const container = element?.parentElement;
    if (!element || !container) return;
    const header = container.querySelector<HTMLElement>("[data-invitation-header]");
    const footer = container.querySelector<HTMLElement>("[data-invitation-footer]");
    if (!header || !footer) return;
    const resize = () => {
      element.style.top = `${header.offsetHeight + 24}px`;
      element.style.bottom = `${footer.offsetHeight}px`;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(header);
    observer.observe(footer);
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
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,16,18,0.34)" }}
      />
    </div>
  );
}
