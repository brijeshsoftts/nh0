import { formatDate } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { InvoiceBadge } from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { StatGrid } from "@/components/common/Stat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/lib/format";

import { useInvoices } from "../hooks/useInvoices";
import { useInvoicesStats } from "../hooks/useInvoicesStats";
import type { InvoiceItem } from "../invoices.types";

import { InvoiceDownload } from "./InvoiceDownload";
import { ViewInvoiceDetails } from "./ViewInvoiceDetails";

function InvoicesStats() {
  const { data, isLoading, isError } = useInvoicesStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}

function InvoicesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const statusFilter = searchParams.get("status");
  useEffect(() => setPage(1), [statusFilter]);

  const query = useDebounce(search, 400);

  const { data, isLoading, isError, refetch } = useInvoices({
    search: query,
    page,
    limit: 10,
    status: statusFilter ?? undefined,
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

  const columns: ColumnDef<InvoiceItem>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice",
      className: "min-w-44",
      cell: (invoice) => (
        <span className="font-medium">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      className: "min-w-40",
      cell: (invoice) => (
        <span className="font-medium">{invoice.customerName}</span>
      ),
    },
    {
      key: "bookingReference",
      header: "Booking Reference",
      cell: (invoice) => invoice.bookingReference,
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      align: "right",
      cell: (invoice) => (
        <span className="tabular-nums">{formatPrice(invoice.totalAmount)}</span>
      ),
    },
    {
      key: "paidAmount",
      header: "Paid",
      align: "right",
      cell: (invoice) => (
        <span className="font-medium text-green-600 tabular-nums">
          {formatPrice(invoice.paidAmount)}
        </span>
      ),
    },
    {
      key: "balanceDue",
      header: "Balance Due",
      align: "right",
      cell: (invoice) => (
        <span
          className={
            invoice.balanceDue > 0
              ? "font-medium text-destructive tabular-nums"
              : "text-muted-foreground tabular-nums"
          }
        >
          {formatPrice(invoice.balanceDue)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (invoice) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <InvoiceBadge value={invoice.status} />
        </span>
      ),
    },
    {
      key: "issuedAt",
      header: "Issued At",
      cell: (invoice) => formatDate(invoice.issuedAt, "dd MMM, yyyy"),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (invoice) => <ActionDropdownMenu invoice={invoice} />,
    },
  ];

  return (
    <DataTable
      title="Invoices"
      description="Review transactions, invoice methods, and collection status."
      data={data?.data || []}
      columns={columns}
      searchPlaceholder="Search invoice, booking, or customer..."
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
      errorMessage="Could not load invoices. Please try again."
      emptyMessage="No invoices match your search or filters."
      showPagination
    />
  );
}

function ActionDropdownMenu({ invoice }: { invoice: InvoiceItem }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const { user } = useAuth();
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
            aria-label={`Actions for ${invoice.invoiceNumber}`}
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
          {isActiveDownload && (
            <DropdownMenuItem>
              <InvoiceDownload invoice={invoice} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isViewModal && (
        <ViewInvoiceDetails
          id={invoice.id}
          open={isViewModal}
          onOpenChange={setIsViewModal}
        />
      )}
    </>
  );
}

export function ManagementInvoices() {
  return (
    <>
      <InvoicesStats />
      <InvoicesTable />
    </>
  );
}
