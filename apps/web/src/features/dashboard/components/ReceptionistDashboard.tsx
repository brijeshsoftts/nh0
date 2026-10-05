import { StatCard } from "@/components/common/StatCard";
import {
  BOOKING_STATUS,
  ROOM_STATUS,
  STAFF_STAT,
  TODAYS_ARRIVALS,
  TODAYS_DEPARTURES,
} from "../dashboard.mock";
import { StatusBarChart } from "./StatusBarChart";
import { DonutChart } from "./DonutChart";
import type { TodaysArrival, TodaysDeparture } from "../dashboard.types";
import { DataTable, type ColumnDef } from "@/components/common/DataTable";
import { BookingBadge } from "@/components/common/EnumBadges";
import { useState } from "react";
import { BookingDetailsSheet } from "@/features/bookings/components/BookingDetailsSheet";
import { formatDate } from "date-fns";

function TodaysArrivals() {
  const columns: ColumnDef<TodaysArrival>[] = [
    {
      key: "booking",
      header: "Booking",
      cell: (row) => <>{row.booking.bookingReference}</>,
    },
    {
      key: "customer",
      header: "Customer",
      cell: (row) => <>{row.customer.fullName}</>,
    },
    {
      key: "room",
      header: "Room",
      cell: (row) => row.roomNumber,
    },
    {
      key: "checkin",
      header: "Check In",
      cell: (row) => formatDate(row.checkInDate, "dd MMM, yyyy"),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <BookingBadge value={row.status} />,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <DataTable
        title="Today's Arrivals"
        description="Guests scheduled to check in today"
        data={TODAYS_ARRIVALS}
        columns={columns}
        showSearch={false}
        showPagination={false}
        onRowClick={() => setIsVisible(true)}
        renderActions={(row) =>
          isVisible && (
            <BookingDetailsSheet
              onOpenChange={() => setIsVisible(false)}
              open={isVisible}
              bookingId={row.booking.id}
            />
          )
        }
      />
    </>
  );
}

function TodaysDepartures() {
  const columns: ColumnDef<TodaysDeparture>[] = [
    {
      key: "booking",
      header: "Booking",
      cell: (row) => <>{row.booking.bookingReference}</>,
    },
    {
      key: "customer",
      header: "Customer",
      cell: (row) => <>{row.customer.fullName}</>,
    },
    {
      key: "room",
      header: "Room",
      cell: (row) => row.roomNumber,
    },
    {
      key: "checkout",
      header: "Check Out",
      cell: (row) => formatDate(row.checkOutDate, "dd MMM, yyyy"),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <BookingBadge value={row.status} />,
    },
  ];
  const [isVisible, setIsVisible] = useState(false);

  return (
    <DataTable
      title="Today's Departures"
      description="Guests scheduled to check out today"
      data={TODAYS_DEPARTURES}
      columns={columns}
      showSearch={false}
      showPagination={false}
      onRowClick={() => setIsVisible(true)}
      renderActions={(row) =>
        isVisible && (
          <BookingDetailsSheet
            onOpenChange={() => setIsVisible(false)}
            open={isVisible}
            bookingId={row.booking.id}
          />
        )
      }
    />
  );
}

export function ReceptionistDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STAFF_STAT.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DonutChart
          data={ROOM_STATUS}
          title="Room Availability"
          description="Current room availability"
          centerLabel="Total"
        />
        <StatusBarChart
          data={BOOKING_STATUS}
          title="Today's Booking"
          description="Current booking distribution"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TodaysArrivals />
        <TodaysDepartures />
      </div>
    </>
  );
}
