import { lazy, Suspense } from "react";
import { MAPS_URL, openMaps } from "../lib/maps";
import { getGuestName } from "../lib/guest";
import FloralCardFrame from "./FloralCardFrame";
import {
  CREAM,
  GOLD,
  GOLD_LIGHT,
  GREEN,
  HAIRLINE,
  INK,
  MUTED,
  SERIF,
  SF_STACK,
} from "./invitationTheme";

function Divider() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="h-px w-10" style={{ background: "rgba(200,169,106,0.5)" }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD }} />
      <span className="h-px w-10" style={{ background: "rgba(200,169,106,0.5)" }} />
    </div>
  );
}

const Lanyard = lazy(() => import("./components/Lanyard/Lanyard"));

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 21s6.5-5.4 6.5-10.3A6.5 6.5 0 0 0 5.5 10.7C5.5 15.6 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const CapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 11.5v4.2c0 1.3 2.5 2.6 5.5 2.6s5.5-1.3 5.5-2.6v-4.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M21.5 9.5v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function NotesPage() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: CREAM }}>
      <div className="pointer-events-none absolute inset-0 z-10">
        <FloralCardFrame graduation />
      </div>
    <div
      className="h-full w-full overflow-y-auto"
      style={{ background: CREAM, fontFamily: SF_STACK }}
    >
      <div
        className="mx-auto w-full max-w-[420px] px-7 pb-14"
        style={{ paddingTop: "calc(var(--safe-top) + 28px)" }}
      >
        {/* Kartu wisudawan */}
        <div className="text-center">
          <p
            className="text-[10px] font-medium uppercase"
            style={{ color: GOLD, letterSpacing: "0.34em" }}
          >
            Undangan Wisuda
          </p>
          <div className="mt-2.5">
            <Divider />
          </div>
        </div>

        <div className="-mx-3 mt-1 h-[500px]">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <img
                  src="/lanyard-front.jpg"
                  alt="Kartu wisudawan Raka Dwi Pratama"
                  className="h-[335px] rounded-[12px]"
                  style={{ boxShadow: "0 26px 40px -30px rgba(11,26,48,0.85)" }}
                  draggable={false}
                />
              </div>
            }
          >
            <Lanyard
              frontImage="/lanyard-front.jpg"
              backImage="/lanyard-back.jpg"
              strapImage="/lanyard-strap.jpg"
              strapColor="#102A4C"
              metal="gold"
              finish="glossy"
              cornerRadius={0.17}
              size={0.62}
              strapLength={0.5}
              damping={0.6}
              elasticity={0.55}
              breeze={0}
            />
          </Suspense>
        </div>

        <p className="mt-1 text-center text-[11px]" style={{ color: MUTED }}>
          Geser atau ketuk kartu untuk melihat detail
        </p>

        <section className="mt-5 rounded-[18px] px-5 py-6 text-center" style={{ background: GREEN, color: CREAM }}>
          <p className="text-xs" style={{ color: GOLD_LIGHT }}>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h2 className="mt-2 break-words text-2xl" style={{ fontFamily: SERIF }}>{getGuestName() || "Tamu Undangan"}</h2>
          <p className="mt-3 text-sm leading-relaxed">Dengan penuh rasa syukur, kami mengundang Anda untuk merayakan kelulusan Raka Dwi Pratama bersama keluarga dan orang-orang terkasih.</p>
        </section>

        {/* Save the date */}
        <div
          className="mt-6 overflow-hidden rounded-[18px] bg-white"
          style={{ boxShadow: "0 12px 28px -24px rgba(31,42,36,0.5)" }}
        >
          <div className="flex items-center justify-center gap-5 py-5">
            <div className="text-center">
              <p
                className="text-[9px] font-semibold uppercase"
                style={{ color: GOLD, letterSpacing: "0.2em" }}
              >
                Hari
              </p>
              <p className="mt-1 text-[15px]" style={{ fontFamily: SERIF, color: INK }}>
                Rabu
              </p>
            </div>

            <span className="h-10 w-px" style={{ background: "rgba(176,141,87,0.3)" }} />

            <div className="text-center">
              <p
                className="text-[30px] leading-none"
                style={{ fontFamily: SERIF, color: GREEN }}
              >
                11
              </p>
              <p
                className="mt-1 text-[9px] font-semibold uppercase"
                style={{ color: GOLD, letterSpacing: "0.2em" }}
              >
                Nov 2026
              </p>
            </div>

            <span className="h-10 w-px" style={{ background: "rgba(176,141,87,0.3)" }} />

            <div className="text-center">
              <p
                className="text-[9px] font-semibold uppercase"
                style={{ color: GOLD, letterSpacing: "0.2em" }}
              >
                Waktu
              </p>
              <p className="mt-1 text-[15px]" style={{ fontFamily: SERIF, color: INK }}>
                11.00 WIB
              </p>
            </div>
          </div>

          <div
            className="flex items-start gap-3 px-4 py-3.5"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(176,141,87,0.12)", color: GREEN }}
            >
              <PinIcon />
            </span>
            <div>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>
                Gedung Serbaguna Melati
              </p>
              <p className="mt-0.5 text-[12px] leading-snug" style={{ color: MUTED }}>
                Jl. Jend. Sudirman No. 123, Jakarta Selatan
              </p>
            </div>
          </div>

          <div
            className="px-4 pb-4 text-center"
            style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: 10 }}
          >
            <button
              type="button"
              onClick={() => openMaps(MAPS_URL)}
              className="min-h-11 text-[13px] font-semibold underline-offset-4 active:opacity-60"
              style={{ color: GREEN, textDecoration: "underline" }}
            >
              Buka lokasi di Google Maps
            </button>
          </div>
        </div>

        {/* Isi undangan */}
        <div
          className="mt-4 rounded-[18px] bg-white px-5 py-6"
          style={{ boxShadow: "0 12px 28px -24px rgba(31,42,36,0.5)" }}
        >
          <p
            className="text-center text-[15px] leading-[1.7]"
            style={{ fontFamily: SERIF, color: INK }}
          >
            Dengan memohon rahmat Tuhan Yang Maha Esa, kami mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri acara Wisuda dan Syukuran
            kelulusan putra kami.
          </p>

          <div className="my-5">
            <Divider />
          </div>

          <p className="text-center text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi
            kelancaran acara ini.
          </p>
        </div>

        {/* Dress code & kontak */}
        <div
          className="mt-4 rounded-[18px] bg-white px-5 py-4"
          style={{ boxShadow: "0 12px 28px -24px rgba(31,42,36,0.5)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-[9px] font-semibold uppercase"
                style={{ color: GOLD, letterSpacing: "0.2em" }}
              >
                Dress code
              </p>
              <p className="mt-1 text-[14px] font-semibold" style={{ color: INK }}>
                Batik / pakaian formal
              </p>
            </div>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "rgba(176,141,87,0.12)", color: GOLD }}
              aria-hidden
            >
              <CapIcon />
            </span>
          </div>

          <div
            className="mt-3 flex items-center justify-between pt-3"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            <div>
              <p
                className="text-[9px] font-semibold uppercase"
                style={{ color: GOLD, letterSpacing: "0.2em" }}
              >
                Kontak
              </p>
              <a
                href="tel:085712345678"
                className="mt-1 block text-[14px] font-semibold active:opacity-60"
                style={{ color: GREEN }}
              >
                Mama · 0857-1234-5678
              </a>
            </div>
          </div>
        </div>

        <p
          className="mt-6 px-3 text-center text-[12px] italic leading-relaxed"
          style={{ fontFamily: SERIF, color: "#8A968D" }}
        >
          Terima kasih atas perhatian dan doa restu Bapak/Ibu/Saudara/i. Sampai
          jumpa di hari wisuda.
        </p>

        <div className="mt-4 flex justify-center">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-[15px]"
            style={{
              border: "1px solid rgba(176,141,87,0.55)",
              color: GOLD,
              fontFamily: SERIF,
            }}
          >
            R
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}
