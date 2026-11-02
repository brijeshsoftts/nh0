import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse } from "@/types/api.types";

import type { RoomCard } from "./components/RoomCard";
import type {
  AvailableRoomDetails,
  AvailableRoomsParams,
} from "./public.types";

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
  ): Promise<{ data: AvailableRoomDetails }> =>
    apiClient
      .get(`/public/rooms/${slug}`, { params })
      .then((response) => response.data),
};
