import type {
  BookingAvailabilityParams,
  BookingListParams,
} from "./bookings.types";

export const bookingsKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingsKeys.all, "list"] as const,
  list: (params: BookingListParams) =>
    [...bookingsKeys.lists(), params] as const,
  details: () => [...bookingsKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingsKeys.details(), id] as const,
  availability: (params: BookingAvailabilityParams | undefined) =>
    [...bookingsKeys.all, "available-rooms", params] as const,
} as const;

export const bookingsMutationKeys = {
  create: ["bookings", "create"] as const,
  updateStatus: ["bookings", "update-status"] as const,
} as const;
