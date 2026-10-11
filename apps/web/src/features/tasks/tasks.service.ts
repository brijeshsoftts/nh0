import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateTask } from "./schemas/createTask.schema";
import type { UpdateTask } from "./schemas/updateTask.schema";
import type { TaskItem } from "./tasks.types";

export const tasksService = {
  create: (data: CreateTask): Promise<ApiMessageResponse> =>
    apiClient.post("/tasks", data).then((r) => r.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<TaskItem>> =>
    apiClient.get("/tasks", { params }).then((r) => r.data),
  update: (id: string, data: UpdateTask): Promise<ApiMessageResponse> =>
    apiClient.patch(`/tasks/${id}`, data).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/tasks/${id}`).then((r) => r.data),
  getStats: (): Promise<StatCard[]> =>
    apiClient.get("/tasks/stats").then((r) => r.data?.data),
};
