import { useQuery } from "@tanstack/react-query";

import { staffKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useStaffStats() {
  return useQuery({
    queryKey: staffKeys.stats,
    queryFn: staffService.getStats,
  });
}
