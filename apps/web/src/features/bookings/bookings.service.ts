import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse } from "@/types/api.types";

import type {
  AvailableBookingRoom,
  BookingAvailabilityParams,
  BookingListItem,
  BookingListParams,
  CreateBookingInput,
  CreateBookingResult,
} from "./bookings.types";

export const bookingsService = {
  findAll: (
    params: BookingListParams
  ): Promise<ApiListResponse<BookingListItem>> =>
    apiClient.get("/bookings", { params }).then((response) => response.data),
  findAvailableRooms: (
    params: BookingAvailabilityParams
  ): Promise<AvailableBookingRoom[]> =>
    apiClient
      .get("/bookings/available-rooms", { params })
      .then((response) => response.data?.data),
  create: (data: CreateBookingInput): Promise<CreateBookingResult> =>
    apiClient.post("/bookings", data).then((response) => response.data?.data),
};
