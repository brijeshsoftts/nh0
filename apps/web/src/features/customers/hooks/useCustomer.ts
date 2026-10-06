import { useQuery } from "@tanstack/react-query";

import { customersKeys } from "../customers.keys";
import { customersService } from "../customers.service";

export function useCustomer(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: customersKeys.detail(id),
    queryFn: () => customersService.findOne(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
