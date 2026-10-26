import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateRoomType } from "./schemas/createRoomType.schema";
import type { UpdateRoomTypePayload } from "./schemas/updateRoomType.schema";
import type { RoomType, RoomTypeDetails } from "./roomTypes.types";

function toRoomTypeFormData(data: CreateRoomType | UpdateRoomTypePayload) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description ?? "");
  if (data.sizeSqFt !== undefined) {
    formData.append("sizeSqFt", String(data.sizeSqFt));
  }
  formData.append("maxGuests", String(data.maxGuests));
  formData.append("adults", String(data.adults));
  formData.append("children", String(data.children));
  formData.append("basePrice", String(data.basePrice));
  formData.append("currency", data.currency);
  formData.append("bedType", data.bedType);
  formData.append("bedCount", String(data.bedCount));
  formData.append("smokingAllowed", String(data.smokingAllowed));
  formData.append("petsAllowed", String(data.petsAllowed));
  formData.append(
    "isActive",
    String("isActive" in data ? data.isActive : true)
  );
  data.amenities.forEach((amenityId: string) =>
    formData.append("amenities", amenityId)
  );

  if ("retainedImageIds" in data) {
    formData.append("retainedImageIds", JSON.stringify(data.retainedImageIds));
    formData.append("primaryImage", data.primaryImage);
    data.images.forEach(({ image }) => formData.append("images", image));
  } else {
    [...data.images]
      .sort(
        (first, second) => Number(second.isPrimary) - Number(first.isPrimary)
      )
      .forEach(({ image }) => formData.append("images", image));
  }

  return formData;
}

export const roomTypesService = {
  create: (data: CreateRoomType): Promise<ApiMessageResponse> =>
    apiClient
      .post("/room-types", toRoomTypeFormData(data))
      .then((response) => response.data),
  update: (
    id: string,
    data: UpdateRoomTypePayload
  ): Promise<ApiMessageResponse> =>
    apiClient
      .patch(`/room-types/${id}`, toRoomTypeFormData(data))
      .then((response) => response.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<RoomType>> =>
    apiClient.get("/room-types", { params }).then((response) => response.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/room-types/${id}`).then((response) => response.data),
  findOne: (slug: string): Promise<RoomTypeDetails> =>
    apiClient
      .get(`/room-types/${slug}`)
      .then((response) => response.data?.data),
};
