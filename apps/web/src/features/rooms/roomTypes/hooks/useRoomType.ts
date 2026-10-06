import { useQuery } from "@tanstack/react-query";

import { roomTypesKeys } from "../roomTypes.keys";
import { roomTypesService } from "../roomTypes.service";

export function useRoomType(slug: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: roomTypesKeys.detail(slug),
    queryFn: () => roomTypesService.findOne(slug),
    enabled: !!slug,
  });

  return {
    roomType: data,
    isLoading,
    isError,
    refetch,
  };
}
