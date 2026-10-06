import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateRoom } from "./schemas/createRoom.schema";
import type { UpdateRoom } from "./schemas/updateRoom.schema";
import type { Room } from "./rooms.types";

export const roomsService = {
  create: (data: CreateRoom): Promise<ApiMessageResponse> =>
    apiClient.post("/rooms", data).then((r) => r.data),
  update: (id: string, data: UpdateRoom): Promise<ApiMessageResponse> =>
    apiClient.patch(`/rooms/${id}`, data).then((r) => r.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<Room>> =>
    apiClient.get("/rooms", { params }).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/rooms/${id}`).then((r) => r.data),
};
