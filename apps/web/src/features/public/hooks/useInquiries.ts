import { useQuery } from "@tanstack/react-query";

import { publicKeys } from "../public.keys";
import { publicService } from "../public.service";
import type { InquiriesParams } from "../public.types";

export function useInquiries(params: InquiriesParams, enabled = true) {
  const query = useQuery({
    queryKey: publicKeys.inquiries(params),
    queryFn: () => publicService.findInquiries(params),
    enabled,
    placeholderData: (previousData) => previousData,
  });

  return {
    inquiries: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
