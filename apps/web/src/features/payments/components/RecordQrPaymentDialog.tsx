import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, LoaderCircle, QrCode, RotateCw } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBooking } from "@/features/bookings/hooks/useBooking";
import { formatPrice } from "@/lib/format";

import { useRecordQrPayment } from "../payments.crud";
import {
  type RecordQrPaymentFormInput,
  type RecordQrPaymentInput,
  recordQrPaymentSchema,
} from "../schemas/record-qr-payment.schema";

type RecordQrPaymentDialogProps = {
  bookingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RecordQrPaymentDialog({
  bookingId,
  open,
  onOpenChange,
}: RecordQrPaymentDialogProps) {
  const { booking, isLoading, isFetching, isError, refetch } = useBooking(
    bookingId,
    open
  );
  const recordPayment = useRecordQrPayment();
  const form = useForm<RecordQrPaymentFormInput, unknown, RecordQrPaymentInput>(
    {
      resolver: zodResolver(recordQrPaymentSchema),
      defaultValues: { invoiceId: "", transactionId: "", amount: 1 },
    }
  );
  const { reset } = form;
  const paidAmount =
    booking?.invoice?.payments
      ?.filter((payment) => payment.paymentStatus === "COMPLETED")
      .reduce((total, payment) => total + payment.amount, 0) ?? 0;
  const totalAmount = booking?.invoice?.totalAmount ?? 0;
  const outstandingBalance = totalAmount - paidAmount;
  const eligible =
    booking?.paymentMethod === "ONLINE" &&
    (booking.status === "PENDING" || booking.status === "CONFIRMED") &&
    booking.invoice !== null &&
    booking.invoice.status !== "PAID" &&
    booking.invoice.status !== "REFUNDED" &&
    totalAmount > 0 &&
    paidAmount >= 0 &&
    outstandingBalance > 0;

  useEffect(() => {
    const invoice = booking?.invoice;
    if (!invoice) return;
    reset({
      invoiceId: invoice.id,
      transactionId: "",
      amount: outstandingBalance,
    });
  }, [booking?.invoice, reset, outstandingBalance]);

  const closeDialog = (nextOpen: boolean) => {
    if (recordPayment.isPending) return;
    onOpenChange(nextOpen);
    if (!nextOpen) form.reset();
  };

  const submit = form.handleSubmit((values) => {
    recordPayment.mutate(values, {
      onSuccess: () => onOpenChange(false),
    });
  });

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent showCloseButton={!recordPayment.isPending}>
        <DialogHeader>
          <DialogTitle>Record QR payment</DialogTitle>
          <DialogDescription>
            Record a customer payment made outside the application using the
            hotel's general QR code.
          </DialogDescription>
        </DialogHeader>

        {isLoading || isFetching ? (
          <div className="flex items-center gap-2 py-4 text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Loading booking balance...
          </div>
        ) : isError || !booking ? (
          <div className="space-y-3 py-2" role="alert">
            <p className="text-sm text-destructive">
              Could not load this booking's payment details.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
            >
              <RotateCw aria-hidden="true" />
              Retry
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[50vh] space-y-4 py-2">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Booking reference</dt>
              <dd className="text-right font-medium">
                {booking.bookingReference}
              </dd>
              <dt className="text-muted-foreground">Customer</dt>
              <dd className="text-right font-medium">
                {booking.customer.fullName}
              </dd>
              <dt className="text-muted-foreground">Invoice number</dt>
              <dd className="text-right font-medium">
                {booking.invoice?.invoiceNumber ?? "—"}
              </dd>
              <dt className="text-muted-foreground">Invoice total</dt>
              <dd className="text-right tabular-nums">
                {formatPrice(totalAmount)}
              </dd>
              <dt className="text-muted-foreground">Already paid</dt>
              <dd className="text-right tabular-nums">
                {formatPrice(paidAmount)}
              </dd>
              <dt className="text-muted-foreground">Outstanding balance</dt>
              <dd className="text-right font-semibold tabular-nums">
                {formatPrice(Math.max(outstandingBalance, 0))}
              </dd>
            </dl>

            <div className="space-y-2 border-y py-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <QrCode className="size-4" aria-hidden="true" />
                Hotel general QR
              </div>
              <div
                className="flex items-start gap-2 border border-dashed p-3 text-sm text-muted-foreground"
                role="status"
              >
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <p>
                  No hotel QR image is configured in this application. Ask the
                  customer to scan the hotel's verified general QR displayed at
                  reception using their preferred payment app.
                </p>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Verify the transaction in the hotel's payment app or bank before
                recording it. This action records staff confirmation; it does
                not independently verify funds.
              </p>
            </div>

            {eligible ? (
              <form
                className="space-y-4"
                onSubmit={(event) => void submit(event)}
              >
                <input type="hidden" {...form.register("invoiceId")} />
                <label className="block space-y-2 text-sm font-medium">
                  Transaction ID / UPI reference
                  <Input
                    autoComplete="off"
                    maxLength={120}
                    placeholder="Enter the reference provided by the customer"
                    {...form.register("transactionId")}
                  />
                  {form.formState.errors.transactionId && (
                    <span className="text-xs text-destructive" role="alert">
                      {form.formState.errors.transactionId.message}
                    </span>
                  )}
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  Amount received (INR)
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    inputMode="numeric"
                    {...form.register("amount", { valueAsNumber: true })}
                  />
                  {form.formState.errors.amount && (
                    <span className="text-xs text-destructive" role="alert">
                      {form.formState.errors.amount.message}
                    </span>
                  )}
                </label>
              </form>
            ) : (
              <p className="text-sm text-destructive" role="alert">
                This booking is not eligible for QR payment recording.
              </p>
            )}
          </ScrollArea>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={recordPayment.isPending}
            onClick={() => closeDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={
              isLoading ||
              isFetching ||
              isError ||
              !eligible ||
              recordPayment.isPending
            }
            onClick={() => void submit()}
          >
            {recordPayment.isPending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <QrCode aria-hidden="true" />
            )}
            Record QR Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
