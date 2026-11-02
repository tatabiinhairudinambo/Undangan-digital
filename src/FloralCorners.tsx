import GraduationCorner from "./GraduationCorner";

/** Bingkai sudut wisuda; dekorasi tidak menangkap sentuhan. */
export default function FloralCorners({
  tone = "#C6A36A",
  petal = "#F7E4B9",
  size = 64,
  className = "",
}: {
  tone?: string;
  petal?: string;
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
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`.trim()}>
      {corners.map((corner) => (
        <svg key={corner} viewBox="0 0 96 96" fill="none" className={`absolute ${corner}`} style={{ width: size, height: size }}>
          <GraduationCorner gold={tone} petal={petal} />
        </svg>
      ))}
    </span>
  );
}
