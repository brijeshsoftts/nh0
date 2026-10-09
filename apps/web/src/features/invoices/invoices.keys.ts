import type { ListParams } from "@/types/api.types";

export const invoicesKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoicesKeys.all, "list"] as const,
  list: (params: ListParams) => [...invoicesKeys.lists(), params] as const,
  stats: () => [...invoicesKeys.all, "stats"] as const,
  details: () => [...invoicesKeys.all, "detail"] as const,
  detail: (id: string) => [...invoicesKeys.details(), id] as const,
};
