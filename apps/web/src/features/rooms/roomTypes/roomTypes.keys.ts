import type { ListParams } from "@/types/api.types";

export const roomTypesKeys = {
  all: ["roomTypes"] as const,
  lists: () => ["roomTypes", "list"] as const,
  list: (params?: ListParams) => ["roomTypes", "list", params] as const,
  detail: (id: string) => ["roomTypes", "detail", id] as const,
} as const;

export const roomTypesMutationKeys = {
  create: ["roomTypes", "create"] as const,
  update: ["roomTypes", "update"] as const,
  delete: ["roomTypes", "delete"] as const,
} as const;
