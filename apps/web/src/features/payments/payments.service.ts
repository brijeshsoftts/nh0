import type { DashboardStat } from "@/components/common/Stat";
import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse, ListParams } from "@/types/api.types";

import { toDashboardStats } from "../shared/stat-response";

import type { PaymentItem } from "./payments.types";

export const paymentsService = {
  findAll: (params?: ListParams): Promise<ApiListResponse<PaymentItem>> =>
    apiClient.get("/payments", { params }).then((r) => r.data),
  getStats: (): Promise<DashboardStat[]> =>
    apiClient
      .get("/payments/stats")
      .then((r) => toDashboardStats(r.data?.data, "payments")),
};
