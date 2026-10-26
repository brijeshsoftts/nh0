import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useRazorpayPayment } from "../hooks/useRazorpayPayment";
import type { PaymentCheckoutContext } from "../hooks/useRazorpayPayment";

export function PaymentPopup({
  bookingId,
  bookingReference,
  paymentContext,
}: {
  bookingId: string;
  bookingReference?: string;
  paymentContext?: PaymentCheckoutContext;
}) {
  const { startPayment, isPending, isCheckoutOpen } = useRazorpayPayment();

  return (
    <Button
      type="button"
      className="rounded-none"
      disabled={isPending || isCheckoutOpen}
      onClick={() =>
        void startPayment(bookingId, bookingReference, paymentContext)
      }
    >
      {isPending ? <Spinner /> : <CreditCard />}
      {isCheckoutOpen ? "Checkout open" : "Pay online"}
    </Button>
  );
}
