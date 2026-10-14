import type { ListParams, LookupParams } from "@/types/api.types";

export function createKeys<TResource extends string>(resource: TResource) {
  const keys = {
    all: [resource] as const,
    lists: () => [resource, "list"] as const,
    list: (params?: ListParams) => [resource, "list", params] as const,
    details: () => [resource, "detail"] as const,
    detail: (id: string) => [resource, "detail", id] as const,
    stats: () => [resource, "stats"] as const,
    lookup: (params?: LookupParams) => [resource, "lookup", params] as const,
    custom: (...parts: unknown[]) => [resource, ...parts] as const,
  } as const;

  const mutationKeys = {
    create: [resource, "create"] as const,
    update: [resource, "update"] as const,
    delete: [resource, "delete"] as const,
  } as const;

  return { keys, mutationKeys };
}
