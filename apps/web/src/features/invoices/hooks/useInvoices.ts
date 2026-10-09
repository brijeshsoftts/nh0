import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types/api.types";

import { invoicesKeys } from "../invoices.keys";
import { invoicesService } from "../invoices.service";

export function useInvoices(params: ListParams) {
  return useQuery({
    queryKey: invoicesKeys.list(params),
    queryFn: () => invoicesService.findAll(params),
    placeholderData: (previousData) => previousData,
  });
}
