import { apiClient } from "@/lib/apiClient";
import type { ApiMessageResponse } from "@/types/api.types";

import type { CreateRoom } from "./schemas/createRoom.schema";

export const roomsService = {
  create: (data: CreateRoom): Promise<ApiMessageResponse> =>
    apiClient.post("/rooms", data).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/rooms/${id}`).then((r) => r.data),
};
