import { useQuery } from "@tanstack/react-query";

import { bookingsKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";
import type { BookingAvailabilityParams } from "../bookings.types";

export function useAvailableBookingRooms(
  params: BookingAvailabilityParams | undefined
) {
  const query = useQuery({
    queryKey: bookingsKeys.availability(params),
    queryFn: () => bookingsService.findAvailableRooms(params!),
    enabled: !!params,
  });

  return {
    rooms: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
