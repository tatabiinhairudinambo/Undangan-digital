import { useState } from "react";
import { MAPS_URL, openMaps } from "../lib/maps";

const SF_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif';

const BLUE = "#007AFF";
const GRAY = "#8E8E93";
const GROUPED_BG = "#F2F2F7";

const VENUE = "Gedung Serbaguna Melati";
const ADDRESS = "Jl. Jend. Sudirman No. 123, Jakarta Selatan";

const NOTES = [
  "Hadir 30 menit sebelum prosesi dimulai.",
  "Undangan berlaku untuk 2 orang pendamping.",
  "Parkir tersedia di area gedung.",
  "Pintu masuk melalui lobi utama.",
];

export default function LocationPage() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${VENUE}, ${ADDRESS}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard tidak tersedia — tombol tetap bisa ditekan tanpa efek.
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{ background: GROUPED_BG, fontFamily: SF_STACK }}
    >
      <div
        className="px-5 pb-10"
        style={{ paddingTop: "calc(var(--safe-top) + 28px)" }}
      >
        <h1 className="text-[34px] font-bold tracking-tight text-black">Lokasi</h1>

        <div className="mt-4 overflow-hidden rounded-[18px] bg-white">
          <img
            src="/map-tile.svg"
            alt="Peta lokasi acara"
            className="h-[150px] w-full object-cover"
          />

          <div className="px-4 py-4">
            <p className="text-[17px] font-semibold leading-tight text-black">{VENUE}</p>
            <p className="mt-1 text-[14px] leading-snug" style={{ color: GRAY }}>
              {ADDRESS}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => openMaps(MAPS_URL)}
                className="flex-1 rounded-[12px] py-3 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
                style={{ background: BLUE }}
              >
                Buka di Google Maps
              </button>
              <button
                type="button"
                onClick={copyAddress}
                className="rounded-[12px] px-4 py-3 text-[15px] font-semibold transition-transform active:scale-[0.98]"
                style={{ background: "#E9E9EB", color: BLUE }}
              >
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-black/40">
          Catatan untuk tamu
        </p>

        <div className="mt-2 overflow-hidden rounded-[14px] bg-white">
          {NOTES.map((note, index) => (
            <div
              key={note}
              className="flex items-start gap-3 px-4 py-3"
              style={{
                borderTop: index === 0 ? "none" : "1px solid rgba(60,60,67,0.10)",
              }}
            >
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: BLUE }}
              />
              <span className="text-[15px] leading-snug text-black">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
