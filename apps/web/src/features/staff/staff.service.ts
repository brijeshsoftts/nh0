import type { DashboardStat } from "@/components/common/Stat";
import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import { toDashboardStats } from "../shared/stat-response";

import type { CreateStaff } from "./schemas/createStaff.schema";
import type { UpdateStaff } from "./schemas/updateStaff.schema";
import type { StaffDetails, StaffItem } from "./staff.types";

function toStaffFormData(data: CreateStaff | UpdateStaff) {
  const formData = new FormData();

  for (const field of [
    "fullName",
    "email",
    "phone",
    "address",
    "idProofNumber",
    "fatherName",
    "motherName",
    "qualification",
    "experience",
    "emergencyContact",
    "category",
  ] as const) {
    const value = data[field];
    if (value !== undefined) formData.append(field, value);
  }

  if (data.idProofImage) formData.append("idProof", data.idProofImage);

  if (data.signatureImage) formData.append("signature", data.signatureImage);

  return formData;
}

export const staffService = {
  create: (data: CreateStaff): Promise<ApiMessageResponse> => {
    return apiClient.post("/staff", toStaffFormData(data)).then((r) => r.data);
  },
  findAll: (params?: ListParams): Promise<ApiListResponse<StaffItem>> =>
    apiClient.get("/staff", { params }).then((r) => r.data),
  update: (id: string, data: UpdateStaff): Promise<ApiMessageResponse> =>
    apiClient.patch(`/staff/${id}`, toStaffFormData(data)).then((r) => r.data),
  updateStatus: (id: string, isActive: boolean): Promise<ApiMessageResponse> =>
    apiClient.patch(`/staff/${id}/status`, { isActive }).then((r) => r.data),
  delete: (id: string): Promise<ApiMessageResponse> =>
    apiClient.delete(`/staff/${id}`).then((r) => r.data),
  getStats: (): Promise<DashboardStat[]> =>
    apiClient
      .get("/staff/stats")
      .then((r) => toDashboardStats(r.data?.data, "staff")),
  findOne: (id: string): Promise<StaffDetails> =>
    apiClient.get(`/staff/${id}`).then((r) => r.data.data),
};
