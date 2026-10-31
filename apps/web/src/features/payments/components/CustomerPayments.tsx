import { formatDate } from "date-fns";
import { EllipsisVertical, Eye, RefreshCcw } from "lucide-react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  PaymentMethodBadge,
  PaymentStatusBadge,
} from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { StatGrid } from "@/components/common/Stat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useListParams } from "@/hooks/useListParams";
import { formatPrice } from "@/lib/format";

import { usePaymentsStats } from "../hooks/usePaymentsStats";
import { useRazorpayPayment } from "../hooks/useRazorpayPayment";
import { usePayments } from "../payments.crud";
import type { CustomerPayment, PaymentItem } from "../payments.types";

import { filters } from "./ManagementPayments";
import { PaymentDownload } from "./PaymentDownload";

function Stats() {
  const { data, isLoading, isError } = usePaymentsStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
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

  const { setSearch, setPage, params, setFilter } = useListParams();
  const { items, pagination, isLoading, isError, refetch } =
    usePayments(params);

  return (
    <DataTable
      title="Payments"
      description="Review transactions, payment methods, and collection status."
      data={items}
      columns={columns}
      searchPlaceholder="Search payment, booking, or customer..."
      searchableKeys={["paymentReference", "bookingReference", "customerName"]}
      filters={filters}
      onFilterChange={(key, value) => setFilter({ [key]: value })}
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
  const { startPayment, isPending } = useRazorpayPayment();
  const receipt: PaymentItem = {
    id: payment.id,
    bookingId: payment.bookingId,
    paymentReference: payment.paymentReference,
    transactionId: payment.transactionId,
    invoiceNumber: payment.invoiceNumber,
    bookingReference: payment.bookingReference,
    customerName: payment.customerName,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    paymentStatus: payment.status,
    paidAt: payment.paidAt,
    recordedByName: payment.recordedByName,
    createdAt: payment.createdAt,
  };

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
            <DropdownMenuItem
              disabled={isPending}
              onClick={() =>
                void startPayment(payment.bookingId, payment.bookingReference)
              }
            >
              <RefreshCcw />
              Retry
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <PaymentDownload payment={receipt} />
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
