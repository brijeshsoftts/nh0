import { Search, X } from "lucide-react";
import { useState } from "react";

import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

import { useAmenities } from "../hooks/useAmenities";

import { AmenityCard } from "./AmenityCard";

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
      <Pagination onPageChange={setPage} pagination={pagination!} />
    </>
  );
}
