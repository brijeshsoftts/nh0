import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { bookingsKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useBookings(params: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: bookingsKeys.list(params),
    queryFn: () => bookingsService.findAll(params),
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
