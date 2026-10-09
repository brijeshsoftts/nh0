import { formatDate } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Hash,
  Receipt,
  UserRound,
  Wallet,
} from "lucide-react";

import { PaymentStatusBadge } from "@/components/common/EnumBadges";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";

import type { PaymentItem } from "../payments.types";

type ViewPaymentDetailsProps = {
  payment: PaymentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ViewPaymentDetails({
  payment,
  open,
  onOpenChange,
}: ViewPaymentDetailsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-xl"
      >
        {!payment ? (
          <div className="p-6">
            <SheetHeader>
              <SheetTitle>Payment details</SheetTitle>
              <SheetDescription>No payment selected.</SheetDescription>
            </SheetHeader>
          </div>
        ) : (
          <>
            <div className="border-b px-5 py-6 sm:px-6">
              <SheetHeader className="space-y-3 text-left">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Receipt className="size-5 text-primary" />
                </div>

                <div className="space-y-1">
                  <SheetTitle className="text-xl">Payment details</SheetTitle>
                  <SheetDescription>
                    Review transaction, booking, and payment information.
                  </SheetDescription>
                </div>
              </SheetHeader>

              <div className="mt-6 rounded-xl border bg-muted/30 p-4 sm:p-5">
                <p className="text-sm text-muted-foreground">Payment amount</p>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-2xl font-semibold tracking-tight wrap-break-word sm:text-3xl">
                    {formatPrice(payment.amount)}
                  </p>

                  <PaymentStatusBadge value={payment.paymentStatus} />
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Payment reference
                    </p>
                    <p className="mt-1 font-mono text-sm font-medium break-all">
                      {payment.paymentReference}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Payment method
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {String(payment.paymentMethod)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 px-5 py-5 sm:px-6">
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="size-4 text-muted-foreground" />
                  Transaction information
                </h3>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
                  <DetailItem
                    icon={Hash}
                    label="Transaction ID"
                    value={payment.transactionId}
                    mono
                  />
                  <DetailItem
                    icon={Wallet}
                    label="Payment method"
                    value={String(payment.paymentMethod)}
                  />
                  {payment.paidAt && (
                    <DetailItem
                      icon={CalendarDays}
                      label="Paid at"
                      value={formatDate(payment.paidAt, "dd MMM, yyyy")}
                    />
                  )}
                  <DetailItem
                    icon={Clock}
                    label="Recorded at"
                    value={formatDate(payment.createdAt, "dd MMM, yyyy")}
                  />
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <FileText className="size-4 text-muted-foreground" />
                  Booking and invoice
                </h3>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
                  <DetailItem
                    icon={Receipt}
                    label="Invoice number"
                    value={payment.invoiceNumber}
                    mono
                  />
                  <DetailItem
                    icon={Hash}
                    label="Booking reference"
                    value={payment.bookingReference}
                    mono
                  />
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <UserRound className="size-4 text-muted-foreground" />
                  Customer and audit information
                </h3>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
                  <DetailItem
                    icon={UserRound}
                    label="Customer name"
                    value={payment.customerName}
                  />
                  <DetailItem
                    icon={CheckCircle2}
                    label="Recorded by"
                    value={payment.recordedByName}
                  />
                </div>
              </section>

              <Separator />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 py-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={`text-sm font-medium wrap-break-word ${
            mono ? "font-mono text-xs sm:text-sm" : ""
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
