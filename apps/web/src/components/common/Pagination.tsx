import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Pagination } from "@/types/api.types";

interface PaginationProps {
  pagination?: Pagination;
  onPageChange: (page: number) => void;
}
export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const {
    page: currentPage,
    limit: pageSize,
    total: totalRecords,
  } = pagination || {
    page: 0,
    limit: 10,
    total: 0,
  }; // Calculate total pages from API response.
  const totalPages = Math.ceil(totalRecords / pageSize); // Calculate visible record range.
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages || totalPages === 0;
  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  }; // Don't render pagination when there are no records.
  if (totalRecords === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 border-t border-border/60 bg-card px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
      {/* ───────────────── Record information ───────────────── */}
      <div className="text-center text-xs text-muted-foreground md:text-left">
        Showing
        <span className="font-medium text-foreground">
          {startRecord}–{endRecord}
        </span>
        of <span className="font-medium text-foreground"> {totalRecords} </span>
        records
      </div>
      {/* ───────────────── Pagination controls ───────────────── */}
      <div className="flex items-center justify-center gap-2">
        {/* Previous */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isFirstPage}
          onClick={handlePrevious}
          className="h-9 gap-1.5 px-3 text-xs transition-all"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="size-4" /> <span>Previous</span>
        </Button>
        {/* Page indicator */}
        <div
          className="flex h-9 min-w-22.5 items-center justify-center rounded-md border border-border bg-muted/30 px-3 text-xs font-medium text-foreground select-none"
          aria-label={`Page ${currentPage} of ${totalPages}`}
        >
          <span>Page {currentPage}</span>
          <span className="mx-1.5 text-muted-foreground"> of </span>
          <span>{totalPages}</span>
        </div>
        {/* Next */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLastPage}
          onClick={handleNext}
          className="h-9 gap-1.5 px-3 text-xs transition-all"
          aria-label="Go to next page"
        >
          <span>Next</span> <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
