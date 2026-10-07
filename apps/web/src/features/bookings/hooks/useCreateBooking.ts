import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { bookingsKeys, bookingsMutationKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: bookingsMutationKeys.create,
    mutationFn: bookingsService.create,
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: bookingsKeys.lists() });
      toast.success(`Booking ${response.bookingReference} created.`);
    },
    onError: notifyError,
  });
}
