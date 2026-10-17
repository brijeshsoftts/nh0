import { createCrud } from "@/lib/crud/createCrud";

import type {
  BookingListItem,
  CustomerBooking,
  CustomerBookingDetails,
} from "./bookings.types";

type Booking = CustomerBooking | CustomerBookingDetails | BookingListItem;

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
