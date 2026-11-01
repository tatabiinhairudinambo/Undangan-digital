/** Nama penerima yang sama untuk sampul, isi undangan, dan RSVP. */
export function getGuestName() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("to")?.trim() ?? "";
}
