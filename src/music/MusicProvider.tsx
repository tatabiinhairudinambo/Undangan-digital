import { useEffect, useRef, useState, type ReactNode } from "react";
import { MusicContext } from "./context";
import type { MusicTrack } from "./types";

// Audio uploaded for this invitation.
const PLAYLIST: MusicTrack[] = [
  { file: "ssstik.io_1793610599459", title: "Musik Undangan", artist: "Audio pilihan" },
];

const srcFor = (track: MusicTrack) => `/music/${track.file}.mp3`;

/**
 * Owns the <audio> element so playback survives lock/unlock. Unlike a YouTube
 * iframe, a plain <audio> never gets promoted to a native fullscreen video
 * player in in-app WebViews (Zalo/FB), so it can never overlay the UI.
 *
 * The playlist is driven entirely from React: currentIndex picks the src, and
 * track changes load the matching file. Index is the single source of truth.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // When the track changes, the bound src attribute resets playback; start the
  // new track if we're in a playing state. Skips the initial mount (not playing).
  useEffect(() => {
    if (!playing) return;
    audioRef.current?.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Load a specific track and start playing it. Index is the single source of
  // truth; changing it swaps the <audio> src on the next render.
  const playIndex = (i: number) => {
    const idx = ((i % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
    if (idx === indexRef.current && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => setPlaying(false));
    }
    indexRef.current = idx;
    setCurrentIndex(idx);
    setCurrentTime(0);
    setDuration(0);
    setPlaying(true);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const prev = () => playIndex(indexRef.current - 1);
  const next = () => playIndex(indexRef.current + 1);

  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (!a || duration <= 0) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    a.currentTime = clamped * duration;
    setCurrentTime(clamped * duration);
  };

  const track = PLAYLIST[currentIndex] ?? PLAYLIST[0];

  return (
    <MusicContext.Provider
      value={{ track, playing, currentTime, duration, togglePlay, prev, next, seek }}
    >
      <audio
        ref={audioRef}
        src={srcFor(PLAYLIST[currentIndex])}
        preload="metadata"
        loop={PLAYLIST.length === 1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={() => playIndex(indexRef.current + 1)}
      />
      {children}
    </MusicContext.Provider>
  );
}
