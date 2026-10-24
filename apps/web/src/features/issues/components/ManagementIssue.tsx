import { formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  IssuePriorityBadge,
  IssueStatusBadge,
} from "@/components/common/EnumBadges";
import { StatGrid } from "@/components/common/Stat";
import { useDashboardStats } from "@/features/dashboard/dashboard.crud";
import { useDebounce } from "@/hooks/useDebounce";

import { useIssues } from "../hooks/useIssues";
import type { IssueItem } from "../issues.types";

function IssueStats() {
  const { data: stats, isLoading, isError } = useDashboardStats();
  return <StatGrid stats={stats} isLoading={isLoading} isError={isError} />;
}

function IssueTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const statusFilter = searchParams.get("status");
  const priorityFilter = searchParams.get("priority");
  const categoryFilter = searchParams.get("category");
  useEffect(() => setPage(1), [statusFilter, priorityFilter, categoryFilter]);

  const query = useDebounce(search, 400);

  const { items, pagination, isLoading, isError, refetch } = useIssues({
    search: query,
    page,
    limit: 10,
    status: statusFilter ?? undefined,
    priority: priorityFilter ?? undefined,
    category: categoryFilter ?? undefined,
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
      onSearchChange={(value) => {
        setSearch(value);
        updateParams({
          search: value || undefined,
          page: undefined,
        });
      }}
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
      <IssueStats />
      <IssueTable />
    </>
  );
}
