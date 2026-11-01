import { useEffect, useRef } from "react";

/** Bunyi tiga nada sintetis, tanpa file audio atau unduhan tambahan. */
export function useNotificationSound(ready: boolean, delay: number) {
  const played = useRef(false);

  useEffect(() => {
    if (!ready || played.current) return;
    let context: AudioContext | undefined;
    let disposed = false;

    const removeListeners = () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };

    const play = () => {
      if (disposed || played.current || context?.state !== "running") return;
      played.current = true;
      removeListeners();
      const audio = context;
      const start = audio.currentTime + 0.02;
      [659.25, 830.61, 987.77].forEach((frequency, index) => {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        const at = start + index * 0.14;
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, at);
        gain.gain.linearRampToValueAtTime(0.12, at + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.001, at + 0.55);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(at);
        oscillator.stop(at + 0.6);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
          if (index === 2 && audio.state !== "closed") void audio.close().catch(() => {});
        };
      });
    };

    function resume(event: Event) {
      if (event instanceof KeyboardEvent && (event.repeat || !["Enter", " "].includes(event.key))) return;
      if (context && context.state !== "closed") {
        void context.resume().then(play).catch(() => {});
      }
    }

    const timer = window.setTimeout(() => {
      if (disposed || !window.AudioContext) return;
      try {
        context = new AudioContext();
        context.onstatechange = play;
        window.addEventListener("pointerdown", resume);
        window.addEventListener("keydown", resume);
        play();
        // Langsung berbunyi jika browser mengizinkan autoplay.
        if (!played.current) void context.resume().then(play).catch(() => {});
      } catch {
        removeListeners();
      }
    }, delay * 1000);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      removeListeners();
      if (context) {
        context.onstatechange = null;
        if (context.state !== "closed") void context.close().catch(() => {});
      }
    };
  }, [ready, delay]);
}
