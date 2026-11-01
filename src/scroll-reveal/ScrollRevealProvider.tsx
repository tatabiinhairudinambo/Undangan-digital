import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { AppDef } from "../app-nav";
import { ScrollRevealContext, type ScrollRevealState } from "./context";

/**
 * Menyimpan urutan app + langkah aktif. Dipasang di luar `AppNavProvider`
 * supaya konten di dalam modal (ScrollStage) bisa membaca langkah yang sama.
 */
export function ScrollRevealProvider({
  apps,
  stopAtKey,
  children,
}: {
  apps: AppDef[];
  stopAtKey?: string;
  children: ReactNode;
}) {
  const [step, setStep] = useState(1);
  const [active, setActive] = useState(false);
  const locked = active && stopAtKey !== undefined && apps[step - 1]?.key === stopAtKey;

  const next = useCallback(() => {
    if (locked) return;
    if (!active) {
      // Scroll pertama selalu mulai dari app pertama (galeri).
      setStep(1);
      setActive(true);
      return;
    }
    setStep((current) => Math.min(apps.length, current + 1));
  }, [active, apps.length, locked]);

  const prev = useCallback(() => {
    if (locked) return;
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    setActive(false);
  }, [step, locked]);

  const hide = useCallback(() => setActive(false), []);

  const value = useMemo<ScrollRevealState>(
    () => ({ apps, step, active, locked, next, prev, hide }),
    [apps, step, active, locked, next, prev, hide]
  );

  return (
    <ScrollRevealContext.Provider value={value}>
      {children}
    </ScrollRevealContext.Provider>
  );
}
