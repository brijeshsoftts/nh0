import type { DashboardStat } from "@/components/common/Stat";
import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse, ListParams } from "@/types/api.types";

import { toDashboardStats } from "../shared/stat-response";

import type { InvoiceDetails, InvoiceItem } from "./invoices.types";

export const invoicesService = {
  findOne: (id: string): Promise<InvoiceDetails> =>
    apiClient.get(`/invoices/${id}`).then((r) => r.data.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<InvoiceItem>> =>
    apiClient.get("/invoices", { params }).then((r) => r.data),
  getStats: (): Promise<DashboardStat[]> =>
    apiClient
      .get("/invoices/stats")
      .then((r) => toDashboardStats(r.data?.data, "invoices")),
};
