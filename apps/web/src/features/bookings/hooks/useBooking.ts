import { useQuery } from "@tanstack/react-query";

import { bookingsKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useBooking(id: string, enabled = true) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: bookingsKeys.detail(id),
    queryFn: () => bookingsService.findOne(id),
    enabled: Boolean(id) && enabled,
  });

  return { booking: data, isLoading, isError, refetch };
}
