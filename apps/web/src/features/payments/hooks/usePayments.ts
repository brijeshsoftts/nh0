import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { paymentsKeys } from "../payments.keys";
import { paymentsService } from "../payments.service";

export function usePayments(params: ListParams) {
  return useQuery({
    queryKey: paymentsKeys.list(params),
    queryFn: () => paymentsService.findAll(params),
    placeholderData: (previousData) => previousData,
  });
}
