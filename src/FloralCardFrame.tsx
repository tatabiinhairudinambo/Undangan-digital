import GraduationCorner from "./GraduationCorner";

/** Badge topi wisuda. Dipakai di bingkai, atau di belakang teks judul. */
export function GraduationBadge({
  className = "",
  size = 28,
}: {
  className?: string;
  /** Lebar ikon topi dalam px. */
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`rounded-full bg-[#F2F2F7] ${className}`.trim()}
    >
      <svg
        width={size}
        height={Math.round((size * 22) / 28)}
        viewBox="0 0 28 22"
        fill="none"
        className="block"
      >
        <path d="M2 8L14 2L26 8L14 14L2 8Z" fill="#8F2034" stroke="#C6A36A" />
        <path d="M7 11V16C11 20 17 20 21 16V11" stroke="#8F2034" strokeWidth="2" />
        <path d="M26 8V17M24.5 19L26 16L27.5 19" stroke="#C6A36A" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

/** Ornamen dekoratif kartu; tidak menutupi teks atau menangkap sentuhan. */
export default function FloralCardFrame({
  graduation = false,
  badge = true,
}: {
  graduation?: boolean;
  /** Tampilkan badge topi di tengah atas bingkai. */
  badge?: boolean;
}) {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]" aria-hidden="true">
      <span className={`absolute inset-[7px] rounded-[20px] border ${graduation ? "border-[#AD3447]/50" : "border-white/50"}`} />
      {graduation && <span className="absolute inset-[11px] rounded-[17px] border border-[#C6A36A]/40" />}
      {[
        "left-0 top-0",
        "right-0 top-0 rotate-90",
        "bottom-0 right-0 rotate-180",
        "bottom-0 left-0 -rotate-90",
      ].map((position) => (
        <svg key={position} viewBox={graduation ? "0 0 96 96" : "0 0 120 120"} fill="none" className={`absolute h-[88px] w-[88px] ${position}`}>
          {graduation ? <GraduationCorner /> : <>
          <path d="M15 107C18 66 30 31 105 16M22 76C34 47 57 30 89 24" stroke="#947443" strokeWidth="1.2" />
          <path d="M20 83C7 72 9 57 20 55C28 66 27 76 20 83ZM28 62C30 46 40 40 48 43C46 55 39 60 28 62ZM49 39C46 23 55 14 63 17C67 29 59 36 49 39ZM72 26C78 13 93 12 99 18C93 28 82 30 72 26" fill="#66836B" fillOpacity=".65" stroke="#F5F0DC" strokeWidth=".7" />
          <path d="M16 100C26 97 32 88 30 80C18 83 15 92 16 100ZM37 49C24 44 21 32 26 26C38 28 42 38 37 49" fill="#92A78A" fillOpacity=".65" />
          <g transform="translate(30 29)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse key={angle} cx="0" cy="-9" rx="6.5" ry="10" transform={`rotate(${angle})`} fill={graduation ? "#AF233D" : "#FFF9ED"} fillOpacity=".92" stroke={graduation ? "#E38B94" : "#D7BE92"} strokeWidth=".6" />
            ))}
            <circle r="4.5" fill="#C6A36A" />
            <circle r="2" fill="#F7E4B9" />
          </g>
          <g transform="translate(17 60)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse key={angle} cx="0" cy="-5.5" rx="4" ry="6" transform={`rotate(${angle})`} fill={graduation ? "#D84B5B" : "#FFFDF6"} stroke={graduation ? "#F2B1AE" : "#DDCDAE"} strokeWidth=".5" />
            ))}
            <circle r="2.8" fill="#C6A36A" />
          </g>
          <circle cx="61" cy="18" r="2.5" fill="#F5E3BE" />
          <circle cx="14" cy="91" r="2" fill="#F5E3BE" />
          </>}
        </svg>
      ))}
      {graduation && badge && (
        <GraduationBadge className="absolute left-1/2 top-1 -translate-x-1/2 px-3 py-1" />
      )}
    </span>
  );
}
