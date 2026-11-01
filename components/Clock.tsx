import { useEffect, useState } from "react";

interface ClockProps {
  time?: string;
  fontSize?: number | string;
  showDate?: boolean;
}

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  timeZone: "Asia/Jakarta", weekday: "long", day: "numeric", month: "long", year: "numeric",
});

export function Clock({
  time,
  fontSize = "clamp(80px, 22cqw, 312px)",
  showDate = false,
}: ClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (time && !showDate) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [time, showDate]);

  const value = time ?? timeFormatter.format(now);

  return (
    <div className="text-center">
      {showDate && <p className="mt-4 text-lg font-medium text-white">{dateFormatter.format(now)}</p>}
      <div
      className="inline-block"
      style={{
        fontFamily: "Inter, -apple-system, system-ui, sans-serif",
        fontWeight: 500,
        fontSize,
        lineHeight: 1.21,
        letterSpacing: 0,
        color: "#ffffff",
        textShadow:
          "0 2px 8px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.22)",
      }}
    >
      {value}
      </div>
    </div>
  );
}
