import type { ListParams } from "@/types/api.types";

export const roomsKeys = {
  all: ["rooms"] as const,
  lists: () => ["rooms", "list"] as const,
  list: (params?: ListParams) => ["rooms", "list", params] as const,
  detail: (id: string) => ["rooms", "detail", id] as const,
} as const;

export const roomsMutationKeys = {
  create: ["rooms", "create"] as const,
  update: ["rooms", "update"] as const,
  delete: ["rooms", "delete"] as const,
  checkAvailability: ["rooms", "check-availability"] as const,
} as const;
