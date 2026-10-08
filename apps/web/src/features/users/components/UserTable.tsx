import { EllipsisVertical, Eye, Pencil, Power, Trash2 } from "lucide-react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { EnumBadge, StatusBadge } from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";

import { useUpdateUserStatus } from "../hooks/useUpdateUser";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../users.types";

import { UpdateUserDialog } from "./UpdateUserDialog";

export function UserTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);
  const { items, pagination, isLoading, isError, refetch } = useUsers({
    search: debouncedSearch || undefined,
    page,
    limit: 10,
  });

  const columns: ColumnDef<User>[] = [
    {
      key: "fullName",
      header: "User",
      cell: (user) => (
        <div className="flex items-center gap-3">
          {user.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt={user.avatar.altText ?? user.fullName}
              className="size-9 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="grid size-9 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              {user.fullName
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join("") || "U"}
            </span>
          )}
          <span className="font-medium text-foreground">{user.fullName}</span>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "role",
      header: "Role",
      cell: (user) => <EnumBadge value={user.role} />,
    },

    {
      key: "isActive",
      header: "Status",
      cell: (user) => <StatusBadge value={user.isActive} />,
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      cell: (user) => <ActionDropdownMenu user={user} />,
    },
  ];

  return (
    <>
      <DataTable
        title="Users"
        description="Manage user accounts, roles, and team assignments."
        data={items}
        pagination={pagination}
        columns={columns}
        searchPlaceholder="Search users..."
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onPageChange={setPage}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        errorMessage="Could not load users. Please try again."
        emptyMessage="No users match your search."
      />
    </>
  );
}

function ActionDropdownMenu({ user }: { user: User }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { handleToggleStatus, isPending } = useUpdateUserStatus(
    user.id,
    user.isActive
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Actions for ${user.fullName}`}
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleToggleStatus} disabled={isPending}>
            <Power className="mr-2 size-4" />
            {user.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
            <Pencil className="mr-2 size-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUpdateOpen && (
        <UpdateUserDialog
          user={user}
          open={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
        />
      )}
    </>
  );
}
