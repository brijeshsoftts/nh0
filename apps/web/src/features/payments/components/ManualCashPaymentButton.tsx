import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Banknote } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { bookingsKeys } from "@/features/bookings/bookings.keys";
import { invoicesKeys } from "@/features/invoices/invoices.keys";
import { roomsKeys } from "@/features/rooms/rooms/rooms.keys";
import { formatPrice } from "@/lib/format";
import { notifyError } from "@/lib/notification";

import { paymentsKeys } from "../payments.keys";
import { paymentsService } from "../payments.service";

export function ManualCashPaymentButton({
  invoiceId,
  amount,
  onRecorded,
}: {
  invoiceId: string;
  amount: number;
  onRecorded: () => void;
}) {
  const queryClient = useQueryClient();
  const payment = useMutation({
    mutationFn: paymentsService.createCashPayment,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: paymentsKeys.all }),
        queryClient.invalidateQueries({ queryKey: bookingsKeys.all }),
        queryClient.invalidateQueries({ queryKey: roomsKeys.all }),
        queryClient.invalidateQueries({ queryKey: invoicesKeys.all }),
      ]);
      toast.success("Cash payment recorded.");
      onRecorded();
    },
    onError: notifyError,
  });

  const recordPayment = () => {
    const confirmed = window.confirm(
      `Record cash payment of ${formatPrice(amount)}?`
    );

    if (!confirmed) return;
    payment.mutate({ invoiceId, amount });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-none"
      disabled={payment.isPending || amount <= 0}
      onClick={recordPayment}
    >
      {payment.isPending ? <Spinner /> : <Banknote />}
      Record cash payment
    </Button>
  );
}
