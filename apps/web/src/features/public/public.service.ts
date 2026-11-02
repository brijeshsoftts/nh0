import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse, ApiResponse } from "@/types/api.types";

import type { RoomCard } from "./components/RoomCard";
import type { ContactMessageInput } from "./schemas/contact-message.schema";
import type { AvailableRoomsParams, RoomDetails } from "./public.types";

export const publicService = {
  findAvailableRooms: (
    params: AvailableRoomsParams
  ): Promise<ApiListResponse<RoomCard>> =>
    apiClient
      .get("/public/rooms", { params })
      .then((response) => response.data),
  findAvailableRoom: (
    slug: string,
    params?: { checkInDate?: string; checkOutDate?: string }
  ): Promise<{ data: RoomDetails }> =>
    apiClient
      .get(`/public/rooms/${slug}`, { params })
      .then((response) => response.data),
  sendContactMessage: (
    data: ContactMessageInput
  ): Promise<ApiResponse<{ message: string }>> =>
    apiClient
      .post<ApiResponse<{ message: string }>>("/public/contact", data)
      .then((response) => response.data),
};
