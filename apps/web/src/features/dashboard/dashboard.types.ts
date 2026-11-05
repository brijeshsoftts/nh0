import type { BookingStatus, PaymentStatus } from "@/types/enum.types";

export type CustomerNextBooking = {
  bookingReference: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  roomTypeName: string | null;
};

export type TodaysArrival = {
  booking: {
    id: string;
    bookingReference: string;
  };
  customer: {
    id: string;
    fullName: string;
  };
  roomNumber: string;
  checkInDate: string;
  status: BookingStatus;
};

export type TodaysDeparture = {
  booking: {
    id: string;
    bookingReference: string;
  };
  customer: {
    id: string;
    fullName: string;
  };
  roomNumber: string;
  checkOutDate: string;
  status: BookingStatus;
};

export type ArrivalItem = {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  roomTypeName: string;
  roomNumber: string | null;
  checkIn: string;
  bookingStatus: BookingStatus;
};

export type DepartureItem = {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  roomTypeName: string;
  roomNumber: string | null;
  checkOut: string;
  paymentStatus: PaymentStatus;
  outstandingBalance: number;
};

export type Stays = {
  date: string;
  arrivals: {
    items: ArrivalItem[];
    total: number;
  };
  departures: {
    items: DepartureItem[];
    total: number;
  };
};
