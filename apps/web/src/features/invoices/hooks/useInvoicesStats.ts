import { useQuery } from "@tanstack/react-query";

import { invoicesKeys } from "../invoices.keys";
import { invoicesService } from "../invoices.service";

export function useInvoicesStats() {
  return useQuery({
    queryKey: invoicesKeys.stats(),
    queryFn: invoicesService.getStats,
  });
}
