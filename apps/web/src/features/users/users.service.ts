import type { DashboardStat } from "@/components/common/Stat";
import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import { toDashboardStats } from "../shared/stat-response";

import type { CreateUser } from "./schema/createUser.schema";
import type { UpdateUser } from "./schema/updateUser.schema";
import type { User, UserDetails, UserProfile } from "./users.types";


export const usersService = {
  create: (data: CreateUser): Promise<ApiMessageResponse> =>
    apiClient.post("/users", data).then((r) => r.data),
  getMe: (): Promise<UserProfile> =>
    apiClient.get("/users/me").then((r) => r.data?.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<User>> =>
    apiClient.get("/users", { params }).then((r) => r.data),
  update: (id: string, data: UpdateUser): Promise<ApiMessageResponse> =>
    apiClient.patch(`/users/${id}`, data).then((r) => r.data),
  updateMe: (data: UpdateUser): Promise<ApiMessageResponse> =>
    apiClient.patch("/users/me", data).then((r) => r.data),
  updateStatus: (id: string, isActive: boolean): Promise<ApiMessageResponse> =>
    apiClient.patch(`/users/${id}/status`, { isActive }).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/users/${id}`).then((r) => r.data),
  getStats: (): Promise<DashboardStat[]> =>
    apiClient
      .get("/users/stats")
      .then((r) => toDashboardStats(r.data?.data, "users")),
  fineOne: (id: string): Promise<UserDetails> =>
    apiClient.get(`/users/${id}`).then((r) => r.data.data),
};
