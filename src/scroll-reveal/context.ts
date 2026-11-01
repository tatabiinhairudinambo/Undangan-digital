import { createContext } from "react";
import type { AppDef } from "../app-nav";

export type ScrollRevealState = {
  apps: AppDef[];
  /** Langkah yang sedang ditampilkan (1..apps.length). */
  step: number;
  /** true = modal scroll sedang terbuka. */
  active: boolean;
  /** App akhir tercapai; scroll hanya menggulir isi app. */
  locked: boolean;
  /** Buka modal / lanjut ke app berikutnya. */
  next: () => void;
  /** Kembali ke app sebelumnya, atau tutup bila sudah di app pertama. */
  prev: () => void;
  /** Tutup modal; langkah berikutnya mulai lagi dari app pertama. */
  hide: () => void;
};

export const ScrollRevealContext = createContext<ScrollRevealState | null>(null);
