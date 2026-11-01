/**
 * Link Google Maps universal untuk lokasi acara (Gedung Serbaguna Melati).
 *
 * Memakai penelusuran nama tempat sehingga Maps membuka kartu tempat yang benar,
 * bukan pin koordinat mentah. Sebagai universal link, link ini otomatis membuka
 * aplikasi Google Maps di ponsel bila terpasang.
 * https://developers.google.com/maps/documentation/urls/get-started
 */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gedung+Serbaguna+Melati+Jakarta+Selatan";

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPod/i.test(ua)) return true;
  // iPadOS 13+ reports a desktop "Macintosh" UA; detect it via touch points.
  return /iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * Mobile: navigate in the same tab so iOS/Android hand off to the Google Maps
 * app. Desktop: open a new browser tab.
 */
export function openMaps(url: string = MAPS_URL): void {
  if (isMobile()) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
