interface RsvpWidgetProps {
  onClick?: () => void;
}

// Widget layar utama: pintu masuk cepat ke app RSVP.
export function RsvpWidget({ onClick }: RsvpWidgetProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? "Buka konfirmasi kehadiran" : undefined}
      className={
        "relative h-[158px] w-[158px] overflow-hidden" +
        (onClick
          ? " cursor-pointer transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.97]"
          : "")
      }
      style={{
        borderRadius: 27,
        fontFamily: '"SF Pro Display", -apple-system, system-ui, sans-serif',
        background: "linear-gradient(160deg, #34C759, #1B9E4B)",
      }}
    >
      {/* Highlight lembut di pojok kiri atas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.30), rgba(255,255,255,0) 60%)",
        }}
      />

      {/* Header: ikon centang + label */}
      <div
        className="pointer-events-none absolute flex items-center"
        style={{ left: 17, top: 20, gap: 5 }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
          <path
            d="M7.5 12.5l3.2 3.2 6-6.4"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ fontSize: 13, lineHeight: "16px", fontWeight: 500, color: "#fff" }}>
          RSVP
        </span>
      </div>

      {/* Judul + keterangan, rata bawah */}
      <div
        className="absolute flex flex-col"
        style={{
          left: 17,
          top: 54,
          width: 124,
          height: 84,
          justifyContent: "flex-end",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: 15,
            lineHeight: "23px",
            letterSpacing: -0.3,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Konfirmasi kehadiran
        </div>
        <div
          style={{
            fontSize: 13,
            lineHeight: "16px",
            letterSpacing: -0.1,
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Daftar tamu
        </div>
      </div>
    </div>
  );
}
