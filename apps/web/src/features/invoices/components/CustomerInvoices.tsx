import { formatDate } from "date-fns";
import { CreditCard, Download, EllipsisVertical, Eye } from "lucide-react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { InvoiceBadge } from "@/components/common/EnumBadges";
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

import { useInvoices, useInvoicesStats } from "../invoices.crud";
import type { CustomerInvoice } from "../invoices.types";

function Stats() {
  const { data, isLoading, isError, refetch } = useInvoicesStats();

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

function InvoicesTable() {
  const columns: ColumnDef<CustomerInvoice>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      className: "min-w-36",
      cell: (invoice) => (
        <span className="font-medium">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: "invoiceDate",
      header: "Invoice Date",
      cell: (invoice) =>
        invoice.invoiceDate
          ? formatDate(invoice.invoiceDate, "dd MMM, yyyy")
          : "—",
    },
    {
      key: "bookingReference",
      header: "Booking Reference",
      className: "min-w-40",
      cell: (invoice) => (
        <span className="font-medium">{invoice.bookingReference}</span>
      ),
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      align: "right",
      cell: (invoice) => (
        <span className="font-semibold tabular-nums">
          {formatPrice(invoice.totalAmount)}
        </span>
      ),
    },
    {
      key: "balanceDue",
      header: "Balance Due",
      align: "right",
      cell: (invoice) => (
        <span
          className={`font-medium tabular-nums ${
            invoice.balanceDue > 0
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          {formatPrice(invoice.balanceDue)}
        </span>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      cell: (invoice) =>
        invoice.dueDate ? formatDate(invoice.dueDate, "dd MMM, yyyy") : "—",
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
      key: "actions",
      header: "Actions",
      cell: (invoice) => <ActionDropdownMenu invoice={invoice} />,
    },
  ];

  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useInvoices({
    search: searchInput,
    page: params.page || 1,
    limit: 10,
  });

  return (
    <DataTable
      title="Invoices"
      description="Review invoices"
      data={items}
      columns={columns}
      searchPlaceholder="Search invoice, booking, or customer..."
      searchableKeys={["invoiceNumber", "bookingReference", "customerName"]}
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load invoices. Please try again."
      emptyMessage="No invoices match your search or filters."
      showPagination
    />
  );
}

function ActionDropdownMenu({ invoice }: { invoice: CustomerInvoice }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${invoice.id}`}
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

          <DropdownMenuItem>
            <CreditCard />
            Pay
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function CustomerInvoices() {
  return (
    <>
      <Stats />
      <InvoicesTable />
    </>
  );
}
