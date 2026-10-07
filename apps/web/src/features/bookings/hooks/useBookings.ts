import { useQuery } from "@tanstack/react-query";

import { bookingsKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";
import type { BookingListParams } from "../bookings.types";

export function useBookings(params: BookingListParams) {
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
