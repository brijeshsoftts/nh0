import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useRazorpayPayment } from "../hooks/useRazorpayPayment";

export function PaymentPopup({
  bookingId,
  bookingReference,
}: {
  bookingId: string;
  bookingReference?: string;
}) {
  const { startPayment, isPending, isCheckoutOpen } = useRazorpayPayment();

  return (
    <Button
      type="button"
      className="rounded-none"
      disabled={isPending || isCheckoutOpen}
      onClick={() => void startPayment(bookingId, bookingReference)}
    >
      {isPending ? <Spinner /> : <CreditCard />}
      {isCheckoutOpen ? "Checkout open" : "Pay online"}
    </Button>
  );
}
