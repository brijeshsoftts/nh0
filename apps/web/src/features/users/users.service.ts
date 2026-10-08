import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateUser } from "./schema/createUser.schema";
import type { UpdateUser } from "./schema/updateUser.schema";
import type { User, UserProfile } from "./users.types";

export const usersService = {
  create: (data: CreateUser): Promise<ApiMessageResponse> =>
    apiClient.post("/users", data).then((r) => r.data),
  getMe: (): Promise<UserProfile> =>
    apiClient.get("/users/me").then((r) => r.data?.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<User>> =>
    apiClient.get("/users", { params }).then((r) => r.data),
  update: (id: string, data: UpdateUser): Promise<ApiMessageResponse> =>
    apiClient.patch(`/users/${id}`, data).then((r) => r.data),
};
