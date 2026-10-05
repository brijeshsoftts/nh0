import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  DoorOpen,
  FileText,
  Mail,
  Phone,
  UserRound,
  Users,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookingBadge } from "@/components/common/EnumBadges";

const BOOKING_DETAILS = {
  id: "#BK-1025",
  status: "CONFIRMED",
  createdAt: "Oct 5, 2026",

  customer: {
    id: "customer-001",
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    phone: "+91 98765 43210",
  },

  stay: {
    room: "Room 204",
    roomType: "Deluxe King",
    checkIn: "Oct 10, 2026",
    checkOut: "Oct 13, 2026",
    nights: 3,
    guests: 2,
  },

  guests: [
    {
      name: "Arjun Sharma",
      age: 32,
      gender: "Male",
      idProof: "Aadhaar",
    },
    {
      name: "Priya Sharma",
      age: 29,
      gender: "Female",
      idProof: "Passport",
    },
  ],

  pricing: {
    roomRate: 4500,
    nights: 3,
    subtotal: 13500,
    gst: 2430,
    grandTotal: 15930,
  },

  payment: {
    total: 15930,
    paid: 10000,
    remaining: 5930,
    status: "PARTIALLY_PAID",
  },

  payments: [
    {
      id: "PAY-1021",
      amount: 10000,
      method: "UPI",
      status: "SUCCESS",
      date: "Oct 5, 2026",
    },
  ],

  specialRequest:
    "Please arrange a quiet room away from the elevator. Extra pillows required.",
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
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

export function BookingDetailsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}) {
  const booking = BOOKING_DETAILS;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex min-w-80 flex-col gap-0 p-0 sm:min-w-120"
      >
        {/* Header */}
        <SheetHeader className="border-b px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SheetTitle className="text-lg font-semibold tracking-tight">
                  {booking.id}
                </SheetTitle>

                <BookingBadge value={booking.status}>
                  <CheckCircle2 className="size-3.5" />
                  {booking.status}
                </BookingBadge>
              </div>

              <SheetDescription className="mt-1 flex items-center gap-1.5 text-xs">
                <Clock3 className="size-3.5" />
                Created {booking.createdAt}
              </SheetDescription>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Button size="sm" variant="default">
              Confirm
            </Button>

            <Button size="sm" variant="outline">
              Check-in
            </Button>

            <Button size="sm" variant="outline">
              Check-out
            </Button>

            <Button size="sm" variant="outline">
              Cancel
            </Button>

            <Button size="sm" variant="outline">
              No-show
            </Button>
          </div>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-5 py-5 sm:px-6">
            {/* Customer */}
            <Section icon={UserRound} title="Customer">
              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound className="size-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {booking.customer.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      Customer
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2 border-t pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-3.5 text-muted-foreground" />
                    <span className="truncate">{booking.customer.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-3.5 text-muted-foreground" />
                    <span>{booking.customer.phone}</span>
                  </div>
                </div>
              </div>
            </Section>

            <Separator />

            {/* Stay */}
            <Section icon={CalendarDays} title="Stay">
              <div className="rounded-lg border bg-card">
                <div className="grid grid-cols-2 divide-x border-b">
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">Check-in</p>
                    <p className="mt-1 text-sm font-semibold">
                      {booking.stay.checkIn}
                    </p>
                  </div>

                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">Check-out</p>
                    <p className="mt-1 text-sm font-semibold">
                      {booking.stay.checkOut}
                    </p>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                      <DoorOpen className="size-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {booking.stay.room}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.stay.roomType}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-muted/50 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Nights</p>
                      <p className="mt-0.5 text-sm font-semibold">
                        {booking.stay.nights}
                      </p>
                    </div>

                    <div className="rounded-md bg-muted/50 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Guests</p>
                      <p className="mt-0.5 text-sm font-semibold">
                        {booking.stay.guests}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Separator />

            {/* Guests */}
            <Section icon={Users} title="Guests">
              <div className="overflow-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-125 text-sm">
                    <thead className="bg-muted/50">
                      <tr className="border-b">
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
                      {booking.guests.map((guest) => (
                        <tr key={guest.name} className="border-b last:border-0">
                          <td className="px-3 py-3 font-medium">
                            {guest.name}
                          </td>
                          <td className="px-3 py-3 text-muted-foreground">
                            {guest.age}
                          </td>
                          <td className="px-3 py-3 text-muted-foreground">
                            {guest.gender}
                          </td>
                          <td className="px-3 py-3 text-muted-foreground">
                            {guest.idProof}
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
            <Section icon={FileText} title="Pricing">
              <div className="rounded-lg border p-3">
                <DetailRow
                  label="Room rate"
                  value={formatCurrency(booking.pricing.roomRate)}
                />

                <DetailRow
                  label="Number of nights"
                  value={`× ${booking.pricing.nights}`}
                />

                <Separator />

                <DetailRow
                  label="Subtotal"
                  value={formatCurrency(booking.pricing.subtotal)}
                />

                <DetailRow
                  label="GST"
                  value={formatCurrency(booking.pricing.gst)}
                />

                <div className="mt-2 rounded-md bg-muted/50 px-3">
                  <DetailRow
                    label="Grand Total"
                    value={
                      <span className="text-base font-bold">
                        {formatCurrency(booking.pricing.grandTotal)}
                      </span>
                    }
                  />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Payment */}
            <Section icon={CreditCard} title="Payment">
              <div className="rounded-lg border p-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(booking.payment.total)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(booking.payment.paid)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(booking.payment.remaining)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-muted-foreground">
                    Payment status
                  </span>

                  <Badge variant="secondary">Partially Paid</Badge>
                </div>
              </div>

              {/* Payment history */}
              <div className="overflow-hidden rounded-lg border">
                <div className="border-b bg-muted/50 px-3 py-2.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Payment History
                  </p>
                </div>

                <div className="divide-y">
                  {booking.payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between gap-3 p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {formatCurrency(payment.amount)}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {payment.method} · {payment.date}
                        </p>
                      </div>

                      <Badge variant="secondary" className="shrink-0">
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
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
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-background px-5 py-3 sm:px-6">
          <Button className="w-full" variant="outline">
            View Full Booking
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
