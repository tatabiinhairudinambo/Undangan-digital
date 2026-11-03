/** Hiasan bunga dan topi wisuda di empat sudut sampul amplop. */
export default function EnvelopeFloralFrame() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[3px]">
      <span className="absolute inset-[6px] border border-[#C6A36A]/40" />
      {[
        "left-0 top-0",
        "right-0 top-0 -scale-x-100",
        "bottom-0 left-0 -scale-y-100",
        "bottom-0 right-0 -scale-x-100 -scale-y-100",
      ].map((position) => (
        <svg key={position} viewBox="0 0 100 100" fill="none" className={`absolute h-[76px] w-[76px] ${position}`}>
          <path d="M7 92V19Q7 7 19 7H92M12 77Q16 20 77 12" stroke="#C6A36A" strokeWidth="1.2" />
          <path d="M16 66Q2 51 10 40Q23 45 16 66ZM24 45Q19 25 31 20Q39 34 24 45ZM45 23Q47 9 63 10Q64 22 45 23ZM65 15Q75 3 88 8Q81 20 65 15" fill="#819276" stroke="#E8D9B8" strokeWidth=".8" />
          <path d="M12 81Q23 78 27 65Q12 64 12 81ZM36 30Q33 12 43 8Q51 19 36 30" fill="#B0B99A" stroke="#E8D9B8" strokeWidth=".8" />
          {[{ x: 22, y: 22, scale: 1, color: "#8F2034" }, { x: 13, y: 48, scale: .65, color: "#FFF4DF" }, { x: 48, y: 13, scale: .6, color: "#FFF4DF" }].map((flower) => (
            <g key={flower.x} transform={`translate(${flower.x} ${flower.y}) scale(${flower.scale})`}>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse key={angle} cy="-7" rx="5.5" ry="9" transform={`rotate(${angle})`} fill={flower.color} stroke="#D9BA81" strokeWidth=".7" />
              ))}
              <circle r="4" fill="#D5AF67" />
              <circle r="1.5" fill="#FFF1CB" />
            </g>
          ))}
          <g transform="translate(31 42) rotate(-22)">
            <path d="M0 7L13 1L26 7L13 13Z" fill="#8F2034" stroke="#E4C68C" />
            <path d="M5 11V17Q13 22 21 17V11" fill="#8F2034" stroke="#E4C68C" />
            <path d="M26 7V20M24 23L26 19L28 23" stroke="#C6A36A" strokeWidth="1.3" />
          </g>
          <circle cx="10" cy="87" r="2" fill="#C6A36A" />
          <circle cx="75" cy="23" r="1.5" fill="#C6A36A" />
        </svg>
      ))}
    </span>
  );
}
