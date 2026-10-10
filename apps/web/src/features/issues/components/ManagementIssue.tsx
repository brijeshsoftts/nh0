import { formatDate } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  IssuePriorityBadge,
  IssueStatusBadge,
} from "@/components/common/EnumBadges";
import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";
import { useDashbaordStats } from "@/features/dashboard/hooks/useDashbaordStats";
import { useDebounce } from "@/hooks/useDebounce";

import { useIssues } from "../hooks/useIssues";
import type { IssueItem } from "../issues.types";

function IssueStats() {
  const { data: stats, isLoading, isError, refetch } = useDashbaordStats();

  if (isLoading) {
    return <StatCardLoading />;
  }

  if (isError) {
    return <StatCardError refetch={refetch} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats?.map((s) => (
        <StatCard key={s.id} {...s} />
      ))}
    </div>
  );
}

function IssueTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  const query = useDebounce(search, 400);

  const { items, pagination, isLoading, isError, refetch } = useIssues({
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
      cell: (row) => <IssuePriorityBadge value={row.priority} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <IssueStatusBadge value={row.status} />,
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
