import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { bookingsMutationKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useCreateBooking() {
  return useMutation({
    mutationKey: bookingsMutationKeys.create,
    mutationFn: bookingsService.create,
    onSuccess: (response) => {
      toast.success(`Booking ${response.bookingReference} created.`);
    },
    onError: notifyError,
  });
}
