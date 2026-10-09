import { useQuery } from "@tanstack/react-query";

import { usersKeys } from "../users.keys";
import { usersService } from "../users.service";

export function useUserDetails(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.fineOne(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
