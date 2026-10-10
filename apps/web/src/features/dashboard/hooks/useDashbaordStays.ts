import { useQuery } from "@tanstack/react-query";

import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export const useDashbaordStays = () => {
  return useQuery({
    queryKey: [...dashbaordKeys.stays],
    queryFn: dashboardService.getStays,
    refetchInterval: 1000 * 60 * 5,
  });
};
