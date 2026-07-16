export type StatusKey =
  | "work"
  | "coding"
  | "building"
  | "learning"
  | "commuting"
  | "break"
  | "available"
  | "gaming"
  | "weekend"
  | "sleeping";

export type LiveStatus = {
  key: StatusKey;
  label: string;
  icon: string;
  active: boolean;
};

export const statuses: Record<StatusKey, Omit<LiveStatus, "key" | "active">> = {
  work: { label: "AT WORK", icon: "💼" },
  coding: { label: "CODING", icon: "💻" },
  building: { label: "BUILDING SOMETHING", icon: "🛠️" },
  learning: { label: "LEARNING", icon: "📚" },
  commuting: { label: "COMMUTING", icon: "🚗" },
  break: { label: "TAKING A BREAK", icon: "☕" },
  available: { label: "AVAILABLE", icon: "🟢" },
  gaming: { label: "GAMING", icon: "🎮" },
  weekend: { label: "WEEKEND MODE", icon: "🌴" },
  sleeping: { label: "SLEEPING", icon: "🌙" },
};

/** Saudi Arabia local clock (AST, UTC+3) — Sun–Thu work week. */
export const TIMEZONE = "Asia/Riyadh";
export const LOCATION_LABEL = "Saudi Arabia";

const saudiTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatSaudiTime(date = new Date()) {
  return saudiTimeFormatter.format(date);
}

function getZonedParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: weekdayMap[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function resolveKey(day: number, minutes: number): StatusKey {
  const isWeekday = day >= 0 && day <= 4; // Sunday–Thursday

  if (isWeekday) {
    if (minutes >= 7 * 60 && minutes < 16 * 60) return "work";
    if (minutes >= 16 * 60 && minutes < 17 * 60) return "commuting";
    if (minutes >= 17 * 60 && minutes < 20 * 60) return "available";
    if (minutes >= 20 * 60 && minutes < 22 * 60) return "building";
    if (minutes >= 22 * 60) return "gaming";
    return "sleeping";
  }

  // Friday–Saturday
  if (minutes >= 7 * 60 && minutes < 12 * 60) return "break";
  if (minutes >= 12 * 60 && minutes < 18 * 60) return "available";
  if (minutes >= 18 * 60 && minutes < 22 * 60) return "weekend";
  if (minutes >= 22 * 60) return "gaming";
  return "sleeping";
}

export function getCurrentStatus(date = new Date()): LiveStatus {
  const { day, minutes } = getZonedParts(date);
  const key = resolveKey(day, minutes);
  const status = statuses[key];

  return {
    key,
    label: status.label,
    icon: status.icon,
    active: key !== "sleeping",
  };
}
