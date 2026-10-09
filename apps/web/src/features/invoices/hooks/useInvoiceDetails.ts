import { useQuery } from "@tanstack/react-query";

import { invoicesKeys } from "../invoices.keys";
import { invoicesService } from "../invoices.service";

export function useInvoiceDetails(id: string) {
  return useQuery({
    queryKey: invoicesKeys.detail(id),
    queryFn: () => invoicesService.findOne(id),
    placeholderData: (previousData) => previousData,
  });
}
