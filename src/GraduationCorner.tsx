/** Sudut pita wisuda merah, lis emas, dan satu bunga kecil. */
export default function GraduationCorner({
  gold = "#C6A36A",
  petal = "#FFF4DF",
}: { gold?: string; petal?: string }) {
  return (
    <>
      <path d="M0 82V0H82L68 12H12V68Z" fill="#A91F36" />
      <path d="M5 74V5H74M17 55V17H55" stroke={gold} strokeWidth="1.5" />
      <path d="M0 0H36L0 36Z" fill="#C6283E" />
      <g transform="translate(20 20)">
        <path d="M0 10L16 2L32 10L16 18Z" fill="#8F2034" stroke={gold} strokeWidth="1.3" />
        <path d="M6 15V22Q16 29 26 22V15" fill="#8F2034" stroke={gold} strokeWidth="1.3" />
        <path d="M32 10V25L29 29H35L32 25" stroke={gold} strokeWidth="1.3" />
      </g>
      <path d="M10 70Q21 57 38 59M19 62Q14 50 20 48Q28 54 19 62M27 59Q29 49 36 50Q37 58 27 59" stroke={gold} fill="#839177" strokeWidth=".8" />
      <g transform="translate(40 59)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cx="0" cy="-4.5" rx="3" ry="5" transform={`rotate(${angle})`} fill={petal} stroke={gold} strokeWidth=".6" />
        ))}
        <circle r="2.5" fill={gold} />
      </g>
      <path d="M60 17L63 20L60 23L57 20Z" fill={gold} />
    </>
  );
}
