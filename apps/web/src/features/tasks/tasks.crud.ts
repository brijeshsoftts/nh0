import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";
import type { ApiListResponse } from "@/types/api.types";
import type { TaskStatus } from "@/types/enum.types";

import { CreateTaskSchema } from "./schemas/createTask.schema";
import { UpdateTaskSchema } from "./schemas/updateTask.schema";
import type {
  HousekeeperLookupItem,
  RoomLookupItem,
  TaskItem,
} from "./tasks.types";

export const tasksCrud = createCrud<TaskItem, undefined>()({
  resource: "tasks",
  endpoint: "/tasks",
  label: "Task",
  createSchema: CreateTaskSchema,
  updateSchema: UpdateTaskSchema,
});

export const tasksKeys = tasksCrud.keys;
export const tasksService = tasksCrud.service;

export const {
  useList: useTasks,
  useDetail: useTask,
  useDelete: useDeleteTask,
  useCreate: useCreateTask,
  useUpdate: useUpdateTask,
} = tasksCrud;

export function useLookupHousekeepers(params?: {
  search: string;
  limit: number;
  category: string;
}) {
  return useQuery({
    queryKey: tasksCrud.keys.custom("lookup", "housekeepers", params),
    queryFn: (): Promise<HousekeeperLookupItem[]> =>
      apiClient.get("/staff/lookup", { params }).then((r) => r.data?.data),
    enabled: !!params,
  });
}

export function useLookupRooms(params?: { search: string; limit: number }) {
  return useQuery({
    queryKey: tasksCrud.keys.custom("lookup", "rooms", params),
    queryFn: (): Promise<RoomLookupItem[]> =>
      apiClient.get("/rooms/lookup", { params }).then((r) => r.data?.data),
    enabled: !!params,
  });
}

export function useUpdateStatus(id: string) {
  const useUpdateTaskStatus = tasksCrud.createAction<{
    status: TaskStatus;
  }>({
    name: "updateStatus",
    mutationFn: (data) =>
      apiClient.patch(`/tasks/${id}/status`, data).then((r) => r.data),
    successMessage: "Task status updated",
  });

  return useUpdateTaskStatus();
}

export function useHousekeeperTaskQueue() {
  return useQuery({
    queryKey: tasksCrud.keys.custom("housekeeper-dashboard", "open-tasks", 5),
    queryFn: async () => {
      const [pendingResponse, inProgressResponse] = await Promise.all([
        apiClient.get<ApiListResponse<TaskItem>>("/tasks", {
          params: { page: 1, limit: 5, status: "PENDING" },
        }),
        apiClient.get<ApiListResponse<TaskItem>>("/tasks", {
          params: { page: 1, limit: 5, status: "IN_PROGRESS" },
        }),
      ]);

      return [...pendingResponse.data.data, ...inProgressResponse.data.data]
        .sort((left, right) => {
          const dueDateOrder =
            new Date(left.scheduledDate).getTime() -
            new Date(right.scheduledDate).getTime();

          if (dueDateOrder !== 0) return dueDateOrder;
          return left.status === "PENDING" ? -1 : 1;
        })
        .slice(0, 5);
    },
  });
}
