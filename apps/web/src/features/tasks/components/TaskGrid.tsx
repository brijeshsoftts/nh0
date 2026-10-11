import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

import { useTasks } from "../hooks/useTasks";

import { TaskCard, TaskCardSkeleton } from "./TaskCard";

function parsePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function TaskGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const page = parsePage(searchParams.get("page"));
  const query = useDebounce(search.trim(), 400);

  const { items, pagination, isLoading, isError, refetch } = useTasks({
    search: query || undefined,
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

    setSearchParams(next, { replace: true });
  }

  function handleSearchChange(value: string) {
    updateParams({ search: value || undefined, page: undefined });
  }

  function handlePageChange(nextPage: number) {
    updateParams({ page: String(nextPage) });
  }

  return (
    <div className="w-full overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm">
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
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="h-9 pl-9 text-sm"
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
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          {query ? "No tasks match your search." : "No tasks found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {items.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <Pagination
        pagination={pagination ? { ...pagination, page } : undefined}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
