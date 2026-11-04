import { lazy, Suspense, useSyncExternalStore, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { MAPS_URL, openMaps } from "../lib/maps";
import { getGuestName } from "../lib/guest";
import FloralCardFrame, { GraduationBadge } from "./FloralCardFrame";
import FloralCorners from "./FloralCorners";
import Countdown from "./Countdown";
import VenueMapPreview from "./VenueMapPreview";
import GraduationBackdrop from "./GraduationBackdrop";
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

// Kartu sedikit lebih kecil di layar ponsel agar tidak mendominasi layar.
const COMPACT_QUERY = "(max-width: 480px)";

const subscribeCompact = (onChange: () => void) => {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getCompactSnapshot = () => window.matchMedia(COMPACT_QUERY).matches;

function useCompactLanyard() {
  return useSyncExternalStore(subscribeCompact, getCompactSnapshot, () => false);
}

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

// Tumpukan kartu: kartu biru tertahan, lalu setiap kartu berikutnya naik dan
// berhenti sedikit di bawah kartu sebelumnya — tepi tiap kartu tetap terlihat.
// Kartu berhenti di bawah judul + hitung mundur yang ikut dipin.
// Countdown starts at 56px and is 80px tall; reserve a 16px gap below it.
const STACK_TOP_PX = 152;
const STACK_STEP_PX = 12;

export default function NotesPage() {
  const reduceMotion = useReducedMotion();
  const compactLanyard = useCompactLanyard();

  const stackStyle = (index: number): CSSProperties =>
    reduceMotion
      ? { position: "relative", zIndex: 10 + index }
      : {
          position: "sticky",
          top: `calc(var(--safe-top, 0px) + ${STACK_TOP_PX + index * STACK_STEP_PX}px)`,
          zIndex: 10 + index,
        };

  return (
    <div className="relative isolate flex h-full w-full flex-col overflow-hidden" style={{ background: CREAM }}>
      <GraduationBackdrop />
      {/* Bingkai di atas header: header putih berada di bawahnya, jadi bingkai
          tidak lagi terlihat tertimpa/terpotong. */}
      <div className="pointer-events-none absolute inset-0 z-40">
        <FloralCardFrame graduation badge={false} />
      </div>
    <div
      className="min-h-0 w-full flex-1 overflow-y-auto"
      style={{ fontFamily: SF_STACK }}
    >
      <div className="mx-auto w-full max-w-[420px] px-7 pb-14">
        {/* Judul bagian — dipin di atas saat kartu mulai menumpuk. */}
        <div
          data-invitation-header
          className="-mx-7 sticky z-30 px-7 pb-2"
          style={{
            ...(reduceMotion
              ? { position: "relative" as const }
              : { position: "sticky" as const, top: 0 }),
            paddingTop: "var(--safe-top, 0px)",
            background: "#C6283E",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
          }}
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full h-6 w-full overflow-visible"
            viewBox="0 0 420 24"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 0H420L210 24Z" fill="#C6283E" />
            <path d="M0 0L210 24L420 0" stroke="#C6A36A" strokeWidth="1" />
            <path d="M0 0L105 12M420 0L315 12" stroke="#F7E4B9" strokeOpacity=".5" />
          </svg>
          <div className="text-center">
            {/* Badge topi di ujung teks, sejajar dengan label. */}
            <div className="flex items-center justify-center gap-2">
              <p
                className="text-[10px] font-medium uppercase"
                style={{ color: GOLD_LIGHT, letterSpacing: "0.34em" }}
              >
                Undangan Wisuda
              </p>
              <GraduationBadge
                size={18}
                className="inline-flex shrink-0 items-center justify-center px-1.5 py-0.5"
              />
            </div>
            <div className="mt-2.5">
              <Divider />
            </div>
          </div>
        </div>

        {/* Kanvas lebih tinggi dari ruang layout, lalu ditarik balik dengan
            margin negatif: kartu bisa ditarik ke bawah menimpa isi berikutnya. */}
        <div className="relative z-20 -mx-7 mt-1 h-[1400px] -mb-[924px]">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <img
                  src="/lanyard-front.jpg"
                  alt="Kartu wisudawati — ini hanyalah demo"
                  className="h-[266px] rounded-[12px] sm:h-[335px]"
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
              finish="flat"
              cornerRadius={0.17}
              size={compactLanyard ? 0.19 : 0.22}
              strapLength={0.5}
              damping={0.6}
              elasticity={0.55}
              breeze={0}
            />
          </Suspense>
        </div>

        <p
          className="mt-1 pb-3 text-center text-[11px]"
          style={{
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 3px rgba(0,0,0,0.45)",
          }}
        >
          Geser atau ketuk kartu untuk melihat detail
        </p>

        <Countdown
          className={reduceMotion ? "relative" : "sticky z-[15]"}
          style={
            reduceMotion ? undefined : { top: "calc(var(--safe-top, 0px) + 56px)" }
          }
        />

        <div className="mt-5 flow-root">
        <section
          className="isolate mb-4 overflow-hidden rounded-[18px] border border-white/25 px-5 py-6 text-center"
          style={{
            background: "rgba(0,91,191,0.78)",
            backdropFilter: "blur(20px) saturate(170%)",
            WebkitBackdropFilter: "blur(20px) saturate(170%)",
            color: CREAM,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.28), 0 18px 36px -26px rgba(11,26,48,0.7)",
            ...stackStyle(0),
          }}
        >
          <FloralCorners />
          <p className="relative text-xs" style={{ color: GOLD_LIGHT }}>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h2 className="relative mt-2 break-words text-2xl" style={{ fontFamily: SERIF }}>{getGuestName() || "Tamu Undangan"}</h2>
          <p className="relative mt-3 text-sm leading-relaxed">Dengan penuh rasa syukur, kami mengundang Anda untuk merayakan kelulusan Febrianti Ayu Widianingsih, A.Md.Kep bersama keluarga dan orang-orang terkasih.</p>
        </section>

        {/* Isi undangan */}
        <div
          className="isolate mb-4 overflow-hidden rounded-[18px] border border-white/55 bg-white/55 px-5 py-6 backdrop-blur-xl backdrop-saturate-150"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.75), 0 12px 28px -24px rgba(31,42,36,0.5)",
            ...stackStyle(1),
          }}
        >
          <FloralCorners size={56} tone="#B08D57" petal="#F3E4C8" />
          <p
            dir="rtl"
            lang="ar"
            aria-label="Bismillahirrahmanirrahim"
            className="mb-4 text-center leading-[1.9]"
            style={{
              fontFamily:
                '"Diwan Thuluth", "Diwan Mishafi", "Al Nile", "Traditional Arabic", "Scheherazade New", "Geeza Pro", serif',
              fontSize: 30,
              color: INK,
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p
            className="text-center text-[15px] leading-[1.7]"
            style={{ fontFamily: SERIF, color: INK }}
          >
            Dengan memohon rahmat Tuhan Yang Maha Esa, kami mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri acara Wisuda dan Syukuran
            kelulusan putri kami.
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

        {/* Save the date */}
        <div
          className="isolate mb-4 overflow-hidden rounded-[18px] border border-[#D6BD90] bg-[#FFFBF3]"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.75), 0 12px 28px -24px rgba(31,42,36,0.5)",
            ...stackStyle(2),
          }}
        >
          <VenueMapPreview />
          <div className="flex items-center justify-center gap-5 bg-[#F5ECDD] py-4">
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
              className="min-h-11 w-full cursor-pointer rounded-xl bg-[#9E2036] px-4 py-3 text-[13px] font-semibold text-[#FFF3D9] shadow-sm transition-colors hover:bg-[#811A2B] active:bg-[#691525] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E2036]"
            >
              Buka lokasi di Google Maps
            </button>
          </div>
        </div>

        </div>

      </div>
    </div>
        {/* Footer kaca: warna foto tetap tembus di balik teks, dengan blur
            supaya tulisan tetap nyaman dibaca. */}
        <footer data-invitation-footer className="relative isolate z-30 w-full shrink-0 overflow-hidden px-7 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pt-10 shadow-[0_-6px_20px_rgba(31,42,36,0.08)]" style={{ fontFamily: SF_STACK, backgroundColor: "rgba(255,253,248,0.62)", backdropFilter: "blur(24px) saturate(140%)", WebkitBackdropFilter: "blur(24px) saturate(140%)" }}>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 0 420 150"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 0H420L210 36Z" fill="#C6283E" />
          <path d="M0 0L210 36L420 0" stroke="#C6A36A" strokeWidth="1" />
          <path d="M0 150L105 57M420 150L315 57" stroke="#C6A36A" strokeOpacity=".4" />
        </svg>
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-4 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[#A78043] bg-[#C6A36A] text-[11px] text-white shadow-sm" style={{ fontFamily: SERIF }}>
          F
        </span>
        <p
          className="text-center text-[12px] italic leading-relaxed"
          style={{
            fontFamily: SERIF,
            color: INK,
          }}
        >
          Terima kasih atas perhatian dan doa restu Bapak/Ibu/Saudara/i. Sampai
          jumpa di hari wisuda.
        </p>

        <p className="mt-4 text-center text-[11px]">
          <a
            href="https://attaambo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-70 active:opacity-50"
            style={{
              color: MUTED,
              letterSpacing: "0.06em",
            }}
          >
            by attaambo.dev
          </a>
        </p>
        </footer>
    </div>
  );
}
