import { createCrud } from "@/lib/crud/createCrud";

import type { BookingListItem, CustomerBooking } from "./bookings.types";

type Booking = CustomerBooking | BookingListItem;

export const bookingsCrud = createCrud<Booking, undefined>()({
  resource: "bookings",
  endpoint: "/bookings",
  label: "Booking",
});

export const {
  useList: useBookings,
  useStats: useBookingsStats,
  useDetail: useBookingDetails,
} = bookingsCrud;
