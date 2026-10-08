import { useQuery } from "@tanstack/react-query";

import { usersKeys } from "../users.keys";
// import { MOCK_USER } from "../users.mock";
import { usersService } from "../users.service";

export function useProfile() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: usersKeys.all,
    queryFn: usersService.getMe,
  });

  return {
    user: data,
    isLoading,
    isError,
    refetch,
  };
}
