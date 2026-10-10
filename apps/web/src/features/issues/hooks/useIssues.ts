import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { issuesKeys } from "../issues.keys";
import { issuesService } from "../issues.service";

export function useIssues(params: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: issuesKeys.list(params),
    queryFn: () => issuesService.findAll(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data?.data ?? [],
    pagination: data?.meta,
    isLoading,
    isError,
    refetch,
  };
}
