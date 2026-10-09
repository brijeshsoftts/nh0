import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Hash,
  Hotel,
  Mail,
  Phone,
  Receipt,
  Tag,
  UserRound,
  Wallet,
} from "lucide-react";

import { ErrorModal } from "@/components/common/ErrorModal";
import { FullScreenLoader } from "@/components/common/Loader";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type {
  BookingStatus,
  InvoiceStatus,
  PaymentStatus,
} from "@/types/enum.types";

import { useInvoiceDetails } from "../hooks/useInvoiceDetails";

type ViewInvoiceDetailsProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusVariant(
  status: InvoiceStatus | BookingStatus | PaymentStatus
) {
  switch (String(status).toLowerCase()) {
    case "paid":
    case "completed":
    case "confirmed":
    case "success":
    case "successful":
      return "default" as const;

    case "partially_paid":
    case "partiallypaid":
    case "partial":
    case "pending":
    case "processing":
    case "reserved":
      return "secondary" as const;

    case "failed":
    case "cancelled":
    case "canceled":
    case "overdue":
    case "rejected":
      return "destructive" as const;

    default:
      return "outline" as const;
  }
}

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number | null | undefined;
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
          {value === null || value === undefined || value === "" ? "—" : value}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-4 text-muted-foreground" />
      {children}
    </h3>
  );
}

export function ViewInvoiceDetails({
  id,
  open,
  onOpenChange,
}: ViewInvoiceDetailsProps) {
  const { data: invoice, isLoading, isError, refetch } = useInvoiceDetails(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError || !invoice) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  const paidPercentage =
    invoice && invoice.charges.totalAmount > 0
      ? Math.min(
          100,
          Math.max(0, (invoice.paidAmount / invoice.charges.totalAmount) * 100)
        )
      : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-xl lg:max-w-2xl"
      >
        {!invoice ? (
          <div className="p-6">
            <SheetHeader>
              <SheetTitle>Invoice details</SheetTitle>
              <SheetDescription>No invoice selected.</SheetDescription>
            </SheetHeader>
          </div>
        ) : (
          <>
            {/* Header and invoice summary */}
            <div className="border-b px-5 py-6 sm:px-6">
              <SheetHeader className="space-y-3 text-left">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Receipt className="size-5 text-primary" />
                </div>

                <div className="space-y-1">
                  <SheetTitle className="text-xl">Invoice details</SheetTitle>

                  <SheetDescription>
                    Complete invoice, booking, customer, and payment
                    information.
                  </SheetDescription>
                </div>
              </SheetHeader>

              <div className="mt-6 rounded-xl border bg-muted/30 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Invoice total
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight wrap-break-word sm:text-3xl">
                      {formatCurrency(invoice.charges.totalAmount)}
                    </p>

                    <p className="mt-1 font-mono text-xs break-all text-muted-foreground">
                      {invoice.invoiceNumber}
                    </p>
                  </div>

                  <Badge
                    variant={getStatusVariant(invoice.status)}
                    className="shrink-0"
                  >
                    {formatLabel(String(invoice.status))}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Amount paid</p>

                    <p className="mt-1 text-base font-semibold text-emerald-600 dark:text-emerald-500">
                      {formatCurrency(invoice.paidAmount)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Balance due</p>

                    <p className="mt-1 text-base font-semibold">
                      {formatCurrency(invoice.balanceDue)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>Payment progress</span>
                    <span>{paidPercentage.toFixed(0)}%</span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label="Invoice payment progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(paidPercentage)}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${paidPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 px-5 py-5 sm:px-6">
              {/* Customer */}
              <section>
                <SectionTitle icon={UserRound}>
                  Customer information
                </SectionTitle>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
                  <DetailItem
                    icon={UserRound}
                    label="Full name"
                    value={invoice.customer.fullName}
                  />

                  <DetailItem
                    icon={Hash}
                    label="Customer ID"
                    value={invoice.customer.id}
                    mono
                  />

                  <DetailItem
                    icon={Mail}
                    label="Email address"
                    value={invoice.customer.email}
                  />

                  <DetailItem
                    icon={Phone}
                    label="Phone number"
                    value={invoice.customer.phone}
                  />
                </div>
              </section>

              <Separator />

              {/* Booking */}
              <section>
                <SectionTitle icon={Hotel}>Booking information</SectionTitle>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
                  <DetailItem
                    icon={Hash}
                    label="Booking reference"
                    value={invoice.booking.bookingReference}
                    mono
                  />

                  <DetailItem
                    icon={CheckCircle2}
                    label="Booking status"
                    value={formatLabel(String(invoice.booking.status))}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="Check-in"
                    value={formatDate(invoice.booking.checkInDate)}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="Check-out"
                    value={formatDate(invoice.booking.checkOutDate)}
                  />
                </div>

                {/* Room details */}
                {invoice.booking.roomCharge && (
                  <div className="mt-3 rounded-xl border p-4">
                    <div className="flex items-center gap-2">
                      <Hotel className="size-4 text-muted-foreground" />

                      <h4 className="text-sm font-semibold">Room details</h4>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Room type
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {invoice.booking.roomCharge.roomType}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Room number
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {invoice.booking.roomCharge.roomNumber || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Price per night
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {formatCurrency(
                            invoice.booking.roomCharge.pricePerNight
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Number of nights
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {invoice.booking.roomCharge.nights}
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <Separator className="mb-3" />

                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm text-muted-foreground">
                            Room total
                          </p>

                          <p className="text-sm font-semibold">
                            {formatCurrency(invoice.booking.roomCharge.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <Separator />

              {/* Invoice charges */}
              <section>
                <SectionTitle icon={FileText}>Invoice breakdown</SectionTitle>

                <div className="mt-3 rounded-xl border p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">
                        Subtotal
                      </span>

                      <span className="text-sm font-medium">
                        {formatCurrency(invoice.charges.subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tag className="size-3.5" />
                        Discount
                      </span>

                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                        −{formatCurrency(invoice.charges.discountAmount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Tax</span>

                      <span className="text-sm font-medium">
                        {formatCurrency(invoice.charges.taxAmount)}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold">
                        Total amount
                      </span>

                      <span className="text-base font-semibold">
                        {formatCurrency(invoice.charges.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Payment history */}
              <section>
                <div className="flex items-center justify-between gap-3">
                  <SectionTitle icon={CreditCard}>Payment history</SectionTitle>

                  <Badge variant="secondary">
                    {invoice.payments.length}{" "}
                    {invoice.payments.length === 1 ? "payment" : "payments"}
                  </Badge>
                </div>

                {invoice.payments.length === 0 ? (
                  <div className="mt-3 rounded-xl border border-dashed p-6 text-center">
                    <Wallet className="mx-auto size-8 text-muted-foreground" />

                    <p className="mt-3 text-sm font-medium">
                      No payments recorded
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Payments associated with this invoice will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 space-y-3">
                    {invoice.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="min-w-0 rounded-xl border p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-mono text-sm font-medium break-all">
                              {payment.paymentReference}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatDateTime(
                                payment.paidAt || payment.createdAt
                              )}
                            </p>
                          </div>

                          <Badge
                            variant={getStatusVariant(payment.paymentStatus)}
                            className="shrink-0"
                          >
                            {formatLabel(String(payment.paymentStatus))}
                          </Badge>
                        </div>

                        <Separator className="my-3" />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Payment amount
                            </p>

                            <p className="mt-1 text-base font-semibold">
                              {formatCurrency(payment.amount)}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Payment method
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {formatLabel(String(payment.paymentMethod))}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Transaction ID
                            </p>

                            <p className="mt-1 font-mono text-xs break-all">
                              {payment.transactionId || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Recorded at
                            </p>

                            <p className="mt-1 text-sm">
                              {formatDateTime(payment.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <Separator />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
