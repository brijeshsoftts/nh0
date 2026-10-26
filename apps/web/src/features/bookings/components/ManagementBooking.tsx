import { Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { BookingBadge, InvoiceBadge } from "@/components/common/EnumBadges";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { useListParams } from "@/hooks/useListParams";

import { bookingFilters } from "../booking-filters";
import type { BookingListItem } from "../bookings.types";
import { useBookings } from "../hooks/useBookings";

import { BookingRowActions } from "./BookingRowActions";
import { BookingsStats } from "./BookingsStats";

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
  const { params, setPage, setSearch, setFilter } = useListParams();
  const { items, pagination, isLoading, isError, refetch } =
    useBookings(params);

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
          <p className="font-medium">{booking.bookingRoom?.roomType.name}</p>
          {booking.bookingRoom?.assignedRoom && (
            <span className="ml-1 text-muted-foreground">
              · {booking.bookingRoom?.assignedRoom.roomNumber}
            </span>
          )}
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
        </div>
      ),
    },
    {
      key: "invoiceStatus",
      header: "Invoice",
      cell: (booking) =>
        booking.invoice?.status && (
          <span className="**:data-[slot=badge]:rounded-none">
            <InvoiceBadge value={booking.invoice.status} />
          </span>
        ),
    },
    {
      key: "status",
      header: "Status",
      cell: (booking) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <BookingBadge value={booking.status} />
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "right",
      cell: (booking) => <BookingRowActions booking={booking} />,
    },
  ];

  return (
    <>
      <Header
        title="Bookings"
        description="Find reservations, check stay details, and keep arrivals moving."
        rightContent={
          <Link to="/dashboard/bookings/new">
            <Button className="shrink-0 rounded-none">
              <Plus className="size-4" />
              New booking
            </Button>
          </Link>
        }
      />

      <BookingsStats />

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
        onSearchChange={setSearch}
        searchPlaceholder="Search booking, customer, or room…"
        filters={bookingFilters}
        onFilterChange={(key, value) => setFilter({ [key]: value })}
        isLoading={isLoading}
        isError={isError}
        refetch={() => void refetch()}
        errorMessage="Bookings could not be loaded. Try again."
        emptyMessage="No bookings match these filters. Try another search or create a booking."
      />
    </>
  );
}
