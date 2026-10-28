import { Banknote, LoaderCircle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBooking } from "@/features/bookings/hooks/useBooking";
import { formatPrice } from "@/lib/format";

import { useCollectCash } from "../payments.crud";

type CollectCashDialogProps = {
  bookingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CollectCashDialog({
  bookingId,
  open,
  onOpenChange,
}: CollectCashDialogProps) {
  const { booking, isLoading, isFetching, isError, refetch } = useBooking(
    bookingId,
    open
  );
  const collectCash = useCollectCash();
  const validPaidAmount =
    booking?.invoice?.payments
      ?.filter((payment) => payment.paymentStatus === "COMPLETED")
      .reduce((total, payment) => total + payment.amount, 0) ?? 0;
  const totalAmount =
    booking?.invoice?.totalAmount ?? booking?.totalAmount ?? 0;
  const outstandingBalance = Math.max(totalAmount - validPaidAmount, 0);
  const bookingEligible =
    booking !== undefined &&
    booking.invoice !== null &&
    booking.paymentMethod === "CASH" &&
    booking.invoice.totalAmount > 0 &&
    ["PENDING", "CONFIRMED"].includes(booking.status) &&
    booking.invoice.status !== "PAID" &&
    booking.invoice?.status !== "REFUNDED";
  const canCollect =
    bookingEligible &&
    validPaidAmount <= totalAmount &&
    outstandingBalance > 0 &&
    !isFetching;

  const closeDialog = (nextOpen: boolean) => {
    if (collectCash.isPending) return;
    onOpenChange(nextOpen);
    if (!nextOpen) collectCash.reset();
  };

  const confirmCollection = () => {
    if (!booking?.invoice || !canCollect) return;

    collectCash.mutate(
      { invoiceId: booking.invoice.id },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent showCloseButton={!collectCash.isPending}>
        <DialogHeader>
          <DialogTitle>Collect cash</DialogTitle>
          <DialogDescription>
            Collect the full outstanding balance for this booking.
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
              Could not load this booking’s payment details.
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
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Booking reference</dt>
            <dd className="text-right font-medium">
              {booking.bookingReference}
            </dd>
            <dt className="text-muted-foreground">Guest</dt>
            <dd className="text-right font-medium">
              {booking.customer.fullName}
            </dd>
            <dt className="text-muted-foreground">Invoice number</dt>
            <dd className="text-right font-medium">
              {booking.invoice.invoiceNumber}
            </dd>
            <dt className="text-muted-foreground">Invoice total</dt>
            <dd className="text-right tabular-nums">
              {formatPrice(totalAmount)}
            </dd>
            <dt className="text-muted-foreground">Already paid</dt>
            <dd className="text-right tabular-nums">
              {formatPrice(validPaidAmount)}
            </dd>
            <dt className="text-muted-foreground">Outstanding balance</dt>
            <dd className="text-right font-medium tabular-nums">
              {formatPrice(outstandingBalance)}
            </dd>
            <dt className="font-medium">Amount to collect now</dt>
            <dd className="text-right font-semibold tabular-nums">
              {formatPrice(outstandingBalance)}
            </dd>
          </dl>
        )}

        {booking && !bookingEligible && (
          <p className="text-sm text-destructive" role="alert">
            This booking is not eligible for cash collection.
          </p>
        )}
        {booking && bookingEligible && outstandingBalance === 0 && (
          <p className="text-sm text-muted-foreground" role="status">
            No outstanding balance remains.
          </p>
        )}
        {collectCash.isError && (
          <p className="text-sm text-destructive" role="alert">
            Cash collection failed. Verify the balance and try again.
          </p>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={collectCash.isPending}
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
              !canCollect ||
              collectCash.isPending
            }
            onClick={confirmCollection}
          >
            {collectCash.isPending ? (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            ) : (
              <Banknote aria-hidden="true" />
            )}
            Collect cash
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
