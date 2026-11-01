import { useRef } from "react";
import AppFolder, { type FolderChild } from "./AppFolder";
import { isAppEntry } from "./app-folder/types";
import PhotosPage from "./PhotosPage";
import NotesPage from "./NotesPage";
import CalculatorPage from "./CalculatorPage";
import WalletPage from "./WalletPage";
import YouTubePage from "./YouTubePage";
import SettingsPage from "./SettingsPage";
import CalendarPage from "./CalendarPage";
import LocationPage from "./LocationPage";
import { CalendarWidget } from "../components/CalendarWidget";
import {
  CALENDAR_EVENTS,
  type CalendarEvent,
} from "../components/calendarData";
import { LocationWidget } from "../components/LocationWidget";
import { RsvpWidget } from "../components/RsvpWidget";
import Dock, { DOCK_APPS } from "../components/Dock";
import { AppNavProvider, useAppOpener, type AppDef } from "./app-nav";
import { MAPS_URL } from "../lib/maps";
import { ScrollReveal } from "./scroll-reveal/ScrollReveal";
import { ScrollRevealProvider } from "./scroll-reveal/ScrollRevealProvider";

// Each tapped event opens the Calendar app showing that event's detail.
// Opened from a widget (not an icon) → no landing-icon morph.
const calendarAppForEvent = (event: CalendarEvent): AppDef => ({
  key: "calendar",
  iconSrc: "/icons/calendar.png",
  render: () => <CalendarPage event={event} />,
  chrome: { closeButton: "none" },
  hideIcon: true,
});

const ITEMS: FolderChild[] = [
  {
    key: "calendar",
    label: "Kalender",
    iconSrc: "/icons/calendar.png",
    app: <CalendarPage event={CALENDAR_EVENTS[1]} />,
    chrome: { closeButton: "none" },
  },
  { key: "map", label: "Peta", iconSrc: "/icons/map.svg", app: <LocationPage /> },
  {
    key: "notes",
    label: "Undangan",
    iconSrc: "/icons/notes.svg",
    app: <NotesPage />,
    chrome: { closeButton: "none" },
  },
  {
    key: "photos",
    label: "Foto",
    iconSrc: "/icons/photos.svg",
    app: <PhotosPage />,
  },
  {
    key: "youtube",
    label: "YouTube",
    iconSrc: "/icons/youtube.png",
    app: <YouTubePage />,
    background: "#000000",
  },
  {
    key: "wallet",
    label: "Dompet",
    iconSrc: "/icons/wallet.svg",
    app: <WalletPage />,
    background: "#000000",
  },
  {
    key: "calculator",
    label: "Kalkulator",
    iconSrc: "/icons/calculator.png",
    app: <CalculatorPage />,
    background: "#000000",
  },
  {
    key: "settings",
    label: "Pengaturan",
    iconSrc: "/icons/settings.png",
    app: <SettingsPage />,
    background: "#F2F2F7",
  },
];

const BG_OFFSET_Y = 72;

// Urutan section undangan wisuda saat layar utama di-scroll.
// Aplikasi dekoratif (Kalkulator, Pengaturan) tetap bisa dibuka lewat tap,
// tetapi tidak ikut tur agar alurnya tetap fokus.
const SCROLL_ORDER = [
  "photos",
  "notes",
  "calendar",
  "map",
  "youtube",
  "Messages",
  "wallet",
  "Phone",
  "rsvp",
];

// Folder items → AppDef, supaya bisa dibuka lewat pengendali scroll.
const FOLDER_APPS: AppDef[] = ITEMS.flatMap((item) => {
  if (!isAppEntry(item)) return [];
  const entry = item;
  const app: AppDef = {
    key: entry.key,
    iconSrc: entry.iconSrc,
    render: () => entry.app,
    chrome: entry.chrome,
    background: entry.background,
  };
  return [app];
});

const ALL_APPS: AppDef[] = [
  ...FOLDER_APPS,
  // Foto sudah ada di folder; hindari duplikat.
  ...DOCK_APPS.filter((app) => app.key !== "Photos"),
];

// hideIcon: app membesar dari tengah layar tanpa ikon yang ikut terbang.
// Section hanya diambil dari SCROLL_ORDER di atas.
const SCROLL_APPS: AppDef[] = SCROLL_ORDER.flatMap((key) => {
  const app = ALL_APPS.find((candidate) => candidate.key === key);
  return app ? [{ ...app, hideIcon: true }] : [];
});

// Tappable Calendar widget: tapping an event row morphs the whole widget into
// the Calendar app for that event. The widget stays mounted (no self-hide), so
// the modal cleanly reveals it again as it collapses back on close.
function CalendarWidgetButton() {
  const openApp = useAppOpener();
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={rootRef} style={{ borderRadius: 27, overflow: "hidden" }}>
      <CalendarWidget
        onEventClick={(i) => {
          const el = rootRef.current;
          if (el) openApp(calendarAppForEvent(CALENDAR_EVENTS[i]), el);
        }}
      />
    </div>
  );
}

// Tappable RSVP widget: membuka app konfirmasi kehadiran langsung dari widget.
function RsvpWidgetButton() {
  const openApp = useAppOpener();
  const rootRef = useRef<HTMLDivElement>(null);
  const app = DOCK_APPS.find((candidate) => candidate.key === "rsvp");

  return (
    <div ref={rootRef} style={{ borderRadius: 27, overflow: "hidden" }}>
      <RsvpWidget
        onClick={() => {
          const el = rootRef.current;
          if (el && app) openApp(app, el);
        }}
      />
    </div>
  );
}

export default function IosAppFolder() {
  const extra = Math.abs(BG_OFFSET_Y) * 2;
  return (
    <ScrollRevealProvider apps={SCROLL_APPS} stopAtKey="rsvp">
      <AppNavProvider>
        <ScrollReveal />
        <div className="fixed inset-0 font-sans overflow-hidden" data-scroll-reveal-root>
          <div
            className="absolute left-0 right-0 bg-cover bg-no-repeat"
            style={{
              [BG_OFFSET_Y >= 0 ? "top" : "bottom"]: 0,
              height: `calc(100% + ${extra}px)`,
              backgroundPosition:
                BG_OFFSET_Y >= 0 ? "center top" : "center bottom",
              backgroundImage: "url('/wallpaper-home.jpeg')",
            }}
          />
          <div
            className="relative mx-auto grid pt-12"
            style={{
              gridTemplateColumns: "repeat(4, 71px)",
              gap: "16px",
              width: "fit-content",
            }}
          >
            <div className="col-span-2 row-span-2">
              <CalendarWidgetButton />
            </div>
            <div className="col-span-2 row-span-2">
              <LocationWidget href={MAPS_URL} />
            </div>
            <div className="col-span-2 row-span-2">
              <AppFolder title="Aplikasi" items={ITEMS} />
            </div>
            <div className="col-span-2 row-span-2">
              <RsvpWidgetButton />
            </div>
          </div>
          <Dock />
        </div>
      </AppNavProvider>
    </ScrollRevealProvider>
  );
}
