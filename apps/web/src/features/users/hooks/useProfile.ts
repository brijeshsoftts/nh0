import { useQuery } from "@tanstack/react-query";
import { usersService } from "../users.service";
import { usersKeys } from "../users.keys";
import { MOCK_USER } from "../users.mock";

export function useProfile() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: usersKeys.all,
    queryFn: usersService.getMe,
  });

  return {
    user: MOCK_USER ?? data,
    isLoading,
    isError,
    refetch,
  };
}
