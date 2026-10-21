import { Search } from "lucide-react";

import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useListParams } from "@/hooks/useListParams";

import { useTasks } from "../hooks/useTasks";

import { TaskCard, TaskCardSkeleton } from "./TaskCard";

export function TaskGrid() {
  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useTasks(params);

  return (
    <div className="w-full overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-border p-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Tasks</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Manage and view tasks. {items.length}
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={searchInput}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="h-9 rounded-none pl-9 text-sm"
          />
        </div>
      </div>

      {isError ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Tasks could not be loaded.
          </p>
          <Button
            type="button"
            variant="outline"
            className="rounded-none"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 p-4 **:rounded-none sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {searchInput ? "No tasks match your search." : "No tasks found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-4 **:rounded-none sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {items.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <div className="**:rounded-none">
        <Pagination
          pagination={
            pagination ? { ...pagination, page: params.page || 1 } : undefined
          }
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
