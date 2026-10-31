import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { invoicesKeys } from "@/features/invoices/invoices.keys";
import { paymentsKeys } from "@/features/payments/payments.keys";
import { roomsKeys } from "@/features/rooms/rooms/rooms.keys";
import { notifyError } from "@/lib/notification";

import { bookingsKeys, bookingsMutationKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: bookingsMutationKeys.create,
    mutationFn: bookingsService.create,
    onSuccess: async (response) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: bookingsKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: invoicesKeys.all }),
        queryClient.invalidateQueries({ queryKey: paymentsKeys.all }),
        queryClient.invalidateQueries({ queryKey: roomsKeys.all }),
      ]);
      toast.success(
        response.paymentMethod === "CASH"
          ? `Booking ${response.bookingReference} confirmed and paid.`
          : `Booking ${response.bookingReference} created.`
      );
    },
    onError: notifyError,
  });
}
