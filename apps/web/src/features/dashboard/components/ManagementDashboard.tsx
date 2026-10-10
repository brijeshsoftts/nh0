import { formatDate } from "date-fns/format";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  BookingBadge,
  PaymentStatusBadge,
} from "@/components/common/EnumBadges";
import { BookingDetailsSheet } from "@/features/bookings/components/BookingDetailsSheet";

import type { ArrivalItem, DepartureItem, Stays } from "../dashboard.types";
import { useDashbaordRevenueTrend } from "../hooks/useDashbaordRevenueTrend";
import { useDashbaordStays } from "../hooks/useDashbaordStays";
import { useDashbaordBookingStatus } from "../hooks/useDashboardBookingStatus";

import { DashboardStats } from "./DashboardStats";
import { DonutChart } from "./DonutChart";
import { type Range, TrendChart } from "./TrendChart";

function Arrivals({ arrivals }: { arrivals: Stays["arrivals"] }) {
  const columns: ColumnDef<ArrivalItem>[] = [
    {
      key: "booking",
      header: "Booking",
      cell: (row) => <>{row.bookingReference}</>,
    },
    {
      key: "customer",
      header: "Customer",
      cell: (row) => <>{row.customerName}</>,
    },
    {
      key: "room",
      header: "Room",
      cell: (row) => row.roomNumber ?? "-",
    },
    {
      key: "checkin",
      header: "Check In",
      cell: (row) => formatDate(row.checkIn, "dd MMM, yyyy"),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <BookingBadge value={row.bookingStatus} />,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <DataTable
        title="Today's Arrivals"
        description={`Guests scheduled to check in today - ${arrivals.total} total`}
        data={arrivals.items}
        columns={columns}
        showSearch={false}
        showPagination={false}
        onRowClick={() => setIsVisible(true)}
        renderActions={(row) =>
          isVisible && (
            <BookingDetailsSheet
              onOpenChange={() => setIsVisible(false)}
              open={isVisible}
              bookingId={row.bookingId}
            />
          )
        }
      />
    </>
  );
}

function Departures({ departures }: { departures: Stays["departures"] }) {
  const columns: ColumnDef<DepartureItem>[] = [
    {
      key: "booking",
      header: "Booking",
      cell: (row) => <>{row.bookingReference}</>,
    },
    {
      key: "customer",
      header: "Customer",
      cell: (row) => <>{row.customerName}</>,
    },
    {
      key: "room",
      header: "Room",
      cell: (row) => row.roomNumber ?? "-",
    },
    {
      key: "checkout",
      header: "Check Out",
      cell: (row) => formatDate(row.checkOut, "dd MMM, yyyy"),
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      cell: (row) => <PaymentStatusBadge value={row.paymentStatus} />,
    },
    {
      key: "outstandingBalance",
      header: "Outstanding Balance",
      cell: (row) => row.outstandingBalance.toLocaleString(),
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  return (
    <DataTable
      title="Today's departures"
      description={`Guests scheduled to check out today - ${departures.total} total`}
      data={departures.items}
      columns={columns}
      showSearch={false}
      showPagination={false}
      onRowClick={() => setIsVisible(true)}
      renderActions={(row) =>
        isVisible && (
          <BookingDetailsSheet
            onOpenChange={() => setIsVisible(false)}
            open={isVisible}
            bookingId={row.bookingId}
          />
        )
      }
    />
  );
}

function RevenueTrend() {
  const [range, setRange] = useState<Range>("7d");
  const { data, isLoading, isError } = useDashbaordRevenueTrend(range);

  if (isLoading) {
    return <>Loading</>;
  }
  if (isError || !data) {
    return <>Error</>;
  }

  return (
    <TrendChart
      data={data}
      range={range}
      onRangeChange={setRange}
      title="Revenue trend"
      description="Successful payments collected per day."
      options={[
        {
          label: "7 days",
          value: "7d",
        },
        {
          label: "14 days",
          value: "14d",
        },
        {
          label: "28 days",
          value: "28d",
        },
      ]}
    />
  );
}

function BookingStatus() {
  const { data, isLoading, isError } = useDashbaordBookingStatus();

  if (isLoading) {
    return <>Loading</>;
  }
  if (isError || !data) {
    return <>Error</>;
  }

  return (
    <DonutChart
      data={data}
      title="Booking status distribution"
      description="Booking counts grouped by current status."
      centerLabel="Total"
    />
  );
}

function Stays() {
  const { data, isLoading, isError } = useDashbaordStays();

  if (isLoading) {
    return <>Loading</>;
  }
  if (isError || !data) {
    return <>Error</>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Arrivals arrivals={data.arrivals} />
      <Departures departures={data.departures} />
    </div>
  );
}

export function ManagementDashboard() {
  return (
    <>
      <DashboardStats />
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <RevenueTrend />
        <BookingStatus />
      </div>
      <Stays />
    </>
  );
}
