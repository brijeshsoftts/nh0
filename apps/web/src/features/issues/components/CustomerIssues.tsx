import { formatDate } from "date-fns";
import { EllipsisVertical, Eye } from "lucide-react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { IssueStatusBadge } from "@/components/common/EnumBadges";
import { Header } from "@/components/common/Header";
import { IconBtn } from "@/components/common/IconBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useListParams } from "@/hooks/useListParams";

import { useIssues } from "../issues.crud";
import type { CustomerIssue } from "../issues.types";

import { CreateCustomerIssueDialog } from "./IssuesDialogs";
import { IssuesStats } from "./IssuesStats";

function IssuesTable() {
  const columns: ColumnDef<CustomerIssue>[] = [
    {
      key: "subject",
      header: "Subject",
      cell: (row) => <>{row.subject}</>,
    },
    {
      key: "category",
      header: "Category",
      cell: (row) => <>{row.category}</>,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <IssueStatusBadge value={row.status} />
        </span>
      ),
    },
    {
      key: "reportedOn",
      header: "Reported On",
      cell: (row) => formatDate(row.reportedOn, "dd MMM, yyyy"),
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
      cell: (row) => formatDate(row.lastUpdated, "dd MMM, yyyy"),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => <ActionDropdownMenu issue={row} />,
    },
  ];

  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useIssues({
    search: searchInput,
    page: params.page || 1,
    limit: 10,
  });

  return (
    <DataTable
      title="Issues"
      description="View and manage issues, maintenance requests, and service requests."
      data={items}
      columns={columns}
      showPagination
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      onActionClick={() => {}}
      showSearch
      searchPlaceholder="Search issue..."
      emptyMessage="Issue not found"
      errorMessage="Could not load issues. Please try again."
    />
  );
}

function ActionDropdownMenu({ issue }: { issue: CustomerIssue }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${issue.id}`}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function CustomerIssues() {
  return (
    <>
      <Header
        title="Issues"
        description="View and manage issues, maintenance requests, and service requests."
        rightContent={<CreateCustomerIssueDialog />}
      />

      <IssuesStats />
      <IssuesTable />
    </>
  );
}
