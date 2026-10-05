import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateAmenity } from "./schemas/createAmenity.schema";
import type { UpdateAmenity } from "./schemas/updateAmenity.schema";
import type { Amenity } from "./amenities.types";

export const amenitiesService = {
  findAll: (params?: ListParams): Promise<ApiListResponse<Amenity>> =>
    apiClient.get("/amenities", { params }).then((response) => response.data),
  create: (data: CreateAmenity): Promise<ApiMessageResponse> =>
    apiClient.post("/amenities", data).then((response) => response.data),
  update: (id: string, data: UpdateAmenity): Promise<ApiMessageResponse> =>
    apiClient.patch(`/amenities/${id}`, data).then((response) => response.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/amenities/${id}`).then((response) => response.data),
};
