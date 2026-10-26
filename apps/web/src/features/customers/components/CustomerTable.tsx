import { EllipsisVertical, Eye, Pencil, Power, Trash2 } from "lucide-react";
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
import { useListParams } from "@/hooks/useListParams";
import { formatPrice } from "@/lib/format";

import type { Customer } from "../customers.types";
import { useCustomers } from "../hooks/useCustomers";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { useUpdateCustomerStatus } from "../hooks/useUpdateCustomer";

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
            className="size-9 rounded-none border object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-none bg-muted text-xs font-semibold text-muted-foreground"
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
      <Badge
        variant={customer.activeBooking ? "secondary" : "outline"}
        className="rounded-none"
      >
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
    cell: (customer) => (
      <span className="**:data-[slot=badge]:rounded-none">
        <StatusBadge value={customer.isActive} />
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    cell: (customer) => <ActionDropdownMenu customer={customer} />,
  },
];

export function CustomerTable() {
  const { setSearch, setPage, params, setFilter } = useListParams();
  const { items, pagination, isLoading, isError, refetch } =
    useCustomers(params);

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
        }}
        filters={[
          {
            key: "isActive",
            label: "Status",
            options: [
              {
                label: "Active",
                value: true,
              },
              {
                label: "Inactive",
                value: false,
              },
            ],
          },
        ]}
        onFilterChange={(key, value) => {
          setFilter({ [key]: value });
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
  const { handleDelete, isDeleting } = useDeleteCustomer(customer.id);
  const { handleToggleStatus, isPending: isStatusPending } =
    useUpdateCustomerStatus(customer.id, customer.isActive);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${customer.name}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
          <DropdownMenuItem onClick={() => setIsViewModal(true)}>
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleToggleStatus}
            disabled={isStatusPending || isDeleting}
          >
            <Power className="mr-2 size-4" />
            {customer.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsUpdateModal(true)}
            disabled={isDeleting || isStatusPending}
          >
            <Pencil className="mr-2 size-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => handleDelete()}
            disabled={isDeleting || isStatusPending}
          >
            <Trash2 className="mr-2 size-4" />
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
