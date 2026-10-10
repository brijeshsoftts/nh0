import { useQuery } from "@tanstack/react-query";

import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export const useDashbaordRevenueTrend = (range: string) => {
  return useQuery({
    queryKey: [...dashbaordKeys.revenueTrend, range],
    queryFn: () => dashboardService.getRevenueTrend(range),
    refetchInterval: 1000 * 60 * 5,
  });
};
