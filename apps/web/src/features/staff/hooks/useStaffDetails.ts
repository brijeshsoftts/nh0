import { useQuery } from "@tanstack/react-query";

import { staffKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useStaffDetails(id: string) {
  return useQuery({
    queryKey: staffKeys.detail(id),
    queryFn: () => staffService.findOne(id),
  });
}
