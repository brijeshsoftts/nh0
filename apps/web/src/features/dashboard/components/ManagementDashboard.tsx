import { formatDate } from "date-fns/format";
import { useState } from "react";

import { type ColumnDef,DataTable } from "@/components/common/DataTable";
import { BookingBadge } from "@/components/common/EnumBadges";
import { StatCard } from "@/components/common/StatCard";
import { BookingDetailsSheet } from "@/features/bookings/components/BookingDetailsSheet";

import {
  BOOKING_STATUS,
  MANAGEMENT_STAT,
  REVENUE_DATA,
  ROOM_STATUS,
  TODAYS_ARRIVALS,
  TODAYS_DEPARTURES,
} from "../dashboard.mock";
import type { TodaysArrival, TodaysDeparture } from "../dashboard.types";

import { DonutChart } from "./DonutChart";
import { StatusBarChart } from "./StatusBarChart";
import { TrendChart } from "./TrendChart";

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

export function ManagementDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MANAGEMENT_STAT.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>

      <TrendChart
        data={REVENUE_DATA}
        range={"7d"}
        title="Revenue Trend"
        description="Revenue from completed payments"
        options={[
          {
            label: "7 days",
            value: "7d",
          },
          {
            label: "30 days",
            value: "30d",
          },
          {
            label: "12 months",
            value: "12m",
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusBarChart
          data={BOOKING_STATUS}
          title="Booking Status"
          description="Current booking distribution"
        />
        <DonutChart
          data={ROOM_STATUS}
          title="Room Status"
          description="Current room availability"
          centerLabel="Total"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TodaysArrivals />
        <TodaysDepartures />
      </div>
    </>
  );
}
