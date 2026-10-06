import { cn } from "cn";
import { AlertCircle, Inbox, Search } from "lucide-react";
import * as React from "react";

import type { Pagination } from "@/types/api.types";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface ColumnDef<T> {
  key: string;
  header: string;
  className?: string;
  align?: "left" | "right" | "center";
  cell?: (item: T) => React.ReactNode;
  accessorFn?: (item: T) => string;
}

export interface FilterOption {
  label: string;
  value: string | boolean | number;
}

export interface DynamicFilter {
  key: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
}

export interface DataTable<T> {
  title?: string;
  description?: string;
  data: T[];
  pagination?: Pagination;
  columns: ColumnDef<T>[];
  filters?: DynamicFilter[];
  searchableKeys?: (keyof T | string)[];
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
  onActionClick?: (item: T) => void;
  renderActions?: (item: T) => React.ReactNode;
  refetch?: () => void;
  showSearch?: boolean;
  showPagination?: boolean;
  onFilterChange?: (
    key: string,
    value: string,
    allFilters: Record<string, string>
  ) => void;
  onSearchChange?: (query: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  title,
  description,
  data = [],
  columns,
  searchPlaceholder = "Search...",
  defaultPageSize = 10,
  onPageChange,
  showSearch = true,
  showPagination = true,
  pagination,
  onSearchChange,
  isError,
  isLoading,
  errorMessage = "Something went wrong",
  emptyMessage = "No data found",
  filters = [],
  onFilterChange,
  refetch,
  onRowClick,
  renderActions,
}: DataTable<T>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string>
  >({});
  const [localPage, setLocalPage] = React.useState(1);
  const [pageSize] = React.useState(defaultPageSize);
  const [selectRow, setSelectRow] = React.useState<T | null>(null);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  const handlePage = (newPage: number) => {
    setLocalPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  // filter
  const handleFilterSelect = (key: string, value: string | null) => {
    if (!value) return;
    const updatedValue = value === "All" ? "" : value;
    const updated = {
      ...filterValues,
      [key]: updatedValue,
    };

    setFilterValues(updated);
    setLocalPage(1);

    // Pass the specific key & value along with all filter values to parent
    onFilterChange?.(key, updatedValue, updated);
  };

  // Pagination Math
  const totalRecords = pagination?.total || 0;
  const totalPages = pagination?.total
    ? Math.ceil(pagination?.total / pagination.page)
    : 1;

  const currentPage = pagination?.page || localPage;
  const startIndex = (currentPage - 1) * pageSize;
  const startRecord = totalRecords === 0 ? 0 : startIndex + 1;
  const endRecord = Math.min(
    startIndex + (pagination?.page || 0),
    totalRecords
  );

  const handleRowClick = (row: T) => {
    onRowClick?.(row);
    setSelectRow(row);
  };

  return (
    <>
      <div className="grid w-full overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm">
        {/* Header Controls */}
        <div className="flex flex-col justify-between gap-4 border-b border-border p-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            )}
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description ? description : `${data?.length} records`}
            </p>
          </div>

          <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2.5 sm:flex-nowrap">
            {/* Search Input */}
            {showSearch && (
              <div className="relative min-w-45 flex-1 shrink-0 sm:w-64">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 text-xs whitespace-nowrap text-foreground transition-colors focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>
            )}

            {/* Filters */}
            {filters.length > 0 && (
              <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                {filters.map((filter) => (
                  <Select
                    key={filter.key}
                    value={filterValues[filter.key] || "All"}
                    onValueChange={(value) =>
                      handleFilterSelect(filter.key, value)
                    }
                  >
                    <SelectTrigger className="h-10 min-w-35 border-border/70 bg-background shadow-none transition-colors hover:bg-muted/50">
                      <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"All"}>All {filter.label}</SelectItem>
                      {filter.options.map((option) => (
                        <SelectItem
                          key={option.value.toString()}
                          value={option.value.toString()}
                        >
                          {option.label.charAt(0).toUpperCase() +
                            option.label.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-full text-left text-xs whitespace-nowrap">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {columns.map((col, idx) => (
                    <TableHead
                      key={idx}
                      className={cn(
                        "px-4 py-3 text-[11px] font-semibold tracking-wider whitespace-nowrap text-muted-foreground uppercase",
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                            ? "text-center"
                            : "text-left",
                        col.className
                      )}
                    >
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y">
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="mx-auto flex h-40 items-center justify-center">
                        <Spinner className="size-8" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex h-40 flex-col items-center justify-center gap-2 text-destructive">
                        <AlertCircle className="h-6 w-6" />
                        <p className="mt-2 text-sm font-medium">
                          {errorMessage}
                        </p>
                        <Button
                          type="button"
                          onClick={refetch}
                          variant="destructive"
                        >
                          Try Again
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <Inbox className="h-6 w-6" />
                        <p className="text-sm font-medium">{emptyMessage}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className={`border-b border-border/65 transition-colors hover:bg-muted/50 ${onRowClick && "cursor-pointer"} `}
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((col, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className={cn(
                            "px-4 py-4 text-sm",
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                                ? "text-center"
                                : "text-left",
                            col.className
                          )}
                        >
                          {col.cell
                            ? col.cell(row)
                            : String(
                                (row as Record<string, unknown>)[col.key] ?? ""
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination Footer */}
        {showPagination && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-4 text-xs sm:flex-row">
            <div className="text-muted-foreground">
              Showing {startRecord}–{endRecord} of {totalRecords} records
            </div>

            <div className="flex items-center gap-2">
              {/* Previous Page Button */}
              <button
                type="button"
                onClick={() => handlePage(Math.max(currentPage - 1, 1))}
                disabled={currentPage <= 1}
                className="rounded-md border border-input bg-background px-3 py-1 text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .reduce<(number | string)[]>((acc, page, index, arr) => {
                    if (index > 0 && page - (arr[index - 1] as number) > 1) {
                      acc.push("...");
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((page, idx) =>
                    typeof page === "number" ? (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePage(page)}
                        className={`flex h-7 w-7 items-center justify-center rounded-md font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "border border-input bg-background text-foreground hover:bg-accent"
                        }`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-1 text-muted-foreground"
                      >
                        {page}
                      </span>
                    )
                  )}
              </div>

              {/* Next Page Button */}
              <button
                type="button"
                onClick={() =>
                  handlePage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
                className="rounded-md border border-input bg-background px-3 py-1 text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {renderActions && selectRow && renderActions(selectRow)}
    </>
  );
}
