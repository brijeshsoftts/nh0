import { useQuery } from "@tanstack/react-query";

import { paymentsKeys } from "../payments.keys";
import { paymentsService } from "../payments.service";

export function usePaymentsStats() {
  return useQuery({
    queryKey: paymentsKeys.stats(),
    queryFn: paymentsService.getStats,
  });
}
