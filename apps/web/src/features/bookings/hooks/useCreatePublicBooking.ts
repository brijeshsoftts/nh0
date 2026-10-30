import { useMutation } from "@tanstack/react-query";

import { bookingsMutationKeys } from "../bookings.keys";
import { bookingsService } from "../bookings.service";

export function useCreatePublicBooking() {
  return useMutation({
    mutationKey: bookingsMutationKeys.createPublic,
    mutationFn: bookingsService.createPublic,
  });
}
