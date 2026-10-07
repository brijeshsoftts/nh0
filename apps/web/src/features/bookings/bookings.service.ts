import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse } from "@/types/api.types";

import type {
  AvailableBookingRoom,
  BookingAvailabilityParams,
  BookingDetails,
  BookingListItem,
  BookingListParams,
  CreateBookingInput,
  CreateBookingResult,
  UpdateBookingStatusInput,
} from "./bookings.types";

export const bookingsService = {
  findOne: (id: string): Promise<BookingDetails> =>
    apiClient.get(`/bookings/${id}`).then((response) => response.data?.data),
  findAll: (
    params: BookingListParams
  ): Promise<ApiListResponse<BookingListItem>> =>
    apiClient.get("/bookings", { params }).then((response) => response.data),
  updateStatus: ({ id, status }: UpdateBookingStatusInput) =>
    apiClient
      .patch(`/bookings/${id}/status`, { status })
      .then((response) => response.data?.data),
  findAvailableRooms: (
    params: BookingAvailabilityParams
  ): Promise<AvailableBookingRoom[]> =>
    apiClient
      .get("/bookings/available-rooms", { params })
      .then((response) => response.data?.data),
  create: (data: CreateBookingInput): Promise<CreateBookingResult> =>
    apiClient.post("/bookings", data).then((response) => response.data?.data),
};
