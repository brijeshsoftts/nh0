import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/lib/format";

import type { Customer } from "../customers.types";
import { useCustomers } from "../hooks/useCustomers";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";

import { UpdateCustomerDialog } from "./UpdateCustomerDialog";
import { ViewCustomerDialog } from "./ViewCustomerDialog";

const columns: ColumnDef<Customer>[] = [
  {
    key: "name",
    header: "Customer",
    className: "min-w-48",
    cell: (customer) => (
      <div className="flex items-center gap-3">
        {customer.profile?.url ? (
          <img
            src={customer.profile.url}
            alt={customer.profile.altText ?? customer.name}
            className="size-9 rounded-full border object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground"
          >
            {customer.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("")}
          </span>
        )}
        <span className="font-medium">{customer.name}</span>
      </div>
    ),
  },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  {
    key: "totalBookings",
    header: "Bookings",
    align: "center",
    cell: (customer) => customer.totalBookings.toLocaleString(),
  },
  {
    key: "activeBooking",
    header: "Current booking",
    cell: (customer) => (
      <Badge variant={customer.activeBooking ? "secondary" : "outline"}>
        {customer.activeBooking ? "Active" : "None"}
      </Badge>
    ),
  },
  {
    key: "totalSpent",
    header: "Total spent",
    align: "right",
    cell: (customer) => formatPrice(customer.totalSpent),
  },
  {
    key: "lastLogin",
    header: "Last login",
    cell: (customer) => formatLastLogin(customer.lastLogin),
  },
  {
    key: "isActive",
    header: "Status",
    cell: (customer) => <StatusBadge value={customer.isActive} />,
  },
  {
    key: "actions",
    header: "Actions",
    cell: (customer) => <ActionDropdownMenu customer={customer} />,
  },
];

export function CustomerTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = useDebounce(search, 400);
  const { items, pagination, isLoading, isError, refetch } = useCustomers({
    search: query || undefined,
    page,
    limit: 10,
  });

  return (
    <div className="space-y-4">
      <DataTable
        title="Customers"
        description="Manage customer profiles and booking activity."
        data={items}
        columns={columns}
        searchPlaceholder="Search customers..."
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        onPageChange={setPage}
        pagination={pagination}
        errorMessage="Could not load customers. Please try again."
        emptyMessage="No customers match your search."
        showPagination
      />
    </div>
  );
}

function formatLastLogin(lastLogin?: string) {
  if (!lastLogin) return "Never";

  const date = new Date(lastLogin);
  if (Number.isNaN(date.getTime())) return lastLogin;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ActionDropdownMenu({ customer }: { customer: Customer }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteCustomer();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            aria-label={`Actions for ${customer.name}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsViewModal(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUpdateModal(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => handleDelete(customer.id)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUpdateModal && (
        <UpdateCustomerDialog
          open={isUpdateModal}
          onOpenChange={setIsUpdateModal}
          id={customer.id}
        />
      )}
      {isViewModal && (
        <ViewCustomerDialog
          open={isViewModal}
          onOpenChange={setIsViewModal}
          id={customer.id}
        />
      )}
    </>
  );
}
