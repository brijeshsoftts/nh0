import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse, ListParams } from "@/types/api.types";

import type { InvoiceDetails, InvoiceItem } from "./invoices.types";

export const invoicesService = {
  findOne: (id: string): Promise<InvoiceDetails> =>
    apiClient.get(`/invoices/${id}`).then((r) => r.data.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<InvoiceItem>> =>
    apiClient.get("/invoices", { params }).then((r) => r.data),
  getStats: (): Promise<StatCard[]> =>
    apiClient.get("/invoices/stats").then((r) => r.data.data),
};
