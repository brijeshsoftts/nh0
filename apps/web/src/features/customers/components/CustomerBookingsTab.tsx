import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import {
  BookingBadge,
  InvoiceBadge,
  PaymentStatusBadge,
} from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BookingDetailsSheet } from "@/features/bookings/components/BookingDetailsSheet";
import { formatPrice } from "@/lib/format";

import type { CustomerBookingItem } from "../customers.types";
import { useCustomerBookings } from "../hooks/useCustomerBookings";

const PAGE_SIZE = 8;

function displayDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : format(date, "dd MMM yyyy");
}

export function CustomerBookingsTab({
  customerId,
  enabled,
}: {
  customerId: string;
  enabled: boolean;
}) {
  const [page, setPage] = useState(1);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const { data, isLoading, isFetching, isError, refetch } = useCustomerBookings(
    customerId,
    { page, limit: PAGE_SIZE },
    enabled
  );
  const bookings = data?.data ?? [];
  const pagination = data?.meta;

  if (isLoading || isFetching) {
    return (
      <div
        className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground"
        role="status"
      >
        <Spinner className="size-4" />
        Loading customer bookings…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 border p-5 text-center" role="alert">
        <p className="text-sm text-destructive">
          Could not load bookings for this customer.
        </p>
        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="border p-6 text-center text-sm text-muted-foreground">
        No bookings found for this customer.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="max-h-100 space-y-3 overflow-y-auto pr-1">
        {bookings.map((booking) => (
          <CustomerBookingCard
            key={booking.id}
            booking={booking}
            onSelect={() => setSelectedBookingId(booking.id)}
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
              aria-label="Previous bookings page"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              aria-label="Next bookings page"
              disabled={page * PAGE_SIZE >= pagination.total}
              onClick={() => setPage((current) => current + 1)}
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {selectedBookingId && (
        <BookingDetailsSheet
          open
          bookingId={selectedBookingId}
          onOpenChange={(open) => {
            if (!open) setSelectedBookingId(null);
          }}
        />
      )}
    </div>
  );
}

function CustomerBookingCard({
  booking,
  onSelect,
}: {
  booking: CustomerBookingItem;
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
            {booking.bookingReference}
          </button>
          <p className="text-xs text-muted-foreground">
            {booking.bookingRoom?.roomTypeName ?? "Room details unavailable"}
            {booking.bookingRoom?.roomNumber
              ? ` · Room ${booking.bookingRoom.roomNumber}`
              : ""}
          </p>
        </div>
        <BookingBadge value={booking.status} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Check-in</dt>
          <dd className="mt-0.5 font-medium">
            {displayDate(booking.checkInDate)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Check-out</dt>
          <dd className="mt-0.5 font-medium">
            {displayDate(booking.checkOutDate)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Guests</dt>
          <dd className="mt-0.5 font-medium">{booking.totalGuests}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Total</dt>
          <dd className="mt-0.5 font-medium">
            {formatPrice(booking.totalAmount)}
          </dd>
        </div>
        {booking.invoice && (
          <>
            <div>
              <dt className="text-muted-foreground">Paid</dt>
              <dd className="mt-0.5 font-medium">
                {formatPrice(booking.invoice.paidAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Balance</dt>
              <dd className="mt-0.5 font-medium">
                {formatPrice(booking.invoice.balanceDue)}
              </dd>
            </div>
          </>
        )}
      </dl>

      {booking.invoice ? (
        <div className="flex flex-wrap items-center gap-2 border-t pt-3">
          <span className="text-xs text-muted-foreground">
            {booking.invoice.invoiceNumber}
          </span>
          <InvoiceBadge value={booking.invoice.status} />
          {booking.invoice.latestPaymentStatus && (
            <PaymentStatusBadge value={booking.invoice.latestPaymentStatus} />
          )}
        </div>
      ) : (
        <p className="border-t pt-3 text-xs text-muted-foreground">
          Invoice and payment details unavailable.
        </p>
      )}
    </article>
  );
}
