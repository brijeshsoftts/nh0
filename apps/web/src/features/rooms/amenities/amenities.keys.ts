import type { ListParams } from "@/types/api.types";

export const amenitiesKeys = {
  all: ["amenities"] as const,
  list: (params?: ListParams) => [...amenitiesKeys.all, { params }] as const,
} as const;

export const amenitiesMutationKeys = {
  create: ["amenities", "create"] as const,
  update: ["amenities", "update"] as const,
  delete: ["amenities", "delete"] as const,
} as const;
