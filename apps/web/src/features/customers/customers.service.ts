import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateCustomer } from "./schema/createCustomer.schema";
import type { UpdateCustomer } from "./schema/updateCustomer.schema";
import type {
  Customer,
  CustomerDetails,
  SearchCustomer,
} from "./customers.types";

function toCustomerFormData(data: CreateCustomer | UpdateCustomer) {
  const formData = new FormData();

  for (const field of [
    "fullName",
    "email",
    "phone",
    "address",
    "idProofNumber",
  ] as const) {
    const value = data[field];
    if (value !== undefined) formData.append(field, value);
  }

  if (data.idProofImage) formData.append("idProof", data.idProofImage);
  if (data.signatureImage) formData.append("signature", data.signatureImage);

  return formData;
}

export const customersService = {
  create: (data: CreateCustomer): Promise<ApiMessageResponse> =>
    apiClient.post("/customers", toCustomerFormData(data)).then((r) => r.data),
  findAll: (params: ListParams): Promise<ApiListResponse<Customer>> =>
    apiClient.get("/customers", { params }).then((r) => r.data),
  update: (id: string, data: UpdateCustomer): Promise<ApiMessageResponse> =>
    apiClient
      .patch(`/customers/${id}`, toCustomerFormData(data))
      .then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/customers/${id}`).then((r) => r.data),
  findOne: (id: string): Promise<CustomerDetails> =>
    apiClient.get(`/customers/${id}`).then((r) => r.data?.data),
  getStats: (): Promise<StatCard[]> =>
    apiClient.get("/customers/stats").then((r) => r.data.data),
  search: (q?: string): Promise<SearchCustomer[]> =>
    apiClient
      .get("/customers/search", { params: { q } })
      .then((r) => r.data?.data),
};
