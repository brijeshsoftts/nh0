import { ArrowUpRight, CalendarDays, Plus, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { BookingBadge, InvoiceBadge } from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import type { BookingStatus } from "@/types/enum.types";

import { useBookings } from "../hooks/useBookings";
import type { BookingListItem } from "../bookings.types";

const BOOKING_STATUSES: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
  "NO_SHOW",
];

function formatDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ManagementBooking() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingStatus | undefined>();
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);
  const { items, pagination, isLoading, isError, refetch } = useBookings({
    page,
    limit: 10,
    search: debouncedSearch.trim() || undefined,
    status,
  });

  const columns: ColumnDef<BookingListItem>[] = [
    {
      key: "bookingReference",
      header: "Booking",
      cell: (booking) => (
        <div className="min-w-36">
          <p className="font-semibold text-foreground">
            {booking.bookingReference}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Booked {formatDate(booking.bookedAt)}
          </p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      cell: (booking) => (
        <div className="min-w-40">
          <p className="font-medium">{booking.customer.fullName}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {booking.customer.phone}
          </p>
        </div>
      ),
    },
    {
      key: "stay",
      header: "Stay",
      cell: (booking) => (
        <div className="min-w-40">
          <p>
            {formatDate(booking.checkInDate)}{" "}
            <span className="text-muted-foreground">→</span>{" "}
            {formatDate(booking.checkOutDate)}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="size-3.5" />
            {booking.totalGuests}{" "}
            {booking.totalGuests === 1 ? "guest" : "guests"}
          </p>
        </div>
      ),
    },
    {
      key: "room",
      header: "Room",
      cell: (booking) => (
        <div className="min-w-36">
          {booking.bookingRooms.map((room) => (
            <p key={room.id} className="font-medium">
              {room.roomType.name}
              {room.assignedRoom && (
                <span className="ml-1 text-muted-foreground">
                  · {room.assignedRoom.roomNumber}
                </span>
              )}
            </p>
          ))}
        </div>
      ),
    },
    {
      key: "totalAmount",
      header: "Total",
      align: "right",
      cell: (booking) => (
        <div className="min-w-24 text-right">
          <p className="font-semibold">{formatCurrency(booking.totalAmount)}</p>
          {booking.invoice && (
            <div className="mt-1">
              <InvoiceBadge value={booking.invoice.status} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (booking) => <BookingBadge value={booking.status} />,
    },
  ];

  return (
    <main className="space-y-6">
      <header className="flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            <CalendarDays className="size-4 text-primary" />
            Front desk · Booking register
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Bookings
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Find reservations, check stay details, and keep arrivals moving.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/dashboard/bookings/new">
            <Plus className="size-4" />
            New booking
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </header>

      <DataTable
        title="All reservations"
        description={
          pagination
            ? `${pagination.total} reservations · Most recently booked first`
            : "Search reservations by reference, guest, or room"
        }
        data={items}
        columns={columns}
        pagination={pagination}
        onPageChange={setPage}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        searchPlaceholder="Search booking, customer, or room…"
        filters={[
          {
            key: "status",
            label: "status",
            placeholder: "All statuses",
            options: BOOKING_STATUSES.map((value) => ({ value, label: value })),
          },
        ]}
        onFilterChange={(_key, value) => {
          setStatus(value ? (value as BookingStatus) : undefined);
          setPage(1);
        }}
        isLoading={isLoading}
        isError={isError}
        refetch={() => void refetch()}
        errorMessage="Bookings could not be loaded. Try again."
        emptyMessage="No bookings match these filters. Try another search or create a booking."
      />
    </main>
  );
}
