import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { bookingsKeys } from "@/features/bookings/bookings.keys";
import { notifyError } from "@/lib/notification";

import { paymentsKeys } from "../payments.keys";
import { paymentsService } from "../payments.service";

export function useRazorpayPayment() {
  const queryClient = useQueryClient();
  const { error: scriptError, isLoading, Razorpay } = useRazorpay();
  const isRazorpayAvailable =
    typeof window !== "undefined" && "Razorpay" in window;
  const isScriptLoading = isLoading && !isRazorpayAvailable;
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const paymentLock = useRef(false);
  const createOrder = useMutation({ mutationFn: paymentsService.createOrder });
  const verifyPayment = useMutation({
    mutationFn: paymentsService.verifyPayment,
  });

  const invalidatePaymentData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: paymentsKeys.all }),
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all }),
    ]);
  };

  const reconcile = async (paymentId: string) => {
    try {
      const payment = await paymentsService.findOne(paymentId);
      await invalidatePaymentData();

      if (payment.paymentStatus === "COMPLETED") {
        toast.success("Payment confirmed.");
      } else if (payment.paymentStatus === "FAILED") {
        toast.error("Payment failed. You can try again.");
      } else {
        toast.message("Payment is still being confirmed. Check back shortly.");
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const startPayment = async (bookingId: string, bookingReference?: string) => {
    if (scriptError) {
      toast.error("Checkout could not be loaded. Please try again.");
      return;
    }

    if (isScriptLoading) return;
    if (paymentLock.current) return;
    paymentLock.current = true;

    try {
      const order = await createOrder.mutateAsync({ bookingId });
      let verificationStarted = false;

      const options: RazorpayOrderOptions = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Nivara Hotels",
        description: bookingReference
          ? `Booking ${bookingReference}`
          : "Booking payment",
        order_id: order.orderId,
        modal: {
          ondismiss: () => {
            paymentLock.current = false;
            setIsCheckoutOpen(false);
            if (!verificationStarted) void reconcile(order.paymentId);
          },
        },
        handler: async (response) => {
          if (verificationStarted) return;
          verificationStarted = true;
          paymentLock.current = false;
          setIsCheckoutOpen(false);
          setIsVerifying(true);

          try {
            const payment = await verifyPayment.mutateAsync({
              paymentId: order.paymentId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            await invalidatePaymentData();

            if (payment.paymentStatus === "COMPLETED") {
              toast.success("Payment confirmed.");
            } else {
              toast.message("Payment is awaiting confirmation.");
            }
          } catch (error) {
            notifyError(error);
            await reconcile(order.paymentId);
          } finally {
            setIsVerifying(false);
          }
        },
      };

      const checkout = new Razorpay(options);
      checkout.on("payment.failed", () => {
        toast.message("Payment was not confirmed. Checking its status.");
        void reconcile(order.paymentId);
      });
      setIsCheckoutOpen(true);
      checkout.open();
    } catch (error) {
      paymentLock.current = false;
      setIsCheckoutOpen(false);
      notifyError(error);
    }
  };

  return {
    startPayment,
    isPending: isScriptLoading || createOrder.isPending || isVerifying,
    isCheckoutOpen,
  };
}
