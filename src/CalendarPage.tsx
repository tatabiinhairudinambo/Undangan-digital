import { type ReactNode } from "react";
import {
  CALENDAR_DATE,
  CALENDAR_NAME,
  type CalendarEvent,
} from "../components/calendarData";

/* ── iOS palette ──────────────────────────────────────────────────── */
const BG = "#F2F2F7"; // systemGroupedBackground (light)
const LABEL = "#000000";
const SECONDARY = "#8E8E93"; // secondary label
const SELECTOR = "#C4C4C6"; // up/down chevron tint

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif';

/* ── icons ────────────────────────────────────────────────────────── */
// Up/down chevron pair used by iOS for tappable pickers.
function SelectorIcon() {
  return (
    <svg width="13" height="22" viewBox="0 0 13 22" fill="none" aria-hidden>
      <path
        d="M3.5 8.5L6.5 5l3 3.5"
        stroke={SELECTOR}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 13.5l3 3.5 3-3.5"
        stroke={SELECTOR}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── pieces ───────────────────────────────────────────────────────── */
// A grouped-list row card (white, large radius) with a left label and a
// right-aligned value + optional trailing chevron picker.
function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between bg-white px-[18px]"
      style={{ height: 64, borderRadius: 22 }}
    >
      <span
        className="text-[19px] font-normal"
        style={{ color: LABEL }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────────────── */
export default function CalendarPage({ event }: { event: CalendarEvent }) {
  const startTime = event.time.split("–")[0]; // detail shows the start time

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: BG, fontFamily: SF }}
    >
      {/* scroll body */}
      <div
        className="absolute inset-0 overflow-y-auto px-4"
        style={{
          paddingTop: "calc(var(--safe-top) + 28px)",
          paddingBottom: "calc(var(--safe-bottom) + 40px)",
        }}
      >
        {/* event heading */}
        <h1
          className="mb-3 text-[30px] font-bold leading-[1.1]"
          style={{ color: LABEL }}
        >
          {event.title}
        </h1>
        <p className="text-[18px] font-normal" style={{ color: LABEL }}>
          {CALENDAR_DATE}
        </p>
        <p className="mt-0.5 text-[18px] font-normal" style={{ color: SECONDARY }}>
          {startTime}
        </p>

        {/* location */}
        <p className="mt-3 text-[18px] font-normal" style={{ color: LABEL }}>
          {event.locationName}
        </p>
        {event.locationAddress && (
          <p className="mt-0.5 text-[16px] font-normal" style={{ color: SECONDARY }}>
            {event.locationAddress}
          </p>
        )}

        {/* grouped rows */}
        <div className="mt-7 flex flex-col gap-4">
          <Row label="Kalender">
            <span
              className="h-[15px] w-[15px] rounded-full"
              style={{ background: event.indicatorColor }}
            />
            <span className="text-[19px]" style={{ color: SECONDARY }}>
              {CALENDAR_NAME}
            </span>
            <SelectorIcon />
          </Row>
          <Row label="Notifikasi">
            <span className="text-[19px]" style={{ color: SECONDARY }}>
              30 menit sebelumnya
            </span>
            <SelectorIcon />
          </Row>
        </div>
      </div>
    </div>
  );
}
