import { useQuery } from "@tanstack/react-query";

import { dashbaordKeys } from "../dashboard.keys";
import { dashboardService } from "../dashboard.service";

export const useDashboardRoomStatus = () =>
  useQuery({
    queryKey: dashbaordKeys.roomStatus,
    queryFn: dashboardService.getRoomStatus,
    refetchInterval: 1000 * 60 * 5,
  });
