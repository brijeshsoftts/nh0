import { Plus, Search, X } from "lucide-react";
import { useState } from "react";

import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

import { useRoomTypes } from "../hooks/useRoomTypes";

// import { roomTypes } from "../roomTypes.mock";
import { CreateRoomTypeDialog } from "./CreateRoomTypeDialog";
import { RoomTypeCard } from "./RoomTypeCard";

interface RoomTypeSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
function RoomTypeSearch({
  value,
  onChange,
  placeholder = "Search room types...",
}: RoomTypeSearchProps) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:px-6">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 rounded-none border-border/60 bg-card pr-9 pl-9 transition-all duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/20"
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
      <CreateRoomTypeDialog>
        <Button className="h-10 w-full rounded-none sm:w-auto">
          <Plus className="size-4" />
          New Room Type
        </Button>
      </CreateRoomTypeDialog>
    </div>
  );
}

export function RoomTypeGrid() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = useDebounce(search, 500);
  const { pagination, items } = useRoomTypes({
    search: query,
    page,
  });

  return (
    <>
      <RoomTypeSearch value={search} onChange={setSearch} />
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-3">
        {items.map((roomType) => (
          <RoomTypeCard key={roomType.id} roomType={roomType} />
        ))}
      </div>
      <Pagination onPageChange={setPage} pagination={pagination} />
    </>
  );
}
