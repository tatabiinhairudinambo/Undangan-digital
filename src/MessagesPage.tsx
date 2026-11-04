import { ChevronRight, Mic } from "lucide-react";
import styles from "./messages.module.css";

const SF_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif';

type Entry =
  | { kind: "date"; text: string }
  | { kind: "text"; side: "sent" | "received"; text: string; tapback?: string };

// "received" = Mama, "sent" = Febrianti. Contoh percakapan — ganti dengan milik Anda.
const THREAD: Entry[] = [
  { kind: "date", text: "Hari ini 09.41" },
  { kind: "text", side: "received", text: "Feb, undangan wisudanya sudah jadi?" },
  { kind: "text", side: "sent", text: "Sudah, Ma. Kubikin bentuknya kayak iPhone 😄" },
  { kind: "text", side: "received", text: "Dibuka di HP langsung bisa, ya?" },
  { kind: "text", side: "sent", text: "Bisa. Tinggal scroll, semua informasinya muncul satu per satu" },
  { kind: "text", side: "received", text: "Nanti Mama kabari keluarga besar ya" },
  { kind: "text", side: "sent", text: "Siap, Ma. Doain lancar sampai prosesi 🙏" },
  { kind: "text", side: "received", text: "Aamiin. Mama bangga sama kamu ❤️", tapback: "❤️" },
];

// iOS contact monogram: initials on the system gray gradient (no photo).
const MONOGRAM_BG = "linear-gradient(#a5abb9, #858b98)";

function TextBubble({
  side,
  text,
  tapback,
}: {
  side: "sent" | "received";
  text: string;
  tapback?: string;
}) {
  const sent = side === "sent";
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"} mb-1.5`}>
      <div className="relative max-w-[75%]">
        <div
          className={`relative rounded-[20px] px-3.5 py-2 text-[16px] leading-[20px] ${
            sent
              ? `bg-[#0088ff] text-white ${styles.sentTail}`
              : `bg-[#cfd1d4] text-[#333] ${styles.recvTail}`
          }`}
        >
          <span className="relative z-10 block">{text}</span>
        </div>
        {tapback && (
          <span className="absolute -top-3 -right-1 z-20 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#cfd1d4] text-[13px] shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
            {tapback}
          </span>
        )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <div
      className="flex h-full w-full flex-col bg-white"
      style={{ fontFamily: SF_STACK }}
    >
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col">
        {/* Header */}
        <header
          className="relative z-10 shrink-0 border-b border-black/5 bg-white/70 backdrop-blur-xl"
          style={{ paddingTop: "calc(var(--safe-top) + 10px)" }}
        >
          <div className="relative flex items-start justify-center px-3 pb-2">
            {/* Centered avatar + name */}
            <div className="flex flex-col items-center">
              <div
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-full text-[24px] font-semibold text-white select-none shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                style={{ background: MONOGRAM_BG }}
              >
                M
              </div>
              <div className="mt-1 flex items-center gap-0.5 text-[13px] font-medium text-black">
                <span>Mama</span>
                <ChevronRight size={13} strokeWidth={2.5} className="text-[#bcbcbc]" />
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-2">
          {THREAD.map((e, i) => {
            if (e.kind === "date") {
              return (
                <div
                  key={i}
                  className="my-2.5 text-center text-[12px] font-medium text-[#8e8e93]"
                >
                  {e.text}
                </div>
              );
            }
            return (
              <TextBubble
                key={i}
                side={e.side}
                text={e.text}
                tapback={e.tapback}
              />
            );
          })}
        </main>

        {/* Input bar */}
        <footer
          className="shrink-0 px-3 pt-2"
          style={{ paddingBottom: "calc(var(--safe-bottom) + 10px)" }}
        >
          <div className="flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 backdrop-blur-xl">
            <span className="flex-1 text-[16px] text-[#bcbcbc]">iMessage</span>
            <Mic size={20} strokeWidth={2} className="text-[#cccccc]" />
          </div>
        </footer>
      </div>
    </div>
  );
}
