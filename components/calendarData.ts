// Shared source of truth for the Calendar widget (home screen) and the
// Calendar app's event-detail screen. Editing an event here updates both.

export interface CalendarEvent {
  title: string;
  /** en-dash range, e.g. "14:30–15:00" */
  time: string;
  indicatorColor: string;
  bgColor: string;
  titleColor: string;
  timeColor: string;
  /** Venue, shown on the detail screen. */
  locationName: string;
  locationAddress: string;
}

export const CALENDAR_WEEKDAY = "SABTU";
export const CALENDAR_DAY = "21";

/** Full date line shown on the event-detail screen (same day for all events). */
export const CALENDAR_DATE = "Sabtu, 21/11/2026";
/** Back-button label — the event's day. */
export const CALENDAR_BACK_LABEL = "21 Nov";
/** Name of the calendar these events live in (shown in the "Kalender" row). */
export const CALENDAR_NAME = "Wisuda";

const VENUE = "Gedung Serbaguna Melati";
const ADDRESS = "Jl. Jend. Sudirman No. 123, Jakarta Selatan";

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    title: "Registrasi Wisudawan",
    time: "07:00–07:30",
    indicatorColor: "#FFC901",
    bgColor: "#FEF9E7",
    titleColor: "#73531E",
    timeColor: "#C69700",
    locationName: VENUE,
    locationAddress: ADDRESS,
  },
  {
    title: "Prosesi Wisuda",
    time: "08:00–10:30",
    indicatorColor: "#83D654",
    bgColor: "#F3FAEF",
    titleColor: "#426B2A",
    timeColor: "#61A13F",
    locationName: VENUE,
    locationAddress: ADDRESS,
  },
  {
    title: "Ramah Tamah & Foto",
    time: "10:30–12:30",
    indicatorColor: "#5AC8FA",
    bgColor: "#EFF9FE",
    titleColor: "#1F5F7A",
    timeColor: "#2E93BD",
    locationName: VENUE,
    locationAddress: ADDRESS,
  },
];
