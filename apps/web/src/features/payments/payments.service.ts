import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse, ListParams } from "@/types/api.types";

import type { PaymentItem } from "./payments.types";

export const paymentsService = {
  findAll: (params?: ListParams): Promise<ApiListResponse<PaymentItem>> =>
    apiClient.get("/payments", { params }).then((r) => r.data),
  getStats: (): Promise<StatCard[]> =>
    apiClient.get("/payments/stats").then((r) => r.data.data),
};
