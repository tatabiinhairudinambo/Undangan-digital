/**
 * Bingkai bunga di keempat sudut kartu. Ditempatkan absolut di dalam kartu
 * ber-`relative`, tidak menangkap sentuhan dan tidak menggeser isi kartu.
 */
export default function FloralCorners({
  tone = "#C6A36A",
  petal = "#F7E4B9",
  size = 64,
  className = "",
}: {
  /** Warna garis, daun, dan putik. */
  tone?: string;
  /** Warna kelopak bunga. */
  petal?: string;
  /** Sisi ornamen dalam px. */
  size?: number;
  className?: string;
}) {
  const corners = [
    "left-0 top-0",
    "right-0 top-0 rotate-90",
    "bottom-0 right-0 rotate-180",
    "bottom-0 left-0 -rotate-90",
  ];

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`.trim()}
    >
      {corners.map((corner) => (
        <svg
          key={corner}
          viewBox="0 0 96 96"
          fill="none"
          className={`absolute ${corner}`}
          style={{ width: size, height: size }}
        >
          {/* Sulur utama dari tepi kiri ke tepi atas */}
          <path
            d="M0 60C9 37 25 19 48 9"
            stroke={tone}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity=".8"
          />
          <path
            d="M0 80C16 74 28 62 34 46"
            stroke={tone}
            strokeWidth="1"
            strokeLinecap="round"
            opacity=".45"
          />

          {/* Daun */}
          <path
            d="M19 41C9 40 2 31 4 22C13 24 20 31 19 41Z"
            fill={tone}
            fillOpacity=".22"
            stroke={tone}
            strokeWidth=".9"
          />
          <path
            d="M35 26C30 17 33 6 42 1C47 10 45 20 35 26Z"
            fill={tone}
            fillOpacity=".22"
            stroke={tone}
            strokeWidth=".9"
          />
          <path
            d="M12 67C5 62 4 53 9 47C16 52 18 60 12 67Z"
            fill={tone}
            fillOpacity=".18"
            stroke={tone}
            strokeWidth=".8"
          />

          {/* Bunga di ujung sulur */}
          <g transform="translate(52 13)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-7.5"
                rx="4.6"
                ry="7.2"
                transform={`rotate(${angle})`}
                fill={petal}
                fillOpacity=".92"
                stroke={tone}
                strokeWidth=".6"
              />
            ))}
            <circle r="3" fill={tone} />
            <circle r="1.3" fill={petal} />
          </g>

          {/* Kuncup kecil */}
          <circle cx="71" cy="25" r="1.8" fill={tone} opacity=".65" />
          <circle cx="64" cy="40" r="1.3" fill={tone} opacity=".5" />
          <circle cx="44" cy="52" r="1.2" fill={tone} opacity=".5" />
        </svg>
      ))}
    </span>
  );
}
