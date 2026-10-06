import { useQuery } from "@tanstack/react-query";

import { customersKeys } from "../customers.keys";
import { customersService } from "../customers.service";

export function useSearchCustomers(search?: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customersKeys.search(search),
    queryFn: () => customersService.search(search),
    placeholderData: (previousData) => previousData,
  });

  return {
    items: data ?? [],
    isLoading,
    isError,
    refetch,
  };
}
