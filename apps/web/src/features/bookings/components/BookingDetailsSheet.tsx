import {
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Receipt,
  UserRound,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
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

import { getBookingStatusActions } from "../booking-status";
import { useBooking } from "../hooks/useBooking";
import { useUpdateBookingStatus } from "../hooks/useUpdateBookingStatus";

interface BookingDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}

function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date?: string) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatDateOnly(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusVariant(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
    case "CHECKED_IN":
      return "secondary";

    case "CANCELLED":
    case "NO_SHOW":
      return "destructive";

    case "PENDING":
      return "outline";

    default:
      return "secondary";
  }
}

function getInvoiceStatusVariant(status: InvoiceStatus) {
  switch (status) {
    case "PAID":
      return "secondary";

    case "REFUNDED":
      return "outline";

    case "UNPAID":
      return "destructive";

    case "PARTIALLY_PAID":
      return "outline";
  }
}

function getPaymentStatusVariant(status: PaymentStatus) {
  switch (status) {
    case "COMPLETED":
      return "secondary";

    case "FAILED":
      return "destructive";

    case "REFUNDED":
      return "outline";

    default:
      return "outline";
  }
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-muted">
          <Icon className="size-3.5 text-muted-foreground" />
        </div>

        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      {children}
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}

function getNights(checkIn: string, checkOut: string) {
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();

  return Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
}

export function BookingDetailsSheet({
  open,
  onOpenChange,
  bookingId,
}: BookingDetailsSheetProps) {
  const { booking, isLoading, isError, refetch } = useBooking(bookingId, open);
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus();

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="flex w-full flex-col items-center justify-center sm:max-w-xl"
        >
          <Spinner className="size-8" />
          <p className="text-sm text-muted-foreground">
            Loading booking details…
          </p>
        </SheetContent>
      </Sheet>
    );
  }

  if (isError || !booking) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="flex w-full flex-col items-center justify-center gap-3 sm:max-w-xl"
        >
          <p className="text-sm text-destructive">
            Booking details could not be loaded.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </SheetContent>
      </Sheet>
    );
  }

  const invoice = booking.invoices[0];
  const nights = getNights(booking.checkInDate, booking.checkOutDate);

  const totalPaid =
    invoice?.payments
      .filter((payment) => payment.paymentStatus === "COMPLETED")
      .reduce((total, payment) => total + payment.amount, 0) ?? 0;

  const remainingAmount = Math.max(
    0,
    (invoice?.totalAmount ?? booking.totalAmount) - totalPaid
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full min-w-80 flex-col gap-0 p-0 sm:min-w-120"
      >
        {/* Header */}
        <SheetHeader className="border-b px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SheetTitle className="text-lg font-semibold tracking-tight">
                  {booking.bookingReference}
                </SheetTitle>

                <Badge variant={getStatusVariant(booking.status)}>
                  {formatLabel(booking.status)}
                </Badge>
              </div>

              <SheetDescription className="mt-1">
                Booked {formatDate(booking.bookedAt)}
              </SheetDescription>
            </div>
          </div>

          {/* Actions */}
          <BookingActions
            status={booking.status}
            isPending={isPending}
            onChangeStatus={(status, confirmMessage) => {
              if (confirmMessage && !window.confirm(confirmMessage)) return;
              updateStatus({ id: booking.id, status });
            }}
          />
        </SheetHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-5 py-5 sm:px-6">
            {/* Customer */}
            <Section icon={UserRound} title="Customer">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  {booking.customer.profileImage ? (
                    <img
                      src={booking.customer.profileImage.url}
                      alt={booking.customer.profileImage.altText}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <UserRound className="size-5 text-muted-foreground" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {booking.customer.fullName}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      Customer
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2 border-t pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-3.5 shrink-0 text-muted-foreground" />

                    <span className="truncate">{booking.customer.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-3.5 shrink-0 text-muted-foreground" />

                    <span>{booking.customer.phone}</span>
                  </div>
                </div>

                {booking.customer.profile && (
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">ID Proof</p>

                      <p className="mt-1 text-sm font-medium">
                        {booking.customer.profile.idProofNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>

                      <p className="mt-1 truncate text-sm font-medium">
                        {booking.customer.profile.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Section>

            <Separator />

            {/* Stay */}
            <Section icon={CalendarDays} title="Stay">
              <div className="rounded-lg border">
                <div className="grid grid-cols-2 divide-x border-b">
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">Check-in</p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatDateOnly(booking.checkInDate)}
                    </p>
                  </div>

                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">Check-out</p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatDateOnly(booking.checkOutDate)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3">
                  <div className="rounded-md bg-muted/50 px-3 py-2">
                    <p className="text-xs text-muted-foreground">
                      Total nights
                    </p>

                    <p className="mt-1 text-sm font-semibold">{nights}</p>
                  </div>

                  <div className="rounded-md bg-muted/50 px-3 py-2">
                    <p className="text-xs text-muted-foreground">
                      Total guests
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {booking.totalGuests}
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            <Separator />

            {/* Rooms */}
            <Section
              icon={BedDouble}
              title={`Rooms (${booking.bookingRooms.length})`}
            >
              <div className="space-y-2">
                {booking.bookingRooms.map((room) => (
                  <div key={room.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                          <BedDouble className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold">
                            Room {room.roomNumber}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {room.roomType?.name ?? "Room type unavailable"}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-semibold">
                        {formatCurrency(
                          room.pricePerNight,
                          room.roomType?.currency
                        )}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          /night
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Floor</p>

                        <p className="mt-1 text-sm font-medium">{room.floor}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Bed</p>

                        <p className="mt-1 text-sm font-medium">
                          {room.roomType?.bedType ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Separator />

            {/* Guests */}
            <Section
              icon={Users}
              title={`Guests (${booking.bookingGuests.length})`}
            >
              <div className="overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-125 text-sm">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                          Name
                        </th>

                        <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                          Age
                        </th>

                        <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                          Gender
                        </th>

                        <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
                          ID Proof
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {booking.bookingGuests.map((guest) => (
                        <tr key={guest.id} className="border-b last:border-0">
                          <td className="px-3 py-3 font-medium">
                            {guest.fullName}
                          </td>

                          <td className="px-3 py-3 text-muted-foreground">
                            {guest.age}
                          </td>

                          <td className="px-3 py-3 text-muted-foreground">
                            {formatLabel(guest.gender)}
                          </td>

                          <td className="px-3 py-3 text-muted-foreground">
                            {guest.idProofNumber ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

            <Separator />

            {/* Pricing */}
            <Section icon={Receipt} title="Pricing">
              {invoice ? (
                <div className="rounded-lg border p-3">
                  <DetailRow
                    label="Subtotal"
                    value={formatCurrency(invoice.subtotal)}
                  />

                  <DetailRow
                    label="Tax"
                    value={formatCurrency(invoice.taxAmount)}
                  />

                  <DetailRow
                    label="Discount"
                    value={
                      invoice.discountAmount > 0
                        ? `-${formatCurrency(invoice.discountAmount)}`
                        : formatCurrency(0)
                    }
                  />

                  <Separator />

                  <div className="mt-2 rounded-md bg-muted/50 px-3">
                    <DetailRow
                      label="Grand total"
                      value={
                        <span className="text-base font-bold">
                          {formatCurrency(invoice.totalAmount)}
                        </span>
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border p-3">
                  <DetailRow
                    label="Booking total"
                    value={
                      <span className="text-base font-bold">
                        {formatCurrency(booking.totalAmount)}
                      </span>
                    }
                  />
                </div>
              )}
            </Section>

            <Separator />

            {/* Payment */}
            <Section icon={CreditCard} title="Payment">
              <div className="rounded-lg border p-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(
                        invoice?.totalAmount ?? booking.totalAmount
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Paid</p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(totalPaid)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(remainingAmount)}
                    </p>
                  </div>
                </div>

                {invoice && (
                  <div className="mt-4 flex items-center justify-between border-t pt-3">
                    <span className="text-sm text-muted-foreground">
                      Payment status
                    </span>

                    <Badge variant={getInvoiceStatusVariant(invoice.status)}>
                      {formatLabel(invoice.status)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Payment history */}
              {invoice?.payments.length ? (
                <div className="overflow-hidden rounded-lg border">
                  <div className="border-b bg-muted/50 px-3 py-2.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Payment history
                    </p>
                  </div>

                  <div className="divide-y">
                    {invoice.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between gap-3 p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">
                            {formatCurrency(payment.amount)}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatLabel(payment.paymentMethod)} ·{" "}
                            {payment.paymentReference}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatDate(payment.paidAt ?? payment.createdAt)}
                          </p>
                        </div>

                        <Badge
                          variant={getPaymentStatusVariant(
                            payment.paymentStatus
                          )}
                          className="shrink-0"
                        >
                          {formatLabel(payment.paymentStatus)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </Section>

            {/* Special request */}
            {booking.specialRequest && (
              <>
                <Separator />

                <Section icon={FileText} title="Special Request">
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-sm leading-6 text-muted-foreground">
                      {booking.specialRequest}
                    </p>
                  </div>
                </Section>
              </>
            )}

            <Separator />

            {/* Timeline */}
            <Section icon={Clock3} title="Booking Timeline">
              <div className="rounded-lg border">
                <TimelineItem
                  title="Booking created"
                  date={booking.createdAt}
                  active
                />

                <TimelineItem title="Booked" date={booking.bookedAt} active />

                <TimelineItem
                  title="Checked in"
                  date={booking.checkedInAt}
                  active={!!booking.checkedInAt}
                />

                <TimelineItem
                  title="Checked out"
                  date={booking.checkedOutAt}
                  active={!!booking.checkedOutAt}
                />

                {booking.cancelledAt && (
                  <TimelineItem
                    title="Cancelled"
                    date={booking.cancelledAt}
                    active
                    last
                  />
                )}
              </div>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-background px-5 py-3 sm:px-6">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function BookingActions({
  status,
  isPending,
  onChangeStatus,
}: {
  status: BookingStatus;
  isPending: boolean;
  onChangeStatus: (status: BookingStatus, confirmMessage?: string) => void;
}) {
  const actions = getBookingStatusActions(status);
  if (actions.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.status}
          size="sm"
          variant={action.destructive ? "destructive" : "default"}
          disabled={isPending}
          onClick={() => onChangeStatus(action.status, action.confirmMessage)}
        >
          {action.status === "CONFIRMED" && (
            <CheckCircle2 className="size-3.5" />
          )}
          {action.label}
        </Button>
      ))}
    </div>
  );
}

function TimelineItem({
  title,
  date,
  active,
  last = false,
}: {
  title: string;
  date?: string;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className="flex gap-3 px-3 py-3">
      <div className="flex flex-col items-center">
        <div
          className={[
            "flex size-6 shrink-0 items-center justify-center rounded-full",
            active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {active && <CheckCircle2 className="size-3.5" />}
        </div>

        {!last && <div className="mt-1 h-full min-h-4 w-px bg-border" />}
      </div>

      <div className="min-w-0">
        <p
          className={
            active ? "text-sm font-medium" : "text-sm text-muted-foreground"
          }
        >
          {title}
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}
