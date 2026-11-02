import { useEffect, useState, type CSSProperties } from "react";
import { SF_STACK } from "./invitationTheme";

// 11 November 2026, 11.00 WIB (UTC+7) — sama dengan jadwal di kalender.
const TARGET = new Date("2026-11-11T11:00:00+07:00").getTime();

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingFrom(ms: number): Remaining {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Hitung mundur ke hari wisuda; berhenti di nol setelah acara lewat. */
export default function Countdown({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [left, setLeft] = useState(() => remainingFrom(TARGET - Date.now()));

  useEffect(() => {
    const id = window.setInterval(
      () => setLeft(remainingFrom(TARGET - Date.now())),
      1000
    );
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Hari", value: left.days },
    { label: "Jam", value: left.hours },
    { label: "Menit", value: left.minutes },
    { label: "Detik", value: left.seconds },
  ];

  return (
    <div
      className={`graduation-countdown ${className}`.trim()}
      role="timer"
      aria-label="Hitung mundur menuju wisuda"
      style={{
        fontFamily: SF_STACK,
        ...style,
      }}
    >
      <span className="countdown-corner countdown-corner-start" aria-hidden="true" />
      <span className="countdown-corner countdown-corner-end" aria-hidden="true" />
      <div className="relative grid grid-cols-4 gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="countdown-unit flex min-w-0 flex-col items-center"
          >
            <span
              className="countdown-value text-[25px] font-semibold tabular-nums leading-none"
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span
              className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#F6E3C3]"
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
