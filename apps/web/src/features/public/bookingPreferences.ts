import { addDays, format, isValid, parseISO, startOfToday } from "date-fns";

const STORAGE_KEY = "nivara-booking-preferences";

export interface BookingPreferences {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
}

function isValidDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = parseISO(value);
  return isValid(date) && format(date, "yyyy-MM-dd") === value;
}

function parseGuestCount(value: string | null, fallback: number, min: number) {
  if (!value || !/^\d+$/.test(value)) return fallback;
  return Math.max(min, Math.min(10, Number(value)));
}

function readStoredPreferences(): Partial<BookingPreferences> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Partial<BookingPreferences>) : {};
  } catch {
    return {};
  }
}

export function getBookingPreferences(
  searchParams?: URLSearchParams
): BookingPreferences {
  const stored = readStoredPreferences();
  const today = startOfToday();
  const todayString = format(today, "yyyy-MM-dd");
  const storedCheckIn = isValidDate(stored.checkInDate ?? null)
    ? stored.checkInDate
    : undefined;
  const queryCheckIn = searchParams?.get("checkInDate");
  const requestedCheckIn = isValidDate(queryCheckIn)
    ? queryCheckIn
    : storedCheckIn;
  const checkInDate =
    requestedCheckIn && requestedCheckIn >= todayString
      ? requestedCheckIn
      : todayString;

  const storedCheckOut = isValidDate(stored.checkOutDate ?? null)
    ? stored.checkOutDate
    : undefined;
  const queryCheckOut = searchParams?.get("checkOutDate");
  const requestedCheckOut = isValidDate(queryCheckOut)
    ? queryCheckOut
    : storedCheckOut;
  const checkOutDate =
    requestedCheckOut && requestedCheckOut > checkInDate
      ? requestedCheckOut
      : format(addDays(parseISO(checkInDate), 1), "yyyy-MM-dd");

  return {
    checkInDate,
    checkOutDate,
    adults: parseGuestCount(
      searchParams?.get("adults") ??
        (Number.isInteger(stored.adults) ? String(stored.adults) : null),
      2,
      1
    ),
    children: parseGuestCount(
      searchParams?.get("children") ??
        (Number.isInteger(stored.children) ? String(stored.children) : null),
      0,
      0
    ),
  };
}

export function saveBookingPreferences(preferences: BookingPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Keep booking usable when browser storage is unavailable.
  }
}
