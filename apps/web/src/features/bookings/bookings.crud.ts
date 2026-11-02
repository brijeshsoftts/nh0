import { createCrud } from "@/lib/crud/createCrud";

import type { BookingListItem } from "./bookings.types";

type Booking = BookingListItem;

export const bookingsCrud = createCrud<Booking, undefined>()({
  resource: "bookings",
  endpoint: "/bookings",
  label: "Booking",
});

export const { useList: useBookings, useDetail: useBookingDetails } =
  bookingsCrud;
