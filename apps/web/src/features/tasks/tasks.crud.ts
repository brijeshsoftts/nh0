import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";

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
  useStats: useTasksStats,
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
