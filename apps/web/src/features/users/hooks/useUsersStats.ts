import { useQuery } from "@tanstack/react-query";

import { usersKeys } from "../users.keys";
import { usersService } from "../users.service";

export function useUsersStats() {
  return useQuery({
    queryKey: usersKeys.stats,
    queryFn: usersService.getStats,
  });
}
