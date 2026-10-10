import type { BookingStatus, PaymentStatus } from "@/types/enum.types";

export type ArrivalItem = {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  roomTypeName: string;
  roomNumber?: string;
  checkIn: string;
  bookingStatus: BookingStatus;
};

export type DepartureItem = {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  roomTypeName: string;
  roomNumber?: string;
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
