import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateRoomTypeInput } from "./roomTypes.schema";
import type { RoomType } from "./roomTypes.types";

function toRoomTypeFormData(data: CreateRoomTypeInput) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
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
  data.amenities.forEach((amenityId) =>
    formData.append("amenities", amenityId)
  );

  // The API currently uses the first uploaded file as the primary image.
  [...data.images]
    .sort((first, second) => Number(second.isPrimary) - Number(first.isPrimary))
    .forEach(({ image }) => formData.append("images", image));

  return formData;
}

export const roomTypesService = {
  create: (data: CreateRoomTypeInput): Promise<ApiMessageResponse> =>
    apiClient
      .post("/room-types", toRoomTypeFormData(data))
      .then((response) => response.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<RoomType>> =>
    apiClient.get("/room-types", { params }).then((response) => response.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/room-types/${id}`).then((response) => response.data),
};
