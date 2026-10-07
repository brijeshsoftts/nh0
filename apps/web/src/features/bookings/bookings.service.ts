import { apiClient } from "@/lib/apiClient";

import type {
  AvailableBookingRoom,
  BookingAvailabilityParams,
  CreateBookingInput,
  CreateBookingResult,
} from "./bookings.types";

export const bookingsService = {
  findAvailableRooms: (
    params: BookingAvailabilityParams
  ): Promise<AvailableBookingRoom[]> =>
    apiClient
      .get("/bookings/available-rooms", { params })
      .then((response) => response.data?.data),
  create: (data: CreateBookingInput): Promise<CreateBookingResult> =>
    apiClient.post("/bookings", data).then((response) => response.data?.data),
};
