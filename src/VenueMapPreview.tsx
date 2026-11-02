import { MapPin, Navigation } from "lucide-react";
import { openMaps } from "../lib/maps";

/** Ilustrasi lokasi, bukan data geografis atau bangunan Google Maps. */
export default function VenueMapPreview() {
  return (
    <div className="venue-map-preview">
      <div className="absolute left-3 top-3 z-10 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[#425b4c] shadow-sm">LOKASI ACARA</div>
      <svg viewBox="0 0 360 220" className="block h-[200px] w-full" role="img" aria-label="Ilustrasi peta tiga dimensi dengan gedung acara dan pin merah">
        <defs>
          <linearGradient id="venue-map-ground" x2="1" y2="1"><stop stopColor="#E7F0E4" /><stop offset="1" stopColor="#CBDCC9" /></linearGradient>
          <linearGradient id="venue-map-roof" x2="0" y2="1"><stop stopColor="#D94C5E" /><stop offset="1" stopColor="#9B2035" /></linearGradient>
        </defs>
        <path d="M-40 110L174 5L402 111L183 235Z" fill="#AABEAC" />
        <path d="M-40 100L174 -5L402 101L183 225Z" fill="url(#venue-map-ground)" />
        <path d="M-10 85L320 240M65 -15L390 144M-15 190L335 13" stroke="#C0CCBE" strokeWidth="23" />
        <path d="M-10 82L320 237M65 -18L390 141M-15 187L335 10" stroke="#FFFEF6" strokeWidth="17" />
        <path d="M-15 187L335 10" stroke="#E9C974" strokeWidth="2" strokeDasharray="8 6" />
        {[[64, 104], [273, 116], [115, 42], [288, 65]].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <path d="M-20 0L4 -12L26 0L2 14Z" fill="#D8DFD9" />
            <path d="M-20 0V-23L2 -10V14Z" fill="#A7B6B2" />
            <path d="M2 -10L26 -23V0L2 14Z" fill="#BAC9C4" />
            <path d="M-20 -23L4 -35L26 -23L2 -10Z" fill="#F6F7F0" />
          </g>
        ))}
        <ellipse cx="186" cy="151" rx="55" ry="18" fill="#506E5B" opacity=".18" />
        <path d="M137 117L183 140L230 116V151L184 177L137 153Z" fill="#C8B99D" />
        <path d="M137 117L184 140V177L137 153Z" fill="#F6E9CC" />
        <path d="M130 115L181 88L237 114L184 143Z" fill="url(#venue-map-roof)" />
        <path d="M130 115L181 88L237 114" fill="none" stroke="#F4CF8D" strokeWidth="2" />
        <path d="M173 151V169M158 144V162M145 138V155" stroke="#FFFCED" strokeWidth="6" />
        <path d="M194 147V158L202 154V143ZM211 138V149L219 145V134Z" fill="#527C8A" />
        {[[93, 155], [246, 163], [57, 63], [304, 139]].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <ellipse cy="6" rx="13" ry="6" fill="#64866B" opacity=".2" />
            <path d="M0 4V-14" stroke="#847354" strokeWidth="3" />
            <ellipse cy="-17" rx="10" ry="14" fill="#799C72" />
            <ellipse cx="-3" cy="-20" rx="6" ry="10" fill="#A3BC8D" />
          </g>
        ))}
        <ellipse cx="183" cy="100" rx="12" ry="5" fill="#5D2535" opacity=".25" />
        <path d="M183 37C171 37 163 45 163 56C163 71 183 90 183 90S203 71 203 56C203 45 195 37 183 37Z" fill="#C6283E" stroke="#FFF4DD" strokeWidth="2" />
        <circle cx="183" cy="56" r="7" fill="#FFF5DE" />
      </svg>
      <span className="absolute bottom-2 right-3 text-[9px] text-[#4C6252]">Ilustrasi peta 3D</span>
      <span aria-hidden="true" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#9E2036] shadow-sm"><Navigation size={15} /></span>
      <button type="button" onClick={() => openMaps()} className="absolute inset-0 cursor-pointer rounded-t-[18px] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#9E2036]" aria-label="Buka Gedung Serbaguna Melati di Google Maps"><MapPin className="sr-only" /></button>
    </div>
  );
}
