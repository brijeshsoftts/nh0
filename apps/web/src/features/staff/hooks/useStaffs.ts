import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { staffKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useStaffs(params?: ListParams) {
  return useQuery({
    queryKey: staffKeys.list(params),
    queryFn: () => staffService.findAll(params),
  });
}
