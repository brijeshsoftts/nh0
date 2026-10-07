import type { BookingStatus } from "@/types/enum.types";

export type BookingStatusAction = {
  label: string;
  status: BookingStatus;
  destructive?: boolean;
  confirmMessage?: string;
};

const STATUS_ACTIONS: Record<BookingStatus, BookingStatusAction[]> = {
  PENDING: [
    { label: "Confirm booking", status: "CONFIRMED" },
    {
      label: "Mark as no-show",
      status: "NO_SHOW",
      confirmMessage: "Mark this booking as a no-show?",
    },
    {
      label: "Cancel booking",
      status: "CANCELLED",
      destructive: true,
      confirmMessage: "Cancel this booking? This action cannot be undone.",
    },
  ],
  CONFIRMED: [
    { label: "Check in guest", status: "CHECKED_IN" },
    {
      label: "Mark as no-show",
      status: "NO_SHOW",
      confirmMessage: "Mark this booking as a no-show?",
    },
    {
      label: "Cancel booking",
      status: "CANCELLED",
      destructive: true,
      confirmMessage: "Cancel this booking? This action cannot be undone.",
    },
  ],
  CHECKED_IN: [{ label: "Check out guest", status: "CHECKED_OUT" }],
  CHECKED_OUT: [],
  CANCELLED: [],
  NO_SHOW: [],
};

export function getBookingStatusActions(status: BookingStatus) {
  return STATUS_ACTIONS[status];
}
