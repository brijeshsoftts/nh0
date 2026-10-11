import { useQuery } from "@tanstack/react-query";

import { tasksKeys } from "../tasks.keys";
import { tasksService } from "../tasks.service";

export function useTasksStats() {
  return useQuery({
    queryKey: tasksKeys.all,
    queryFn: tasksService.getStats,
  });
}
