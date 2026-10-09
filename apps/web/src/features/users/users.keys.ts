import type { ListParams } from "@/types/api.types";

export const usersKeys = {
  all: ["users"] as const,
  lists: ["users", "list"] as const,
  list: (params?: ListParams) => ["users", "list", params] as const,
  detail: (id: string) => ["users", "detail", id] as const,
  stats: ["users", "stats"] as const,
} as const;

export const usersMutationKeys = {
  create: ["users", "create"] as const,
  update: ["users", "update"] as const,
  delete: ["users", "delete"] as const,
} as const;
