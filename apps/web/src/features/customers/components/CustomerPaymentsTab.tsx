import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import {
  PaymentMethodBadge,
  PaymentStatusBadge,
} from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ViewPaymentDetails } from "@/features/payments/components/ViewPaymentDetails";
import { formatPrice } from "@/lib/format";

import type { CustomerPaymentItem } from "../customers.types";
import { useCustomerPayments } from "../hooks/useCustomerPayments";

const PAGE_SIZE = 10;

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${formatPrice(amount)} ${currency}`;
  }
}

function formatPaymentDate(paidAt: string | null, createdAt: string) {
  const date = new Date(paidAt ?? createdAt);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : format(date, "dd MMM yyyy, h:mm a");
}

export function CustomerPaymentsTab({
  customerId,
  enabled,
}: {
  customerId: string;
  enabled: boolean;
}) {
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] =
    useState<CustomerPaymentItem | null>(null);
  const { data, isLoading, isFetching, isError, refetch } = useCustomerPayments(
    customerId,
    { page, limit: PAGE_SIZE },
    enabled
  );
  const payments = data?.data ?? [];
  const pagination = data?.meta;

  if (isLoading || isFetching) {
    return (
      <div
        className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground"
        role="status"
      >
        <Spinner className="size-4" />
        Loading customer payments…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 border p-5 text-center" role="alert">
        <p className="text-sm text-destructive">
          Could not load payments for this customer.
        </p>
        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="border p-6 text-center text-sm text-muted-foreground">
        No payments found for this customer.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="max-h-100 space-y-3 overflow-y-auto pr-1">
        {payments.map((payment) => (
          <CustomerPaymentCard
            key={payment.id}
            payment={payment}
            onSelect={() => setSelectedPayment(payment)}
          />
        ))}
      </div>

      {pagination && pagination.total > PAGE_SIZE && (
        <div className="flex items-center justify-between border-t pt-3">
          <p className="text-xs text-muted-foreground">
            Page {pagination.page} of {Math.ceil(pagination.total / PAGE_SIZE)}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              aria-label="Previous payments page"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              aria-label="Next payments page"
              disabled={page * PAGE_SIZE >= pagination.total}
              onClick={() => setPage((current) => current + 1)}
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      <ViewPaymentDetails
        payment={selectedPayment}
        open={selectedPayment !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPayment(null);
        }}
      />
    </div>
  );
}

function CustomerPaymentCard({
  payment,
  onSelect,
}: {
  payment: CustomerPaymentItem;
  onSelect: () => void;
}) {
  return (
    <article className="space-y-3 border p-3 sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <button
            type="button"
            className="text-left text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
            onClick={onSelect}
          >
            {payment.paymentReference}
          </button>
          <p className="font-mono text-xs break-all text-muted-foreground">
            {payment.transactionId ?? "No transaction ID"}
          </p>
        </div>
        <PaymentStatusBadge value={payment.paymentStatus} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Amount</dt>
          <dd className="mt-0.5 font-semibold tabular-nums">
            {formatCurrency(payment.amount, payment.currency)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Method</dt>
          <dd className="mt-0.5">
            <PaymentMethodBadge value={payment.paymentMethod} />
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">
            {payment.paidAt ? "Paid at" : "Recorded at"}
          </dt>
          <dd className="mt-0.5 font-medium">
            {formatPaymentDate(payment.paidAt, payment.createdAt)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Booking</dt>
          <dd className="mt-0.5 font-medium break-all">
            {payment.bookingReference}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Invoice</dt>
          <dd className="mt-0.5 font-medium break-all">
            {payment.invoiceNumber}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Recorded by</dt>
          <dd className="mt-0.5 font-medium">
            {payment.recordedByName ?? "—"}
          </dd>
        </div>
      </dl>
    </article>
  );
}
