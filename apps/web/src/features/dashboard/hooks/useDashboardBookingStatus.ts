import { useQuery } from "@tanstack/react-query";

import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export const useDashbaordBookingStatus = () => {
  return useQuery({
    queryKey: [...dashbaordKeys.bookingStatus],
    queryFn: () => dashboardService.getBookingStatus(),
    refetchInterval: 1000 * 60 * 5,
  });
};
