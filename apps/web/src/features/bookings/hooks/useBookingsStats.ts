import { useQuery } from "@tanstack/react-query";

import { bookingsKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useBookingsStats() {
  return useQuery({
    queryKey: bookingsKeys.stats(),
    queryFn: () => bookingsService.getStats(),
  });
}

