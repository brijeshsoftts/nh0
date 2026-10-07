import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { bookingsKeys, bookingsMutationKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: bookingsMutationKeys.updateStatus,
    mutationFn: bookingsService.updateStatus,
    onSuccess: () => {
      toast.success("Booking status updated.");
      void queryClient.invalidateQueries({ queryKey: bookingsKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: bookingsKeys.details() });
    },
    onError: notifyError,
  });
}
