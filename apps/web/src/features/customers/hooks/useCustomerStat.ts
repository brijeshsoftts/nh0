import { useQuery } from "@tanstack/react-query";

import { customersKeys } from "../customers.keys";
import { customersService } from "../customers.service";



export function useCustomerStat() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customersKeys.lists(),
    queryFn: customersService.getStats,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
