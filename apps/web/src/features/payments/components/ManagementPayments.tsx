import { formatDate } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

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
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/lib/format";

import { usePayments } from "../hooks/usePayments";
import { usePaymentsStats } from "../hooks/usePaymentsStats";
import type { PaymentItem } from "../payments.types";

import { ViewPaymentDetails } from "./ViewPaymentDetails";

function PaymentsKpi() {
  const { data, isLoading, isError, refetch } = usePaymentsStats();

  if (isLoading) {
    return <StatCardLoading />;
  }

  if (isError) {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  const query = useDebounce(search, 400);

  const { data, isLoading, isError, refetch } = usePayments({
    search: query,
    page,
    limit: 10,
  });

  function updateParams(updates: Record<string, string | undefined>) {
    const next = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }

    setSearchParams(next);
  }

  const columns: ColumnDef<PaymentItem>[] = [
    {
      key: "paymentReference",
      header: "Payment Reference",
      className: "min-w-44",
      cell: (payment) => (
        <div className="flex flex-col">
          <span className="font-medium">{payment.paymentReference}</span>
          <span className="text-xs text-muted-foreground">
            {payment.transactionId ?? "No transaction ID"}
          </span>
        </div>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      className: "min-w-40",
      cell: (payment) => (
        <span className="font-medium">{payment.customerName}</span>
      ),
    },
    {
      key: "invoiceNumber",
      header: "Invoice",
      cell: (payment) => payment.invoiceNumber,
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
      key: "paymentMethod",
      header: "Payment Method",
      cell: (payment) => <PaymentMethodBadge value={payment.paymentMethod} />,
    },
    {
      key: "paymentStatus",
      header: "Status",
      cell: (payment) => <PaymentStatusBadge value={payment.paymentStatus} />,
    },
    {
      key: "paidAt",
      header: "Paid At",
      cell: (payment) =>
        payment.paidAt ? formatDate(payment.paidAt, "dd MMM, yyyy") : "—",
    },
    {
      key: "createdAt",
      header: "Created At",
      cell: (payment) => formatDate(payment.createdAt, "dd MMM, yyyy"),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (payment) => <ActionDropdownMenu payment={payment} />,
    },
  ];

  return (
    <DataTable
      title="Payments"
      description="Review transactions, payment methods, and collection status."
      data={data?.data || []}
      columns={columns}
      searchPlaceholder="Search payment, booking, or customer..."
      searchableKeys={["paymentReference", "bookingReference", "customerName"]}
      onSearchChange={(value) => {
        setSearch(value);
        updateParams({
          search: value || undefined,
          page: undefined,
        });
      }}

      onPageChange={setPage}
      pagination={data?.meta}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load payments. Please try again."
      emptyMessage="No payments match your search or filters."
      showPagination
    />
  );
}

function ActionDropdownMenu({ payment }: { payment: PaymentItem }) {
  const [isViewModal, setIsViewModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            aria-label={`Actions for ${payment.paymentReference}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsViewModal(true)}>
            View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isViewModal && (
        <ViewPaymentDetails
          open={isViewModal}
          onOpenChange={setIsViewModal}
          payment={payment}
        />
      )}
    </>
  );
}

export function ManagementPayments() {
  return (
    <>
      <PaymentsKpi />
      <PaymentsTable />
    </>
  );
}
