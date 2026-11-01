import { useEffect, useMemo } from "react";
import { useAppNav, type AppDef } from "../app-nav";
import type { ModalOrigin } from "../app-modal/modalFrame";
import { ScrollStage } from "./ScrollStage";
import { useScrollReveal } from "./useScrollReveal";
import { useScrollSteps } from "./useScrollSteps";

const STAGE_KEY = "scroll-stage";

/** Origin morf di tengah bingkai ponsel. */
function centerOrigin(): ModalOrigin {
  const frame = typeof document === "undefined" ? null : document.getElementById("root");
  const rect = frame?.getBoundingClientRect();
  const w = rect?.width ?? (typeof window === "undefined" ? 0 : window.innerWidth);
  const h = rect?.height ?? (typeof window === "undefined" ? 0 : window.innerHeight);

  return { x: w / 2, y: h / 2, w: 96, h: 96 };
}

/**
 * Pengendali mode scroll: scroll ke bawah membuka app berikutnya, scroll ke
 * atas kembali ke app sebelumnya. Semua app ditampilkan lewat satu modal yang
 * sama, jadi perpindahan hanya mengganti konten (halus, tanpa balik ke home).
 */
export function ScrollReveal() {
  const { apps, active, locked, next, prev, hide } = useScrollReveal();
  const { open, close, openKey } = useAppNav();

  // AppDef stabil: satu modal dengan konten yang berganti sesuai langkah.
  const stageApp = useMemo<AppDef>(
    () => ({
      key: STAGE_KEY,
      iconSrc: apps[0]?.iconSrc ?? "/icons/photos.svg",
      render: () => <ScrollStage />,
      chrome: { closeButton: "none" },
      hideIcon: true,
      // Ditutup dari dalam (tombol Kembali/Tutup): akhiri mode scroll.
      onClose: hide,
    }),
    [apps, hide]
  );

  useScrollSteps({
    isActive: (target) => {
      // RSVP adalah titik akhir: biarkan scroll native untuk membaca/mengisi form.
      if (locked) return false;
      // Selama modal scroll terbuka, scroll lanjutan tetap dibaca.
      if (openKey !== null) return openKey === STAGE_KEY;
      // Di layar utama hanya scroll di atas layar utama yang dihitung.
      return target instanceof Element && target.closest("[data-scroll-reveal-root]") !== null;
    },
    onStep: (direction) => {
      if (direction > 0) next();
      else prev();
    },
  });

  useEffect(() => {
    if (!active) {
      if (openKey === STAGE_KEY) close();
      return;
    }

    // App lain yang sedang terbuka (dibuka lewat tap) tidak diganggu.
    if (openKey === null) open(stageApp, centerOrigin());
  }, [active, openKey, open, close, stageApp]);

  return null;
}
