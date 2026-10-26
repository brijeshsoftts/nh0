import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ApiResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateRoom } from "./schemas/createRoom.schema";
import type { UpdateRoom } from "./schemas/updateRoom.schema";
import type { Room, RoomDetails } from "./rooms.types";

export const roomsService = {
  create: (data: CreateRoom): Promise<ApiMessageResponse> =>
    apiClient.post("/rooms", data).then((r) => r.data),
  update: (id: string, data: UpdateRoom): Promise<ApiMessageResponse> =>
    apiClient.patch(`/rooms/${id}`, data).then((r) => r.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<Room>> =>
    apiClient.get("/rooms", { params }).then((r) => r.data),
  findOne: (id: string): Promise<RoomDetails> =>
    apiClient
      .get<ApiResponse<RoomDetails>>(`/rooms/${id}`)
      .then((r) => r.data.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/rooms/${id}`).then((r) => r.data),
};
