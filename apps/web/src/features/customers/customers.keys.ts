import type { ListParams } from "@/types/api.types";

export const customersKeys = {
  all: ["customers"] as const,
  lists: () => ["customers", "list"] as const,
  list: (params?: ListParams) => ["customers", "list", params] as const,
  detail: (id: string) => ["customers", "detail", id] as const,
  search: (search?: string) => ["customers", "search", search] as const,
} as const;

export const customersMutationKeys = {
  create: ["customers", "create"] as const,
  update: ["customers", "update"] as const,
  delete: ["customers", "delete"] as const,
} as const;
