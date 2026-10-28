import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { bookingsKeys } from "@/features/bookings/bookings.keys";
import { invoicesKeys } from "@/features/invoices/invoices.keys";
import { createCrud } from "@/lib/crud/createCrud";
import { notifyError } from "@/lib/notification";

import { paymentsKeys } from "./payments.keys";
import { paymentsService } from "./payments.service";
import type { CustomerPayment, PaymentItem } from "./payments.types";

type Payment = CustomerPayment | PaymentItem;

export const paymentsCrud = createCrud<Payment, undefined>()({
  resource: "payments",
  endpoint: "/payments",
  label: "Payment",
});

export const { useList: usePayments } = paymentsCrud;

export function useCollectCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentsService.createCashPayment,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: paymentsKeys.all }),
        queryClient.invalidateQueries({ queryKey: bookingsKeys.all }),
        queryClient.invalidateQueries({ queryKey: invoicesKeys.all }),
      ]);
      toast.success("Cash payment collected.");
    },
    onError: notifyError,
  });
}
