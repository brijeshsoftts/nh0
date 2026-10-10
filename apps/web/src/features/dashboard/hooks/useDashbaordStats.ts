import { useQuery } from "@tanstack/react-query";

import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export const useDashbaordStats = () => {
  return useQuery({
    queryKey: dashbaordKeys.stats,
    queryFn: () => dashboardService.getStats(),
    refetchInterval: 1000 * 60 * 5,
  });
};
