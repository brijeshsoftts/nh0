import { useQuery } from "@tanstack/react-query";

import { publicKeys } from "./public.keys";
import { publicService } from "./public.service";
import type { AvailableRoomsParams } from "./public.types";

export function useAvailableRooms(params: AvailableRoomsParams) {
  const query = useQuery({
    queryKey: publicKeys.availableRooms(params),
    queryFn: () => publicService.findAvailableRooms(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    rooms: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useAvailableRoom(
  slug: string | null,
  checkInDate?: string,
  checkOutDate?: string
) {
  const hasDates = Boolean(checkInDate && checkOutDate);
  const query = useQuery({
    queryKey: publicKeys.availableRoom(slug ?? "", checkInDate, checkOutDate),
    queryFn: () =>
      publicService.findAvailableRoom(
        slug!,
        hasDates
          ? { checkInDate: checkInDate!, checkOutDate: checkOutDate! }
          : undefined
      ),
    enabled: Boolean(slug),
  });

  return {
    room: query.data?.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
