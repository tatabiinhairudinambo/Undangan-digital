/** Ornamen dekoratif kartu; tidak menutupi teks atau menangkap sentuhan. */
export default function FloralCardFrame() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]" aria-hidden="true">
      <span className="absolute inset-[7px] rounded-[20px] border border-white/50" />
      {[
        "-left-2 -top-2",
        "-right-2 -top-2 rotate-90",
        "-bottom-2 -right-2 rotate-180",
        "-bottom-2 -left-2 -rotate-90",
      ].map((position) => (
        <svg key={position} viewBox="0 0 120 120" fill="none" className={`absolute h-[88px] w-[88px] ${position}`}>
          <path d="M15 107C18 66 30 31 105 16M22 76C34 47 57 30 89 24" stroke="#947443" strokeWidth="1.2" />
          <path d="M20 83C7 72 9 57 20 55C28 66 27 76 20 83ZM28 62C30 46 40 40 48 43C46 55 39 60 28 62ZM49 39C46 23 55 14 63 17C67 29 59 36 49 39ZM72 26C78 13 93 12 99 18C93 28 82 30 72 26" fill="#66836B" fillOpacity=".65" stroke="#F5F0DC" strokeWidth=".7" />
          <path d="M16 100C26 97 32 88 30 80C18 83 15 92 16 100ZM37 49C24 44 21 32 26 26C38 28 42 38 37 49" fill="#92A78A" fillOpacity=".65" />
          <g transform="translate(30 29)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse key={angle} cx="0" cy="-9" rx="6.5" ry="10" transform={`rotate(${angle})`} fill="#FFF9ED" fillOpacity=".92" stroke="#D7BE92" strokeWidth=".6" />
            ))}
            <circle r="4.5" fill="#C6A36A" />
            <circle r="2" fill="#F7E4B9" />
          </g>
          <g transform="translate(17 60)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse key={angle} cx="0" cy="-5.5" rx="4" ry="6" transform={`rotate(${angle})`} fill="#FFFDF6" stroke="#DDCDAE" strokeWidth=".5" />
            ))}
            <circle r="2.8" fill="#C6A36A" />
          </g>
          <circle cx="61" cy="18" r="2.5" fill="#F5E3BE" />
          <circle cx="14" cy="91" r="2" fill="#F5E3BE" />
        </svg>
      ))}
    </span>
  );
}
