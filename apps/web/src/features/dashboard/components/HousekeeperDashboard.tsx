import { useState } from "react";

import { type ColumnDef,DataTable } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
  StatusBadge,
  TaskStatusBadge,
  TaskTypeBadge,
} from "@/components/common/EnumBadges";
import { StatCard } from "@/components/common/StatCard";
import type { HousekeeperRoom } from "@/features/rooms/rooms.types";
import { TaskDetailsSheet } from "@/features/tasks/components/TaskDetailsSheet";

import {
  HOUSEKEEPER_ROOMS,
  HOUSEKEEPER_STAT,
  TASK_TYPES_STATUS,
  TASKS_STATUS,
} from "../dashboard.mock";

import { DonutChart } from "./DonutChart";
import { StatusBarChart } from "./StatusBarChart";

function TodaysTasks() {
  const columns: ColumnDef<HousekeeperRoom>[] = [
    {
      key: "name",
      header: "Room",
      cell: (row) => (
        <div>
          <p>{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.roomNumber}</p>
        </div>
      ),
    },
    {
      key: "floor",
      header: "Floor",
      cell: (row) => row.floor,
    },
    {
      key: "occupancy",
      header: "Occupancy",
      cell: (row) => <OccupancyBadge value={row.occupancyStatus} />,
    },
    {
      key: "housekeeping",
      header: "Housekeeping",
      cell: (row) => <HousekeepingBadge value={row.housekeepingStatus} />,
    },
    {
      key: "isActive",
      header: "Is Active",
      cell: (row) => <StatusBadge value={row.isActive} />,
    },
    {
      key: "taskType",
      header: "Task Type",
      cell: (row) => <TaskTypeBadge value={row.taskType} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <TaskStatusBadge value={row.status} />,
    },
  ];
  const [isVisible, setIsVisible] = useState(false);

  return (
    <DataTable
      title="Today's Tasks"
      description="Guests scheduled to check out today"
      data={HOUSEKEEPER_ROOMS}
      columns={columns}
      showSearch={false}
      showPagination={false}
      onRowClick={() => setIsVisible(true)}
      renderActions={(row) =>
        isVisible && (
          <TaskDetailsSheet
            open={isVisible}
            onOpenChange={() => setIsVisible(false)}
            taskId={row.taskId}
          />
        )
      }
    />
  );
}

export function HousekeeperDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HOUSEKEEPER_STAT.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DonutChart
          data={TASKS_STATUS}
          title="Tasks Status"
          description="Current task status"
          centerLabel="Total"
        />
        <StatusBarChart
          data={TASK_TYPES_STATUS}
          title="Tasks type status"
          description="Current task type status"
        />
      </div>
      <TodaysTasks />
    </>
  );
}
