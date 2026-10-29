import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { type RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { toast } from "sonner";

import { bookingsKeys } from "@/features/bookings/bookings.keys";
import { roomsKeys } from "@/features/rooms/rooms/rooms.keys";
import { notifyError } from "@/lib/notification";

import { paymentsKeys } from "../payments.keys";
import { paymentsService } from "../payments.service";
import type { PaymentItem, PublicPaymentStatus } from "../payments.types";

type PaymentCheckoutContext = {
  paymentId?: string;
  checkoutToken?: string;
  onStatus?: (status: PaymentItem | PublicPaymentStatus) => void;
};

export type { PaymentCheckoutContext };

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
  const createPublicOrder = useMutation({
    mutationFn: paymentsService.createPublicOrder,
  });
  const verifyPayment = useMutation({
    mutationFn: paymentsService.verifyPayment,
  });
  const verifyPublicPayment = useMutation({
    mutationFn: paymentsService.verifyPublicPayment,
  });

  const invalidatePaymentData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: paymentsKeys.all }),
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all }),
      queryClient.invalidateQueries({ queryKey: roomsKeys.all }),
    ]);
  };

  const reconcile = async (
    paymentId: string,
    context?: PaymentCheckoutContext
  ) => {
    try {
      const payment = context?.checkoutToken
        ? await paymentsService.getPublicPaymentStatus(
            paymentId,
            context.checkoutToken
          )
        : await paymentsService.findOne(paymentId);
      await invalidatePaymentData();
      context?.onStatus?.(payment);

      const status = payment.paymentStatus;
      if (status === "COMPLETED") {
        toast.success("Payment confirmed.");
      } else if (status === "FAILED") {
        toast.error("Payment failed. You can try again.");
      } else {
        toast.message("Payment is still being confirmed. Check back shortly.");
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const startPayment = async (
    bookingId: string,
    bookingReference?: string,
    context?: PaymentCheckoutContext
  ) => {
    if (scriptError) {
      toast.error("Checkout could not be loaded. Please try again.");
      return;
    }

    if (isScriptLoading) return;
    if (paymentLock.current) return;
    paymentLock.current = true;

    try {
      const order = context?.checkoutToken
        ? await createPublicOrder.mutateAsync({
            bookingId,
            checkoutToken: context.checkoutToken,
          })
        : await createOrder.mutateAsync({
            bookingId,
            paymentId: context?.paymentId,
          });
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
            if (!verificationStarted) {
              void reconcile(order.paymentId, context);
            }
          },
        },
        handler: async (response) => {
          if (verificationStarted) return;
          verificationStarted = true;
          paymentLock.current = false;
          setIsCheckoutOpen(false);
          setIsVerifying(true);

          try {
            const verificationInput = {
              paymentId: order.paymentId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            const payment = context?.checkoutToken
              ? await verifyPublicPayment.mutateAsync({
                  ...verificationInput,
                  checkoutToken: context.checkoutToken,
                })
              : await verifyPayment.mutateAsync(verificationInput);
            await invalidatePaymentData();
            context?.onStatus?.(payment);

            const status = payment.paymentStatus;
            if (status === "COMPLETED") {
              toast.success("Payment confirmed.");
            } else {
              toast.message("Payment is awaiting confirmation.");
            }
          } catch (error) {
            notifyError(error);
            await reconcile(order.paymentId, context);
          } finally {
            setIsVerifying(false);
          }
        },
      };

      const checkout = new Razorpay(options);
      checkout.on("payment.failed", () => {
        toast.message("Payment was not confirmed. Checking its status.");
        void reconcile(order.paymentId, context);
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
    isPending:
      isScriptLoading ||
      createOrder.isPending ||
      createPublicOrder.isPending ||
      verifyPublicPayment.isPending ||
      isVerifying,
    isCheckoutOpen,
  };
}
