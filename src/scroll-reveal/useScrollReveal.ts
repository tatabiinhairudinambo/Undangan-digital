import { useContext } from "react";
import { ScrollRevealContext } from "./context";

export function useScrollReveal() {
  const ctx = useContext(ScrollRevealContext);
  if (!ctx) throw new Error("useScrollReveal must be used within <ScrollRevealProvider>");
  return ctx;
}
