import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

export function createCrudService<TItem, TCreate, TUpdate, TLookup>(
  endpoint: string
) {
  return {
    create: (data: TCreate): Promise<ApiMessageResponse> =>
      apiClient.post(endpoint, data).then((r) => r.data),

    findAll: <TItem>(params?: ListParams): Promise<ApiListResponse<TItem>> =>
      apiClient.get(endpoint, { params }).then((r) => r.data),

    findOne: (id: string): Promise<TItem> =>
      apiClient.get(`${endpoint}/${id}`).then((r) => r.data?.data),

    update: (id: string, data: TUpdate): Promise<ApiMessageResponse> =>
      apiClient.patch(`${endpoint}/${id}`, data).then((r) => r.data),

    delete: (id: string): Promise<ApiMessageResponse> =>
      apiClient.delete(`${endpoint}/${id}`).then((r) => r.data),

    getStats: (): Promise<StatCard[]> =>
      apiClient.get(`${endpoint}/stats`).then((r) => r.data?.data),

    lookup: (params?: ListParams): Promise<TLookup> =>
      apiClient.get(`${endpoint}/lookup`, { params }).then((r) => r.data),
  };
}
