import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { amenitiesKeys } from "../amenities.keys";
import { amenitiesService } from "../amenities.service";

export function useAmenities(params?: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: amenitiesKeys.list(params),
    queryFn: () => amenitiesService.findAll(params),
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
