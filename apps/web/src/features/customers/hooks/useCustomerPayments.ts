import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { customersKeys } from "../customers.keys";
import { customersService } from "../customers.service";

export function useCustomerPayments(
  customerId: string,
  params: ListParams,
  enabled: boolean
) {
  return useQuery({
    queryKey: customersKeys.payments(customerId, params),
    queryFn: () => customersService.findPayments(customerId, params),
    enabled: Boolean(customerId) && enabled,
  });
}
