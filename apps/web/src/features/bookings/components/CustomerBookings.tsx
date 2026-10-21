import { formatDate } from "date-fns";
import {
  Ban,
  BedDouble,
  CalendarDays,
  Clock3,
  Download,
  EllipsisVertical,
  Eye,
  Users,
} from "lucide-react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { BookingBadge } from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useListParams } from "@/hooks/useListParams";
import { formatPrice } from "@/lib/format";

import {
  useBookingDetails,
  useBookings,
  useBookingsStats,
} from "../bookings.crud";
import type { CustomerBooking } from "../bookings.types";

function Stats() {
  const { data, isLoading, isError, refetch } = useBookingsStats();

  if (isLoading) {
    return <StatCardLoading />;
  }

  if (isError || !data) {
    return <StatCardError refetch={refetch} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data?.map((kpi) => (
        <StatCard key={kpi.id} {...kpi} />
      ))}
    </div>
  );
}

export const columns: ColumnDef<CustomerBooking>[] = [
  {
    key: "bookingNumber",
    header: "Booking #",
    className: "min-w-36",
    cell: (booking) => (
      <span className="font-medium">{booking.bookingNumber}</span>
    ),
  },
  {
    key: "roomType",
    header: "Room Type",
    cell: (booking) => booking.roomType,
  },
  {
    key: "roomNumber",
    header: "Room Number",
    cell: (booking) => booking.roomNumber || "—",
  },
  {
    key: "checkIn",
    header: "Check-in",
    cell: (booking) =>
      booking.checkIn ? formatDate(booking.checkIn, "dd MMM, yyyy") : "—",
  },
  {
    key: "checkOut",
    header: "Check-out",
    cell: (booking) =>
      booking.checkOut ? formatDate(booking.checkOut, "dd MMM, yyyy") : "—",
  },
  {
    key: "totalAmount",
    header: "Total Amount",
    align: "right",
    cell: (booking) => (
      <span className="font-semibold tabular-nums">
        {formatPrice(booking.totalAmount)}
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
    header: "Actions",
    cell: (booking) => <ActionDropdownMenu booking={booking} />,
  },
];

function BookingsTable() {
  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } =
    useBookings<CustomerBooking>({
      search: searchInput,
      page: params.page || 1,
      limit: 10,
    });

  return (
    <DataTable
      title="Bookings"
      description="Review booking details, check-in/check-out dates, and manage bookings."
      data={items}
      columns={columns}
      searchPlaceholder="Search by booking number"
      searchableKeys={["bookingReference", "customerName"]}
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load bookings. Please try again."
      emptyMessage="No bookings match your search or filters."
      showPagination
    />
  );
}

function ActionDropdownMenu({ booking }: { booking: CustomerBooking }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${booking.id}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <Eye />
            View
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Ban />
            Cancel
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Download />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BookingDetailsDialog
        bookingId={booking.id}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 py-2">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium wrap-break-word">
        {value || "—"}
      </dd>
    </div>
  );
}

function BookingDetailsDialog({
  bookingId,
  open,
  onOpenChange,
}: {
  bookingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isLoading, isError, refetch } = useBookingDetails(
    open ? bookingId : undefined
  );
  const booking = data && "duration" in data ? data : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-120 gap-0 rounded-none">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg break-all">
            {booking?.bookingNumber ?? "Booking details"}
          </DialogTitle>
          <DialogDescription>
            Your stay information and booking summary.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading booking details…
          </p>
        ) : isError || !booking ? (
          <div className="space-y-3 py-8 text-center">
            <p className="text-sm text-destructive">
              Booking details could not be loaded.
            </p>
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={() => void refetch()}
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="my-4 max-h-100 space-y-5 overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 border-y py-3">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="**:data-[slot=badge]:rounded-none">
                <BookingBadge value={booking.status} />
              </span>
            </div>

            <section
              aria-labelledby="stay-details-title"
              className="space-y-3 overflow-y-auto"
            >
              <h3
                id="stay-details-title"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <BedDouble className="size-4 text-muted-foreground" />
                Stay details
              </h3>
              <dl className="grid grid-cols-2 gap-x-4">
                <Detail label="Room type" value={booking.roomType} />
                <Detail label="Room number" value={booking.roomNumber ?? "—"} />
              </dl>
            </section>

            <section aria-labelledby="dates-title" className="space-y-3">
              <h3
                id="dates-title"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <CalendarDays className="size-4 text-muted-foreground" />
                Dates
              </h3>
              <dl className="grid grid-cols-2 gap-x-4">
                <Detail
                  label="Check-in"
                  value={formatDate(booking.checkIn, "dd MMM, yyyy")}
                />
                <Detail
                  label="Check-out"
                  value={formatDate(booking.checkOut, "dd MMM, yyyy")}
                />
              </dl>
            </section>

            <section aria-labelledby="guests-title" className="space-y-3">
              <h3
                id="guests-title"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <Users className="size-4 text-muted-foreground" />
                Guests
              </h3>
              <dl className="grid grid-cols-3 gap-x-3">
                <Detail label="Adults" value={String(booking.adults)} />
                <Detail label="Children" value={String(booking.children)} />
                <Detail
                  label="Duration"
                  value={`${booking.duration} ${booking.duration === 1 ? "night" : "nights"}`}
                />
              </dl>
            </section>

            <div className="flex items-start justify-between gap-4 border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                Booked on
              </div>
              <p className="text-right text-sm font-medium">
                {formatDate(booking.bookedOn, "dd MMM, yyyy")}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-none"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CustomerBookings() {
  return (
    <>
      <Stats />
      <BookingsTable />
    </>
  );
}
