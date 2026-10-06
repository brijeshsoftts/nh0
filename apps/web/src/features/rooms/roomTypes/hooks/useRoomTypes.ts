import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { roomTypesKeys } from "../roomTypes.keys";
import { roomTypesService } from "../roomTypes.service";

export function useRoomTypes(params: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomTypesKeys.list(params),
    queryFn: () => roomTypesService.findAll(params),
  });

  return {
    items: data?.data ?? [],
    pagination: data?.meta,
    isLoading,
    isError,
    refetch,
  };
}
