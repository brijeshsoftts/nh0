import { formatDate } from "date-fns";
import { Download, EllipsisVertical, Eye, RefreshCcw } from "lucide-react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  PaymentMethodBadge,
  PaymentStatusBadge,
} from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useListParams } from "@/hooks/useListParams";
import { formatPrice } from "@/lib/format";

import { usePayments, usePaymentsStats } from "../payments.crud";
import type { CustomerPayment } from "../payments.types";

function Stats() {
  const { data, isLoading, isError, refetch } = usePaymentsStats();

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

function PaymentsTable() {
  const columns: ColumnDef<CustomerPayment>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      cell: (payment) => (
        <span className="font-medium">{payment.invoiceNumber}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (payment) =>
        payment.date ? formatDate(payment.date, "dd MMM, yyyy") : "—",
    },
    {
      key: "paymentMethod",
      header: "Payment Method",
      cell: (payment) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <PaymentMethodBadge value={payment.paymentMethod} />
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      cell: (payment) => (
        <span className="font-semibold tabular-nums">
          {formatPrice(payment.amount)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (payment) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <PaymentStatusBadge value={payment.status} />
        </span>
      ),
    },
    {
      key: "transactionId",
      header: "Transaction ID",
      className: "min-w-44",
      cell: (payment) => (
        <span className="text-sm text-muted-foreground">
          {payment.transactionId || "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (payment) => <ActionDropdownMenu payment={payment} />,
    },
  ];

  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = usePayments({
    search: searchInput,
    page: params.page || 1,
    limit: 10,
  });

  return (
    <DataTable
      title="Payments"
      description="Review transactions, payment methods, and collection status."
      data={items}
      columns={columns}
      searchPlaceholder="Search payment, booking, or customer..."
      searchableKeys={["paymentReference", "bookingReference", "customerName"]}
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load payments. Please try again."
      emptyMessage="No payments match your search or filters."
      showPagination
    />
  );
}

function ActionDropdownMenu({ payment }: { payment: CustomerPayment }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${payment.id}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
          <DropdownMenuItem>
            <Eye />
            View
          </DropdownMenuItem>
          {payment.status === "FAILED" && (
            <DropdownMenuItem>
              <RefreshCcw />
              Retry
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Download />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function CustomerPayments() {
  return (
    <>
      <Stats />
      <PaymentsTable />
    </>
  );
}
