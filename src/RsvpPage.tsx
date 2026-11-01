import { useState, type ReactNode } from "react";
import { openLink } from "../lib/link";
import { getGuestName } from "../lib/guest";
import {
  CREAM,
  GOLD,
  GOLD_LIGHT,
  GREEN,
  GREEN_DARK,
  INK,
  MUTED,
  SERIF,
  SF_STACK,
} from "./invitationTheme";

// Konfirmasi disimpan di perangkat tamu, lalu bisa dikirim ke WhatsApp panitia.
const STORAGE_KEY = "wisuda-rsvp";
const HOST_WA = "6285712345678"; // Mama

type Attendance = "hadir" | "tidak";

interface RsvpData {
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
}

// Nama tamu bisa dipersonalisasi lewat URL: undangan.html?to=Budi%20Santoso

function Divider() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="h-px w-10" style={{ background: "rgba(200,169,106,0.5)" }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD }} />
      <span className="h-px w-10" style={{ background: "rgba(200,169,106,0.5)" }} />
    </div>
  );
}

function DetailIcon({ children }: { children: ReactNode }) {
  return (
    <span
      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(176,141,87,0.12)", color: GREEN }}
    >
      {children}
    </span>
  );
}

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 7.5V12l3 1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

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

export default function RsvpPage() {
  const [name, setName] = useState(getGuestName);
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<RsvpData | null>(null);

  const submit = () => {
    if (!name.trim()) {
      setError("Mohon isi nama Anda terlebih dahulu.");
      return;
    }

    const data: RsvpData = {
      name: name.trim(),
      attendance,
      guests: attendance === "hadir" ? guests : 0,
      message: message.trim(),
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(parsed) ? parsed : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, data]));
    } catch {
      // Penyimpanan lokal tidak tersedia — konfirmasi tetap bisa dikirim via WhatsApp.
    }

    setError("");
    setSubmitted(data);
  };

  const waText = submitted
    ? [
        `Halo, saya ${submitted.name}.`,
        submitted.attendance === "hadir"
          ? `InsyaAllah saya akan hadir di wisuda Raka${submitted.guests > 1 ? ` (${submitted.guests} orang)` : ""}.`
          : "Mohon maaf, saya tidak dapat hadir di wisuda Raka.",
        submitted.message ? `Ucapan & doa: ${submitted.message}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{ background: CREAM, fontFamily: SF_STACK }}
    >
      <div
        className="mx-auto w-full max-w-[420px] px-4 pb-10"
        style={{ paddingTop: "calc(var(--safe-top) + 64px)" }}
      >
        {/* Kartu utama undangan */}
        <section
          className="relative overflow-hidden rounded-[24px] px-6 pb-8 pt-9 text-center"
          style={{
            background: `linear-gradient(165deg, #163D6A 0%, ${GREEN} 55%, ${GREEN_DARK} 100%)`,
            boxShadow: "0 20px 45px -24px rgba(11,43,32,0.65)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-[10px] rounded-[18px]"
            style={{ border: "1px solid rgba(200,169,106,0.32)" }}
          />
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(231,211,163,0.26), rgba(231,211,163,0) 68%)",
            }}
          />

          <div className="relative">
            <p
              className="text-[10px] font-medium uppercase"
              style={{ color: GOLD_LIGHT, letterSpacing: "0.34em" }}
            >
              Undangan Wisuda
            </p>

            <div className="mt-4">
              <Divider />
            </div>

            <h2
              className="mt-4 text-[27px] leading-[1.2]"
              style={{ fontFamily: SERIF, color: "#FBF6EA" }}
            >
              Raka Dwi Pratama
            </h2>
            <p
              className="mt-1.5 text-[10px] uppercase"
              style={{ color: "rgba(231,211,163,0.85)", letterSpacing: "0.24em" }}
            >
              S.Kom · Sistem Informasi
            </p>
            <p
              className="mt-1 text-[10px] uppercase"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.16em" }}
            >
              Universitas Cakrawala Nusantara
            </p>

            <p
              className="mx-auto mt-5 max-w-[250px] text-[12px] italic leading-relaxed"
              style={{ fontFamily: SERIF, color: "rgba(251,246,234,0.72)" }}
            >
              “Dengan memohon rahmat Tuhan Yang Maha Esa, kami mengundang
              Bapak/Ibu/Saudara/i untuk hadir di hari wisuda kami.”
            </p>
          </div>
        </section>

        {/* Kepada */}
        <div
          className="mt-4 rounded-[16px] bg-white px-5 py-4"
          style={{ boxShadow: "0 10px 24px -20px rgba(31,42,36,0.5)" }}
        >
          <p
            className="text-[10px] font-semibold uppercase"
            style={{ color: GOLD, letterSpacing: "0.22em" }}
          >
            Kepada
          </p>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nama Anda"
            autoComplete="name"
            aria-label="Nama tamu"
            className="mt-1 w-full border-b bg-transparent pb-1 text-[17px] font-semibold outline-none placeholder:font-normal"
            style={{
              color: INK,
              borderColor: "rgba(176,141,87,0.35)",
              fontFamily: SERIF,
            }}
          />
          <p className="mt-1.5 text-[12px]" style={{ color: MUTED }}>
            Mohon konfirmasi kehadiran Anda.
          </p>
        </div>

        {/* Detail acara */}
        <div className="mt-4 overflow-hidden rounded-[16px] bg-white">
          <div className="flex items-start gap-3 px-4 py-3.5">
            <DetailIcon>
              <CalendarIcon />
            </DetailIcon>
            <div>
              <p className="text-[12px]" style={{ color: MUTED }}>
                Hari &amp; tanggal
              </p>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>
                Rabu, 11 November 2026
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3.5" style={{ borderTop: "1px solid rgba(60,60,67,0.08)" }}>
            <DetailIcon>
              <ClockIcon />
            </DetailIcon>
            <div>
              <p className="text-[12px]" style={{ color: MUTED }}>
                Waktu
              </p>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>
                11.00 WIB – selesai
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3.5" style={{ borderTop: "1px solid rgba(60,60,67,0.08)" }}>
            <DetailIcon>
              <PinIcon />
            </DetailIcon>
            <div>
              <p className="text-[12px]" style={{ color: MUTED }}>
                Lokasi
              </p>
              <p className="text-[15px] font-semibold" style={{ color: INK }}>
                Gedung Serbaguna Melati
              </p>
              <p className="mt-0.5 text-[12px] leading-snug" style={{ color: MUTED }}>
                Jl. Jend. Sudirman No. 123, Jakarta Selatan
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div
            className="mt-4 rounded-[18px] bg-white px-5 py-6 text-center"
            style={{ boxShadow: "0 12px 28px -22px rgba(31,42,36,0.5)" }}
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "rgba(176,141,87,0.14)", color: GREEN }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-3 text-[10px] font-semibold uppercase" style={{ color: GOLD, letterSpacing: "0.22em" }}>
              Terima kasih
            </p>
            <p className="mt-1 text-[21px]" style={{ fontFamily: SERIF, color: INK }}>
              {submitted.name}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed" style={{ color: MUTED }}>
              {submitted.attendance === "hadir"
                ? `Kehadiran Anda tercatat${submitted.guests > 1 ? ` untuk ${submitted.guests} orang` : ""}.`
                : "Ketidakhadiran Anda sudah tercatat."}{" "}
              Kirim juga ke WhatsApp agar masuk daftar tamu kami.
            </p>

            {submitted.message && (
              <p
                className="mt-3 rounded-[12px] px-3 py-2 text-[13px] italic leading-relaxed"
                style={{ background: CREAM, color: "rgba(31,42,36,0.72)", fontFamily: SERIF }}
              >
                “{submitted.message}”
              </p>
            )}

            <button
              type="button"
              onClick={() =>
                openLink(`https://wa.me/${HOST_WA}?text=${encodeURIComponent(waText)}`)
              }
              className="mt-5 w-full rounded-[12px] py-3 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
              style={{ background: GREEN }}
            >
              Kirim ke WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(null)}
              className="mt-2 w-full rounded-[12px] py-3 text-[15px] font-semibold transition-transform active:scale-[0.98]"
              style={{ background: CREAM, color: GOLD }}
            >
              Ubah jawaban
            </button>
          </div>
        ) : (
          <div
            className="mt-4 rounded-[18px] bg-white px-5 py-5"
            style={{ boxShadow: "0 12px 28px -22px rgba(31,42,36,0.5)" }}
          >
            <h3 className="text-[19px]" style={{ fontFamily: SERIF, color: INK }}>
              Konfirmasi Kehadiran
            </h3>
            <p className="mt-1 text-[12px]" style={{ color: MUTED }}>
              Mohon jawab sebelum 14 November 2026.
            </p>

            <p
              className="mt-4 text-[10px] font-semibold uppercase"
              style={{ color: GOLD, letterSpacing: "0.2em" }}
            >
              Kehadiran
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  { value: "hadir", label: "Hadir" },
                  { value: "tidak", label: "Tidak hadir" },
                ] as const
              ).map((option) => {
                const selected = attendance === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAttendance(option.value)}
                    className="rounded-[11px] py-2.5 text-[14px] font-semibold transition-transform active:scale-[0.98]"
                    style={{
                      background: selected ? GREEN : CREAM,
                      color: selected ? "#FBF6EA" : MUTED,
                      border: `1px solid ${selected ? GREEN : "rgba(31,42,36,0.08)"}`,
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {attendance === "hadir" && (
              <>
                <p
                  className="mt-4 text-[10px] font-semibold uppercase"
                  style={{ color: GOLD, letterSpacing: "0.2em" }}
                >
                  Jumlah orang
                </p>
                <div
                  className="mt-2 flex items-center justify-between rounded-[11px] px-4 py-2.5"
                  style={{ background: CREAM }}
                >
                  <span className="text-[14px]" style={{ color: INK }}>
                    Termasuk Anda
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuests((value) => Math.max(1, value - 1))}
                      aria-label="Kurangi jumlah tamu"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[18px] font-semibold transition-transform active:scale-95"
                      style={{ color: GREEN }}
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-[16px] font-semibold" style={{ color: INK }}>
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((value) => Math.min(4, value + 1))}
                      aria-label="Tambah jumlah tamu"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[18px] font-semibold transition-transform active:scale-95"
                      style={{ color: GREEN }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}

            <p
              className="mt-4 text-[10px] font-semibold uppercase"
              style={{ color: GOLD, letterSpacing: "0.2em" }}
            >
              Ucapan &amp; doa
            </p>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              placeholder="Tulis doa atau ucapan untuk Raka…"
              className="mt-2 w-full resize-none rounded-[11px] px-3 py-2.5 text-[14px] leading-relaxed outline-none placeholder:text-black/25"
              style={{ background: CREAM, color: INK }}
            />

            {error && (
              <p className="mt-3 text-[13px] font-medium" style={{ color: "#C0392B" }}>
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={submit}
              className="mt-4 w-full rounded-[12px] py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
              style={{
                background: `linear-gradient(160deg, #1B6B41, ${GREEN_DARK})`,
                boxShadow: "0 12px 24px -14px rgba(20,83,45,0.7)",
              }}
            >
              Kirim Konfirmasi
            </button>
          </div>
        )}

        <p
          className="mt-6 px-3 text-center text-[12px] italic leading-relaxed"
          style={{ fontFamily: SERIF, color: "#8A968D" }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
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
  );
}
