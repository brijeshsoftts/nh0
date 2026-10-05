import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

import { useAmenities } from "../hooks/useAmenities";

import { AmenityCard } from "./AmenityCard";
import { NewAmenityModal } from "./NewAmenityModal";

interface AmenitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
function AmenitySearch({
  value,
  onChange,
  placeholder = "Search amenities...",
}: AmenitySearchProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-md border-t border-border/60 bg-card px-6 py-4 sm:flex-row">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 border-border/60 bg-card pr-9 pl-9 shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/20"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange("")}
            className="absolute top-1/2 right-1 size-8 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      <NewAmenityModal>
        <Button>
          <Plus className="size-4" />
          New Amenity
        </Button>
      </NewAmenityModal>
    </div>
  );
}

export function AmenityGrid() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = useDebounce(search, 500);
  const { items, pagination } = useAmenities({
    search: query,
    page,
  });

  return (
    <>
      <AmenitySearch value={search} onChange={setSearch} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items?.map((a) => (
          <AmenityCard amenity={a} key={a.id} />
        ))}
      </div>
      <AmenityPagination
        currentPage={pagination?.page || 1}
        onPageChange={setPage}
        pageSize={pagination?.limit || 0}
        totalPages={Math.ceil(
          pagination?.total || 0 / (pagination?.limit || 0)
        )}
        totalRecords={pagination?.total || 0}
      />
    </>
  );
}

interface AmenityPaginationProps {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
}
export function AmenityPagination({
  currentPage,
  pageSize,
  totalRecords,
  totalPages,
  onPageChange,
}: AmenityPaginationProps) {
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  if (totalRecords === 0) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-md border-t border-border/60 bg-card px-6 py-4 sm:flex-row">
      {/* Record information */}
      <div className="flex gap-x-1 text-xs text-muted-foreground">
        Showing
        <span className="font-medium text-foreground">
          {startRecord}–{endRecord}
        </span>
        of <span className="font-medium text-foreground"> {totalRecords} </span>
        records
      </div>
      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Page size */}

        {/* Previous */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isFirstPage}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="h-8 gap-1.5 px-3 text-xs"
        >
          <ChevronLeft className="size-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Next */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLastPage}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="h-8 gap-1.5 px-3 text-xs"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
