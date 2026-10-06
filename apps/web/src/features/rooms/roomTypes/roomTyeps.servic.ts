import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { RoomType } from "./roomTypes.types";

export const roomTypesService = {
  findAll: (params?: ListParams): Promise<ApiListResponse<RoomType>> =>
    apiClient.get("/room-types", { params }).then((response) => response.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/room-types/${id}`).then((response) => response.data),
};
