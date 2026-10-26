import { formatDate } from "date-fns";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  IssuePriorityBadge,
  IssueStatusBadge,
} from "@/components/common/EnumBadges";
import { useListParams } from "@/hooks/useListParams";

import { useIssues } from "../hooks/useIssues";
import type { IssueItem } from "../issues.types";

import { IssuesStats } from "./IssuesStats";

const issueCategory = [
  "PLUMBING",
  "ELECTRICAL",
  "HVAC",
  "FURNITURE",
  "APPLIANCE",
  "INTERNET",
  "BATHROOM",
  "DOOR_LOCK",
  "LIGHTING",
  "OTHER",
];

const issuePriority = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const issueStatus = [
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "RESOLVED",
  "CANCELLED",
];

export const filters = [
  {
    key: "category",
    label: "Category",
    options: issueCategory.map((value) => ({ value, label: value })),
  },
  {
    key: "priority",
    label: "Priority",
    options: issuePriority.map((value) => ({ value, label: value })),
  },
  {
    key: "status",
    label: "Status",
    options: issueStatus.map((value) => ({ value, label: value })),
  },
];

function IssueTable() {
  const { setFilter, params, setPage, setSearch } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useIssues(params);
  const columns: ColumnDef<IssueItem>[] = [
    {
      key: "reference",
      header: "Reference",
      cell: (row) => <>{row.reference}</>,
    },
    {
      key: "title",
      header: "Issue",
      cell: (row) => <>{row.title}</>,
    },
    {
      key: "category",
      header: "Category",
      cell: (row) => <>{row.category}</>,
    },
    {
      key: "room",
      header: "Room",
      cell: (row) => row.room?.roomNumber ?? "-",
    },
    {
      key: "reporter",
      header: "Reported By",
      cell: (row) => row.reporter?.fullName ?? "-",
    },
    {
      key: "assignee",
      header: "Assigned To",
      cell: (row) => row.assignee?.fullName ?? "-",
    },
    {
      key: "priority",
      header: "Priority",
      cell: (row) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <IssuePriorityBadge value={row.priority} />
        </span>
      ),
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
      key: "reportedAt",
      header: "Reported At",
      cell: (row) => formatDate(row.reportedAt, "dd MMM, yyyy"),
    },
  ];

  return (
    <DataTable
      title="Issues"
      description="View and manage issues, maintenance requests, and service requests."
      data={items}
      columns={columns}
      searchPlaceholder="Search issue..."
      emptyMessage="Issue not found"
      showPagination
      filters={filters}
      onFilterChange={(key, value) => {
        setFilter({ [key]: value });
      }}
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load issues. Please try again."
    />
  );
}

export function ManagementIssue() {
  return (
    <>
      <IssuesStats />
      <IssueTable />
    </>
  );
}
