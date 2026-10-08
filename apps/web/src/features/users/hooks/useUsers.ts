import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";
import type { UserRole } from "@/types/enum.types";

import { usersKeys } from "../users.keys";
import { usersService } from "../users.service";

export type UserListParams = ListParams & {
  role?: UserRole;
};

export function useUsers(params: UserListParams = {}) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => usersService.findAll(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data?.data ?? [],
    pagination: data?.meta,
    isLoading,
    isError,
    refetch,
  };
}
