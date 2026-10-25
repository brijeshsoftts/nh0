import { formatDate } from "date-fns";
import {
  BedDouble,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  CreditCard,
  FileText,
  Hotel,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { DataTable } from "@/components/common/DataTable";
import { BookingBadge } from "@/components/common/EnumBadges";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookings } from "@/features/bookings/bookings.crud";
import { columns } from "@/features/bookings/components/CustomerBookings";
import {} from "@/features/customers/components/CustomerTable";

import { useNextBooking } from "../hooks/useNextBooking";

import { DashboardStats } from "./DashboardStats";

function NextBookingCard() {
  const { data: booking, isLoading, isError, refetch } = useNextBooking();

  return (
    <Card className="border border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Next booking</CardTitle>
          <CardDescription>Your next upcoming stay</CardDescription>
        </div>
        {booking && <BookingBadge value={booking.status} />}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div
            role="status"
            aria-label="Loading next booking"
            className="grid gap-4 sm:grid-cols-3"
          >
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        ) : isError ? (
          <div role="alert" className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Could not load your next booking.
            </p>
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              onClick={() => void refetch()}
            >
              Try again
            </button>
          </div>
        ) : booking ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                <CalendarDays className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Stay dates</p>
                <p className="text-sm font-medium">
                  {formatDate(booking.checkInDate, "dd MMM, yyyy")}{" "}
                  {formatDate(booking.checkOutDate, "dd MMM, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                <Hotel className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Room type</p>
                <p className="truncate text-sm font-medium">
                  {booking.roomTypeName ?? "Not assigned"}
                </p>
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Booking reference</p>
              <p className="truncate font-mono text-sm font-medium">
                {booking.bookingReference}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              You don’t have an upcoming booking yet.
            </p>
            <Link
              to="/dashboard/rooms"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Browse rooms
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentBookings() {
  const { items, isLoading, isError, refetch } = useBookings({
    page: 1,
    limit: 5,
  });

  return (
    <DataTable
      title="Recent bookings"
      description="Your five most recent bookings."
      data={items}
      columns={columns}
      showSearch={false}
      showPagination={false}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load your recent bookings."
      emptyMessage="You have no bookings yet."
    />
  );
}

const QUICK_ACTIONS: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Browse rooms", href: "/dashboard/rooms", icon: BedDouble },
  {
    label: "New booking",
    href: "/dashboard/bookings/new",
    icon: CalendarPlus,
  },
  {
    label: "My bookings",
    href: "/dashboard/bookings",
    icon: CalendarCheck,
  },
];

const BILLING_SHORTCUTS: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
];

function ShortcutLinks({
  items,
}: {
  items: { label: string; href: string; icon: LucideIcon }[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          className="flex min-h-11 items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Icon className="size-4 shrink-0 text-muted-foreground" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

function CustomerShortcuts() {
  return (
    <div className="space-y-5">
      <section aria-labelledby="customer-quick-actions">
        <h2
          id="customer-quick-actions"
          className="mb-3 text-sm font-semibold text-foreground"
        >
          Quick actions
        </h2>
        <ShortcutLinks items={QUICK_ACTIONS} />
      </section>

      <section aria-labelledby="customer-billing-shortcuts">
        <h2
          id="customer-billing-shortcuts"
          className="mb-3 text-sm font-semibold text-foreground"
        >
          Payments & invoices
        </h2>
        <ShortcutLinks items={BILLING_SHORTCUTS} />
      </section>
    </div>
  );
}

export function CustomerDashboard() {
  return (
    <>
      <DashboardStats />
      <CustomerShortcuts />
      <NextBookingCard />
      <RecentBookings />
    </>
  );
}
