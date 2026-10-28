import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { customersKeys } from "../customers.keys";
import { customersService } from "../customers.service";

export function useCustomerBookings(
  customerId: string,
  params: ListParams,
  enabled: boolean
) {
  return useQuery({
    queryKey: customersKeys.bookings(customerId, params),
    queryFn: () => customersService.findBookings(customerId, params),
    enabled: Boolean(customerId) && enabled,
  });
}
