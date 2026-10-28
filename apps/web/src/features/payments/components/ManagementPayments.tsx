import { formatDate } from "date-fns";
import { Banknote, EllipsisVertical } from "lucide-react";
import { useState } from "react";

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
import { useAuth } from "@/hooks/useAuth";
import { useListParams } from "@/hooks/useListParams";
import { formatPrice } from "@/lib/format";
import { CollectCashDialog } from "./CollectCashDialog";

import { usePayments } from "../hooks/usePayments";
import { usePaymentsStats } from "../hooks/usePaymentsStats";
import type { PaymentItem } from "../payments.types";

import { PaymentDownload } from "./PaymentDownload";
import { ViewPaymentDetails } from "./ViewPaymentDetails";

function PaymentsKpi() {
  const { data, isLoading, isError } = usePaymentsStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}

const paymentMethod = ["CASH", "ONLINE"];

const paymentStatus = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];

export const filters = [
  {
    key: "paymentMethod",
    label: "Method",
    options: paymentMethod.map((value) => ({ value, label: value })),
  },
  {
    key: "paymentStatus",
    label: "Status",
    options: paymentStatus.map((value) => ({ value, label: value })),
  },
];

function PaymentsTable() {
  const { setSearch, setPage, params, setFilter } = useListParams();
  const { data, isLoading, isError, refetch } = usePayments(params);

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
      cell: (payment) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <PaymentMethodBadge value={payment.paymentMethod} />
        </span>
      ),
    },
    {
      key: "paymentStatus",
      header: "Status",
      cell: (payment) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <PaymentStatusBadge value={payment.paymentStatus} />
        </span>
      ),
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
    <>
      <DataTable
        title="Payments"
        description="Review transactions, payment methods, and collection status."
        data={data?.data || []}
        columns={columns}
        searchPlaceholder="Search payment, booking, or customer..."
        searchableKeys={[
          "paymentReference",
          "bookingReference",
          "customerName",
        ]}
        onSearchChange={setSearch}
        onFilterChange={(key, value) => setFilter({ [key]: value })}
        onPageChange={setPage}
        filters={filters}
        pagination={data?.meta}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        errorMessage="Could not load payments. Please try again."
        emptyMessage="No payments match your search or filters."
        showPagination
      />
    </>
  );
}

function ActionDropdownMenu({ payment }: { payment: PaymentItem }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [isCashDialogOpen, setIsCashDialogOpen] = useState(false);
  const { user } = useAuth();
  const canCollectCash =
    (user?.role === "ADMIN" ||
      user?.role === "MANAGER" ||
      (user?.role === "STAFF" && user.category === "RECEPTIONIST")) &&
    payment.paymentMethod === "CASH" &&
    payment.paymentStatus !== "FAILED" &&
    payment.paymentStatus !== "REFUNDED";
  const isActiveDownload =
    user?.role === "ADMIN" ||
    user?.role === "MANAGER" ||
    (user?.role === "STAFF" && user?.category !== "RECEPTIONIST");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${payment.paymentReference}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
          <DropdownMenuItem onClick={() => setIsViewModal(true)}>
            View
          </DropdownMenuItem>
          {canCollectCash && (
            <DropdownMenuItem onClick={() => setIsCashDialogOpen(true)}>
              <Banknote aria-hidden="true" />
              Collect Cash
            </DropdownMenuItem>
          )}

          {isActiveDownload && (
            <DropdownMenuItem>
              <PaymentDownload payment={payment} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isViewModal && (
        <ViewPaymentDetails
          open={isViewModal}
          onOpenChange={setIsViewModal}
          payment={payment}
        />
      )}
      {isCashDialogOpen && (
        <CollectCashDialog
          bookingId={payment.bookingId}
          open={isCashDialogOpen}
          onOpenChange={setIsCashDialogOpen}
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
