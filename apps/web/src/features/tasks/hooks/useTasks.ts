import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { tasksKeys } from "../tasks.keys";
import { tasksService } from "../tasks.service";

export function useTasks(params?: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: tasksKeys.list(params),
    queryFn: () => tasksService.findAll(params),
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
