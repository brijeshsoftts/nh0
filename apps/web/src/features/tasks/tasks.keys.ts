import type { ListParams } from "@/types/api.types";

export const tasksKeys = {
  all: ["tasks"] as const,
  stats: () => [...tasksKeys.all, "stats"] as const,
  lists: () => ["tasks", "list"] as const,
  list: (params?: ListParams) => ["tasks", "list", params] as const,
  detail: (id: string) => ["tasks", "detail", id] as const,
} as const;

export const tasksMutationKeys = {
  create: ["tasks", "create"] as const,
  update: ["tasks", "update"] as const,
  delete: ["tasks", "delete"] as const,
} as const;
