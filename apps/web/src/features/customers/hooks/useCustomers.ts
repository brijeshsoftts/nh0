import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { customersKeys } from "../customers.keys";
import { customersService } from "../customers.service";



export function useCustomers(params: ListParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customersKeys.list(params),
    queryFn: () => customersService.findAll(params),
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
