import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";
import type { ApiListResponse } from "@/types/api.types";

import type { AuditLog, AuditLogsQuery } from "./auditLog.types";

export const auditLog = createCrud<AuditLog, never>()({
  resource: "audit-logs",
  endpoint: "/audit-logs",
  label: "Audit log",
});

export function useAuditLogs(params: AuditLogsQuery) {
  const query = useQuery({
    queryKey: auditLog.keys.custom("list", params),
    queryFn: () =>
      apiClient
        .get<ApiListResponse<AuditLog>>("/audit-logs", { params })
        .then((response) => response.data),
  });

  return {
    items: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}
