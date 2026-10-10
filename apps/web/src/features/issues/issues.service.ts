import { apiClient } from "@/lib/apiClient";
import type {
  ApiListResponse,
  ApiMessageResponse,
  ListParams,
} from "@/types/api.types";

import type { CreateIssue } from "./schemas/createIssue.schema";
import type { IssueItem } from "./issues.types";

export const issuesService = {
  create: (data: CreateIssue): Promise<ApiMessageResponse> =>
    apiClient.post("/issues", data).then((res) => res.data),
  findAll: (params?: ListParams): Promise<ApiListResponse<IssueItem>> =>
    apiClient.get("/issues", { params }).then((res) => res.data),
};
