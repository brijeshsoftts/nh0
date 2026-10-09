import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import { getInitials } from "@/lib/format";

import { useDeleteStaff } from "../hooks/useDeleteStaff";
import { useStaffs } from "../hooks/useStaffs";
import type { StaffItem } from "../staff.types";

import { ViewStaffDetails } from "./ViewStaffDetails";

const columns: ColumnDef<StaffItem>[] = [
  {
    key: "fullName",
    header: "Staff Member",
    cell: (staff) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{getInitials(staff.fullName)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium">{staff.fullName}</span>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",

    cell: (staff) => (
      <span className="text-muted-foreground">{staff.email}</span>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    cell: (staff) => staff.phone || "—",
  },
  {
    key: "category",
    header: "Category",
  },

  {
    key: "isActive",
    header: "Status",
    cell: (staff) => <StatusBadge value={staff.isActive} />,
  },

  {
    key: "actions",
    header: "Actions",
    cell: (staff) => <ActionDropdownMenu staff={staff} />,
  },
];

export function StaffTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  const query = useDebounce(search, 400);

  const { data, isLoading, isError, refetch } = useStaffs({
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

  return (
    <DataTable
      title="Staff"
      description="Manage and view staff information."
      data={data?.data || []}
      columns={columns}
      searchPlaceholder="Search staff..."
      searchableKeys={["fullName", "staffId", "email"]}
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
      errorMessage="Could not load staff. Please try again."
      emptyMessage="No staff match your search or filters."
      showPagination
    />
  );
}

function ActionDropdownMenu({ staff }: { staff: StaffItem }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteStaff(staff.id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            aria-label={`Actions for ${staff.fullName}`}
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
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {isUpdateModal && (
        <UpdateCustomerDialog
          open={isUpdateModal}
          onOpenChange={setIsUpdateModal}
          id={staff.id}
        />
      )}
      */}
      {isViewModal && (
        <ViewStaffDetails
          open={isViewModal}
          onOpenChange={setIsViewModal}
          id={staff.id}
        />
      )}
    </>
  );
}
