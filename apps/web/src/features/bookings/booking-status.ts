import type { BookingStatus } from "@/types/enum.types";

export type BookingStatusAction = {
  label: string;
  status: BookingStatus;
  destructive?: boolean;
  confirmMessage?: string;
};

const STATUS_ACTIONS: Record<BookingStatus, BookingStatusAction[]> = {
  PENDING: [
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

export function getBookingStatusActions(
  status: BookingStatus,
  canMarkNoShow = false
) {
  const actions = STATUS_ACTIONS[status];

  return status === "CONFIRMED" && canMarkNoShow
    ? [
        ...actions,
        {
          label: "Mark No-show",
          status: "NO_SHOW" as const,
          destructive: true,
          confirmMessage:
            "Mark this booking as no-show and release its reservation?",
        },
      ]
    : actions;
}
