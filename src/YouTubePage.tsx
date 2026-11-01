const SF_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif';

// ID video YouTube contoh. Ganti dengan video wisuda Anda sendiri.
const VIDEO_ID = "XqgyD0yadH0";
const VIDEO_TITLE = "Video Wisuda — Raka Dwi Pratama";
const VIDEO_ARTIST = "Universitas Cakrawala Nusantara";

// Warm pink used for the stat chips and the description card (matches the mock).
const PINK = "#FBE9EA";
// YouTube link blue for the inline hashtags inside the description.
const LINK = "#3D6CE7";

// A pink rounded stat tile (likes / views / date).
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center rounded-2xl py-3"
      style={{ backgroundColor: PINK }}
    >
      <span className="text-[18px] font-bold text-[#1C1C1E]">{value}</span>
      <span className="mt-0.5 text-[13px] text-[#6B6B70]">{label}</span>
    </div>
  );
}

function HashChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-[#F2F2F2] px-3.5 py-1.5 text-[14px] font-medium text-[#1C1C1E]">
      {label}
    </span>
  );
}

export default function YouTubePage() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-black"
      style={{ fontFamily: SF_STACK }}
    >
      {/* Video player — 16:9, pinned below the status bar. */}
      <div
        className="w-full shrink-0"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            title="Pemutar video YouTube"
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      {/* Description sheet — rounded white panel that overlaps the video bottom. */}
      <div className="relative -mt-3 flex min-h-0 flex-1 flex-col rounded-t-[20px] bg-white">
        {/* Grabber */}
        <div className="flex justify-center pt-2.5">
          <div className="h-1 w-9 rounded-full bg-[#D1D1D6]" />
        </div>

        {/* Sheet header */}
        <header className="flex items-center justify-between px-5 pb-3 pt-3">
          <h1 className="text-[22px] font-bold text-[#1C1C1E]">Deskripsi</h1>
        </header>

        <div className="h-px w-full bg-[#EDEDED]" />

        {/* Scrollable body */}
        <div
          className="min-h-0 flex-1 overflow-y-auto px-5 pt-5"
          style={{ paddingBottom: "calc(var(--safe-bottom) + 80px)" }}
        >
          <h2 className="text-[22px] font-bold leading-tight text-[#1C1C1E]">
            {VIDEO_TITLE} | Official Music Video
          </h2>

          {/* Stat tiles */}
          <div className="mt-4 flex gap-3">
            <Stat value="1,2 rb" label="Suka" />
            <Stat value="24 rb" label="Tayangan" />
            <Stat value="2026" label="11 Nov" />
          </div>

          {/* Hashtag chips */}
          <div className="mt-4 flex flex-wrap gap-2.5">
            <HashChip label="#wisuda" />
            <HashChip label="#undangandigital" />
            <HashChip label="#graduation" />
          </div>

          {/* Description card */}
          <div
            className="mt-4 rounded-2xl px-4 py-4 text-[15px] leading-[1.5] text-[#1C1C1E]"
            style={{ backgroundColor: PINK }}
          >
            <p>{VIDEO_TITLE} | Official Music Video</p>
            <p className="mt-1" style={{ color: LINK }}>
              #wisuda #undangandigital #graduation #university
            </p>
            <p className="mt-3 whitespace-pre-line">
              {`"hari ini kututup satu bab\ndan membuka lembaran baru\nterima kasih untuk semua doa dan dukungannya"`}
              <span className="font-semibold">…lainnya</span>
            </p>
          </div>

          {/* Music section */}
          <div className="mt-6">
            <h3 className="text-[20px] font-bold text-[#1C1C1E]">Musik</h3>
            <p className="mt-0.5 text-[14px] text-[#6B6B70]">1 lagu</p>

            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#F7F7F7] p-3">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-[#D9A6AD] to-[#8E5A66]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-[#1C1C1E]">
                  {VIDEO_TITLE}
                </p>
                <p className="truncate text-[13px] text-[#6B6B70]">{VIDEO_ARTIST}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
