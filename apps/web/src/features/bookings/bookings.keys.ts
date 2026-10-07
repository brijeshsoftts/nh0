import type { BookingAvailabilityParams } from "./bookings.types";

export const bookingsKeys = {
  all: ["bookings"] as const,
  availability: (params: BookingAvailabilityParams | undefined) =>
    [...bookingsKeys.all, "available-rooms", params] as const,
} as const;

export const bookingsMutationKeys = {
  create: ["bookings", "create"] as const,
} as const;
