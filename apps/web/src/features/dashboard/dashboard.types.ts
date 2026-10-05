import type { BookingStatus } from "@/types/enum.types";

export interface TodaysArrival {
  id: string;
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
}

export interface TodaysDeparture {
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
}
