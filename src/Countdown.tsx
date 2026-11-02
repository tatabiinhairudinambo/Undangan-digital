import { useEffect, useState, type CSSProperties } from "react";
import { HAIRLINE, INK, MUTED, SF_STACK } from "./invitationTheme";

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
      className={`overflow-hidden rounded-[18px] border border-white/60 bg-white/55 px-2 py-4 backdrop-blur-xl backdrop-saturate-150 ${className}`.trim()}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.75), 0 12px 28px -24px rgba(31,42,36,0.5)",
        fontFamily: SF_STACK,
        ...style,
      }}
    >
      <div className="flex items-stretch">
        {units.map((unit, index) => (
          <div
            key={unit.label}
            className="flex flex-1 flex-col items-center"
            style={{ borderLeft: index === 0 ? undefined : `1px solid ${HAIRLINE}` }}
          >
            <span
              className="text-[22px] font-bold tabular-nums leading-none"
              style={{ color: INK }}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span
              className="mt-1.5 text-[9px] font-semibold uppercase"
              style={{ color: MUTED, letterSpacing: "0.18em" }}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
