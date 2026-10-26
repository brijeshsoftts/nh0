import { formatDate } from "date-fns";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { IssueStatusBadge } from "@/components/common/EnumBadges";
import { Header } from "@/components/common/Header";
import { useListParams } from "@/hooks/useListParams";

import { issueFilters } from "../issue-filters";
import { useIssues } from "../issues.crud";
import type { CustomerIssue } from "../issues.types";

import { IssueRowActions } from "./IssueRowActions";
import { CreateCustomerIssueDialog } from "./IssuesDialogs";
import { IssuesStats } from "./IssuesStats";

function IssuesTable() {
  const columns: ColumnDef<CustomerIssue>[] = [
    {
      key: "subject",
      header: "Subject",
      cell: (row) => <>{row.title}</>,
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
      cell: (row) => formatDate(row.reportedAt, "dd MMM, yyyy"),
    },
    {
      key: "priority",
      header: "Priority",
      cell: (row) => <>{row.priority}</>,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => <IssueRowActions issue={row} />,
    },
  ];

  const { setSearch, setPage, params, setFilter } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useIssues(params);

  return (
    <DataTable
      title="Issues"
      description="View and manage issues, maintenance requests, and service requests."
      data={items}
      columns={columns}
      showPagination
      filters={issueFilters}
      onFilterChange={(key, value) => {
        setFilter({ [key]: value });
      }}
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
