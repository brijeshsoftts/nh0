import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateStaff } from "./schemas/createStaff.schema";
import type { UpdateStaff } from "./schemas/updateStaff.schema";
import type { StaffDetails, StaffItem } from "./staff.types";

export const staffService = {
  create: (data: CreateStaff): Promise<ApiMessageResponse> =>
    apiClient.post("/staff", data).then((r) => r.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<StaffItem>> =>
    apiClient.get("/staff", { params }).then((r) => r.data),
  update: (id: string, data: UpdateStaff): Promise<ApiMessageResponse> =>
    apiClient.patch(`/staff/${id}`, data).then((r) => r.data),
  updateStatus: (id: string, isActive: boolean): Promise<ApiMessageResponse> =>
    apiClient.patch(`/staff/${id}/status`, { isActive }).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/staff/${id}`).then((r) => r.data),
  getStats: (): Promise<StatCard[]> =>
    apiClient.get("/staff/stats").then((r) => r.data.data),
  findOne: (id: string): Promise<StaffDetails> =>
    apiClient.get(`/staff/${id}`).then((r) => r.data.data),
};
