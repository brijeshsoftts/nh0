import type { ListParams } from "@/types/api.types";

export const paymentsKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentsKeys.all, "list"] as const,
  list: (params: ListParams) => [...paymentsKeys.lists(), params] as const,
  stats: () => [...paymentsKeys.all, "stats"] as const,
  details: () => [...paymentsKeys.all, "detail"] as const,
  detail: (id: string) => [...paymentsKeys.details(), id] as const,
};
