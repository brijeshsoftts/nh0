import { formatDate } from "date-fns";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  BookingBadge,
  PaymentStatusBadge,
} from "@/components/common/EnumBadges";
import { StatGrid } from "@/components/common/Stat";
import { BookingDetailsSheet } from "@/features/bookings/components/BookingDetailsSheet";

import type { ArrivalItem, DepartureItem } from "../dashboard.types";
import { useDashbaordStats } from "../hooks/useDashbaordStats";
import { useDashbaordStays } from "../hooks/useDashbaordStays";
import { useDashbaordBookingStatus } from "../hooks/useDashboardBookingStatus";
import { useDashboardRoomStatus } from "../hooks/useDashboardRoomStatus";

import { DonutChart } from "./DonutChart";
import { StatusBarChart } from "./StatusBarChart";

function TodaysArrivals({
  items,
  isLoading,
  isError,
  onRetry,
}: {
  items: ArrivalItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const columns: ColumnDef<ArrivalItem>[] = [
    { key: "bookingReference", header: "Booking" },
    { key: "customerName", header: "Customer" },
    {
      key: "roomNumber",
      header: "Room",
      cell: (row) => row.roomNumber ?? "Unassigned",
    },
    {
      key: "checkIn",
      header: "Check In",
      cell: (row) => formatDate(row.checkIn, "dd MMM, yyyy"),
    },
    {
      key: "bookingStatus",
      header: "Status",
      cell: (row) => <BookingBadge value={row.bookingStatus} />,
    },
  ];

  return (
    <DataTable
      title="Today's Arrivals"
      description="Guests scheduled to check in today"
      data={items}
      columns={columns}
      showSearch={false}
      showPagination={false}
      isLoading={isLoading}
      isError={isError}
      errorMessage="Today's arrivals could not be loaded."
      emptyMessage="No arrivals scheduled for today."
      refetch={onRetry}
      onRowClick={(row) => setSelectedBookingId(row.bookingId)}
      renderActions={(row) =>
        selectedBookingId === row.bookingId ? (
          <BookingDetailsSheet
            onOpenChange={() => setSelectedBookingId(null)}
            open
            bookingId={row.bookingId}
          />
        ) : null
      }
    />
  );
}

function TodaysDepartures({
  items,
  isLoading,
  isError,
  onRetry,
}: {
  items: DepartureItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const columns: ColumnDef<DepartureItem>[] = [
    { key: "bookingReference", header: "Booking" },
    { key: "customerName", header: "Customer" },
    {
      key: "roomNumber",
      header: "Room",
      cell: (row) => row.roomNumber ?? "Unassigned",
    },
    {
      key: "checkOut",
      header: "Check Out",
      cell: (row) => formatDate(row.checkOut, "dd MMM, yyyy"),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      cell: (row) => <PaymentStatusBadge value={row.paymentStatus} />,
    },
  ];

  return (
    <DataTable
      title="Today's Departures"
      description="Guests scheduled to check out today"
      data={items}
      columns={columns}
      showSearch={false}
      showPagination={false}
      isLoading={isLoading}
      isError={isError}
      errorMessage="Today's departures could not be loaded."
      emptyMessage="No departures scheduled for today."
      refetch={onRetry}
      onRowClick={(row) => setSelectedBookingId(row.bookingId)}
      renderActions={(row) =>
        selectedBookingId === row.bookingId ? (
          <BookingDetailsSheet
            onOpenChange={() => setSelectedBookingId(null)}
            open
            bookingId={row.bookingId}
          />
        ) : null
      }
    />
  );
}

export function ReceptionistDashboard() {
  const stats = useDashbaordStats();
  const stays = useDashbaordStays();
  const roomStatus = useDashboardRoomStatus();
  const bookingStatus = useDashbaordBookingStatus("all");

  return (
    <>
      <StatGrid
        stats={stats.data}
        isLoading={stats.isLoading}
        isError={stats.isError}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <DonutChart
          data={roomStatus.data ?? []}
          title="Room Availability"
          description="Current active room occupancy"
          centerLabel="Rooms"
          showRange={false}
          errorMessage="Room availability could not be loaded."
          isLoading={roomStatus.isLoading}
          isError={roomStatus.isError}
          onRetry={() => void roomStatus.refetch()}
        />
        <StatusBarChart
          data={bookingStatus.data ?? []}
          title="Booking Status"
          description="Bookings across all statuses"
          isLoading={bookingStatus.isLoading}
          isError={bookingStatus.isError}
          onRetry={() => void bookingStatus.refetch()}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TodaysArrivals
          items={stays.data?.arrivals.items ?? []}
          isLoading={stays.isLoading}
          isError={stays.isError}
          onRetry={() => void stays.refetch()}
        />
        <TodaysDepartures
          items={stays.data?.departures.items ?? []}
          isLoading={stays.isLoading}
          isError={stays.isError}
          onRetry={() => void stays.refetch()}
        />
      </div>
    </>
  );
}
