import { useQuery } from "@tanstack/react-query";

import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export function useNextBooking() {
  return useQuery({
    queryKey: dashbaordKeys.nextBooking,
    queryFn: dashboardService.getNextBooking,
    refetchInterval: 1000 * 60 * 5,
  });
}
