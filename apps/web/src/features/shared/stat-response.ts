import type { DashboardStat } from "@/components/common/Stat";

const trends = new Set<DashboardStat["trend"]>(["up", "down", "neutral"]);

const STAT_FILTERS: Record<string, Record<string, string>> = {
  "total-bookings": { route: "bookings" },
  "confirmed-bookings": { route: "bookings", status: "CONFIRMED" },
  "pending-bookings": { route: "bookings", status: "PENDING" },
  "booking-revenue": { route: "bookings" },
  "upcoming-bookings": { route: "bookings", status: "CONFIRMED" },
  "active-stay": { route: "bookings", status: "CHECKED_IN" },
  "past-bookings": { route: "bookings", status: "CHECKED_OUT" },
  "todays-arrivals": { route: "bookings", status: "CONFIRMED" },
  "expected-arrivals": { route: "bookings", status: "CONFIRMED" },
  "todays-departures": { route: "bookings", status: "CHECKED_IN" },
  "expected-departures": { route: "bookings", status: "CHECKED_IN" },
  "total-customer": { route: "customers" },
  "active-customer": { route: "customers", isActive: "true" },
  "customers-with-active-bookings": { route: "customers" },
  "new-customer": { route: "customers" },
  "invoiced-this-month": { route: "invoices" },
  "paid-invoices": { route: "invoices", status: "PAID" },
  "partially-paid-invoices": { route: "invoices", status: "PARTIALLY_PAID" },
  "outstanding-balance": { route: "invoices", status: "UNPAID" },
  "total-collected": { route: "payments", status: "COMPLETED" },
  "completed-payments": { route: "payments", status: "COMPLETED" },
  "pending-payments": { route: "payments", status: "PENDING" },
  "pending-payment": { route: "invoices", status: "UNPAID" },
  "refunded-payments": { route: "payments", status: "REFUNDED" },
  "monthly-revenue": { route: "payments", status: "COMPLETED" },
  "total-rooms": { route: "rooms", isActive: "true" },
  occupancy: { route: "rooms", occupancyStatus: "OCCUPIED" },
  "occupancy-rate": { route: "rooms", occupancyStatus: "OCCUPIED" },
  "available-rooms": {
    route: "rooms",
    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",
    isActive: "true",
  },
  "reserved-rooms": { route: "rooms", occupancyStatus: "RESERVED" },
  "occupied-rooms": { route: "rooms", occupancyStatus: "OCCUPIED" },
  "dirty-rooms": { route: "rooms", housekeepingStatus: "DIRTY" },
  "cleaning-rooms": { route: "rooms", housekeepingStatus: "CLEANING" },
  "clean-rooms": { route: "rooms", housekeepingStatus: "CLEAN" },
  "out-of-order-rooms": { route: "rooms", occupancyStatus: "OUT_OF_ORDER" },
  "total-staff": { route: "staff" },
  "active-staff": { route: "staff", isActive: "true" },
  "inactive-staff": { route: "staff", isActive: "false" },
  receptionists: { route: "staff", category: "RECEPTIONIST" },
  housekeepers: { route: "staff", category: "HOUSEKEEPER" },
  "staff-receptionist": { route: "staff", category: "RECEPTIONIST" },
  "staff-housekeeper": { route: "staff", category: "HOUSEKEEPER" },
  "total-accounts": { route: "users" },
  "manager-accounts": { route: "users", role: "MANAGER" },
  "staff-accounts": { route: "users", role: "STAFF" },
  "inactive-accounts": { route: "users", isActive: "false" },
  "open-issues": { route: "issues", status: "OPEN" },
  "pending-tasks": { route: "tasks", status: "PENDING" },
  "in-progress-tasks": { route: "tasks", status: "IN_PROGRESS" },
  "in-progress": { route: "tasks", status: "IN_PROGRESS" },
  "completed-today": { route: "tasks", status: "COMPLETED" },
  "overdue-tasks": { route: "tasks", status: "PENDING" },
  totalTasks: { route: "tasks" },
};

function toNumericValue(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value !== "string") return undefined;

  const cleanedValue = value.trim().replace(/[^\d.-]/g, "");
  if (!cleanedValue) return undefined;

  const numericValue = Number(cleanedValue);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function normalizeStatLink(
  link: string,
  id: string,
  resource?: string
): string {
  const [rawPath, rawQuery] = link.trim().split("?", 2);
  const path = (rawPath ?? "")
    .replace(/^\/?dashboard\//, "")
    .replace(/^\/+/, "");
  const fallback = STAT_FILTERS[id];
  let route =
    (path === "housekeeping/tasks" ? "tasks" : path) ||
    fallback?.route ||
    resource ||
    "dashboard";
  const params = new URLSearchParams(rawQuery ?? "");

  if (!params.size && fallback) {
    for (const [key, value] of Object.entries(fallback)) {
      if (key !== "route") params.set(key, value);
    }
  }

  if (id === "pending-payments" && resource === "dashboard") {
    route = "invoices";
    params.set("status", "UNPAID");
  }

  if (route === "rooms") {
    const status = params.get("status")?.toLowerCase();
    if (status === "occupied") params.set("occupancyStatus", "OCCUPIED");
    if (status === "available") {
      params.set("occupancyStatus", "VACANT");
      params.set("housekeepingStatus", "CLEAN");
    }
    if (status === "dirty") params.set("housekeepingStatus", "DIRTY");
    params.delete("status");
  }

  if (route === "bookings") {
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");
    if (checkIn) params.set("status", "CONFIRMED");
    if (checkOut) params.set("status", "CHECKED_IN");
    params.delete("checkIn");
    params.delete("checkOut");
    const status = params.get("status");
    if (status) params.set("status", status.toUpperCase());
  }

  if (route === "tasks") {
    const status = params.get("status");
    if (status) params.set("status", status.toUpperCase().replaceAll("-", "_"));
    params.delete("date");
  }

  if (!params.has("page")) params.set("page", "1");

  if (route === "staff") {
    const category = params.get("category");
    if (category) params.set("category", category.toUpperCase());
  }

  const query = params.toString();
  return query ? `${route}?${query}` : route;
}

export function toDashboardStats(
  response: unknown,
  resource?: string
): DashboardStat[] {
  if (!Array.isArray(response)) return [];

  return response.flatMap((item): DashboardStat[] => {
    if (!item || typeof item !== "object") return [];

    const stat = item as Record<string, unknown>;
    const label =
      typeof stat.label === "string"
        ? stat.label
        : typeof stat.title === "string"
          ? stat.title
          : undefined;
    const value = toNumericValue(stat.value);

    if (!label || value === undefined) return [];

    const changePercentage = toNumericValue(stat.changePercentage) ?? 0;
    const trend = trends.has(stat.trend as DashboardStat["trend"])
      ? (stat.trend as DashboardStat["trend"])
      : "neutral";

    return [
      {
        label,
        value,
        changePercentage,
        trend,
        link: normalizeStatLink(
          typeof stat.link === "string" ? stat.link : "",
          String(stat.id ?? ""),
          resource
        ),
      },
    ];
  });
}
