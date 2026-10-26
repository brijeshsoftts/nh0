import type { BookingStatus } from "@/types/enum.types";

export type BookingStatusAction = {
  label: string;
  status: BookingStatus;
  destructive?: boolean;
  confirmMessage?: string;
};

const STATUS_ACTIONS: Record<BookingStatus, BookingStatusAction[]> = {
  PENDING: [
    { label: "Confirm", status: "CONFIRMED" },
    {
      label: "Cancel",
      status: "CANCELLED",
      destructive: true,
      confirmMessage: "Cancel this booking? This action cannot be undone.",
    },
  ],
  CONFIRMED: [
    { label: "Check In", status: "CHECKED_IN" },
    {
      label: "Cancel",
      status: "CANCELLED",
      destructive: true,
      confirmMessage: "Cancel this booking? This action cannot be undone.",
    },
  ],
  CHECKED_IN: [{ label: "Check Out", status: "CHECKED_OUT" }],
  CHECKED_OUT: [],
  CANCELLED: [],
  NO_SHOW: [],
};

export function getBookingStatusActions(status: BookingStatus) {
  return STATUS_ACTIONS[status];
}
