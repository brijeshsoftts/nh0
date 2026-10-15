import { useQuery } from "@tanstack/react-query";

import type { BookingStatusRange } from "../components/DonutChart";
import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export const useDashbaordBookingStatus = (range: BookingStatusRange) => {
  return useQuery({
    queryKey: [...dashbaordKeys.bookingStatus, range],
    queryFn: () => dashboardService.getBookingStatus(range),
    refetchInterval: 1000 * 60 * 5,
  });
};
