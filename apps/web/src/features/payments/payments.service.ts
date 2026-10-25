import type { DashboardStat } from "@/components/common/Stat";
import { apiClient } from "@/lib/apiClient";
import type { ApiListResponse, ListParams } from "@/types/api.types";

import { toDashboardStats } from "../shared/stat-response";

import type {
  CreateCashPaymentInput,
  CreatePaymentOrderInput,
  CreatePaymentOrderResponse,
  PaymentItem,
  VerifyPaymentInput,
} from "./payments.types";

export const paymentsService = {
  findAll: (params?: ListParams): Promise<ApiListResponse<PaymentItem>> =>
    apiClient.get("/payments", { params }).then((r) => r.data),
  createOrder: (
    input: CreatePaymentOrderInput
  ): Promise<CreatePaymentOrderResponse> =>
    apiClient.post("/payments/orders", input).then((r) => r.data.data),
  verifyPayment: (input: VerifyPaymentInput): Promise<PaymentItem> =>
    apiClient.post("/payments/verify", input).then((r) => r.data.data),
  findOne: (paymentId: string): Promise<PaymentItem> =>
    apiClient.get(`/payments/${paymentId}`).then((r) => r.data.data),
  createCashPayment: async (input: CreateCashPaymentInput): Promise<void> => {
    await apiClient.post("/payments/cash", input);
  },
  getStats: (): Promise<DashboardStat[]> =>
    apiClient
      .get("/payments/stats")
      .then((r) => toDashboardStats(r.data?.data, "payments")),
};
