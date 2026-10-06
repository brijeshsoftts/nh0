import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { roomsKeys } from "../rooms.keys";
import { roomsService } from "../rooms.service";

export function useRooms(params?: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomsKeys.list(params),
    queryFn: () => roomsService.findAll(params),
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
