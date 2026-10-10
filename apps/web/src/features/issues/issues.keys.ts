import type { ListParams } from "@/types/api.types";

export const issuesKeys = {
  all: ["issues"] as const,
  lists: () => ["issues", "list"] as const,
  list: (params?: ListParams) => ["issues", "list", params] as const,
  detail: (id: string) => ["issues", "detail", id] as const,
  search: (search?: string) => ["issues", "search", search] as const,
} as const;

export const issuesMutationKeys = {
  create: ["issues", "create"] as const,
  update: ["issues", "update"] as const,
  delete: ["issues", "delete"] as const,
} as const;
