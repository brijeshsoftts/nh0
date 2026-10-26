import type { BookingStatus } from "@/types/enum.types";

const bookingStatuses: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
  "NO_SHOW",
];

const invoiceStatuses = ["UNPAID", "PARTIALLY_PAID", "PAID", "REFUNDED"];

export const bookingFilters = [
  {
    key: "status",
    label: "Booking status",
    options: bookingStatuses.map((value) => ({ value, label: value })),
  },
  {
    key: "invoiceStatus",
    label: "Invoice status",
    options: invoiceStatuses.map((status) => ({
      label: status,
      value: status,
    })),
  },
];
