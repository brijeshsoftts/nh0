import { RotateCcw, Search } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListParams } from "@/hooks/useListParams";
import type { ListParams } from "@/types/api.types";

import { useBrowseRooms } from "../rooms.crud";

import { BrowseRoomCard } from "./BrowseRoomCard";

type RoomSearchDraft = {
  search: string;
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
  slug: string;
  minPrice: string;
  maxPrice: string;
  isAvailable: boolean;
};

const DEFAULT_DRAFT: RoomSearchDraft = {
  search: "",
  checkInDate: "",
  checkOutDate: "",
  adults: "2",
  children: "0",
  slug: "",
  minPrice: "",
  maxPrice: "",
  isAvailable: false,
};

function getLocalDateValue() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

function readDraft(
  filters: Partial<ListParams>,
  searchInput: string
): RoomSearchDraft {
  const values = filters as unknown as Record<string, unknown>;
  const readString = (value: unknown, fallback = "") =>
    typeof value === "string" || typeof value === "number"
      ? String(value)
      : fallback;

  return {
    search: searchInput,
    checkInDate: readString(values.checkInDate),
    checkOutDate: readString(values.checkOutDate),
    adults: readString(values.adults, DEFAULT_DRAFT.adults),
    children: readString(values.children, DEFAULT_DRAFT.children),
    slug: readString(values.slug),
    minPrice: readString(values.minPrice),
    maxPrice: readString(values.maxPrice),
    isAvailable: values.isAvailable === true || values.isAvailable === "true",
  };
}

function parseOptionalNumber(value: string) {
  return value.trim() ? Number(value) : undefined;
}

export function CustomerRooms() {
  const listParams = useListParams();

  return (
    <CustomerRoomsContent
      key={JSON.stringify(listParams.params)}
      {...listParams}
    />
  );
}

function CustomerRoomsContent({
  params,
  filters,
  searchInput,
  setSearch,
  setPage,
  setFilter,
}: ReturnType<typeof useListParams>) {
  const [draft, setDraft] = useState(() => readDraft(filters, searchInput));
  const [validationMessage, setValidationMessage] = useState("");
  const today = getLocalDateValue();
  const { data, isLoading, isError, refetch } = useBrowseRooms(params);
  const { data: roomTypeOptions, isLoading: isLoadingRoomTypes } =
    useBrowseRooms({ page: 1, limit: 100 });

  const rooms = data?.data ?? [];
  const roomTypes = roomTypeOptions?.data ?? [];

  function updateDraft<Key extends keyof RoomSearchDraft>(
    key: Key,
    value: RoomSearchDraft[Key]
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
    setValidationMessage("");
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (Boolean(draft.checkInDate) !== Boolean(draft.checkOutDate)) {
      setValidationMessage("Enter both check-in and check-out dates.");
      return;
    }

    if (
      (draft.checkInDate && draft.checkInDate < today) ||
      (draft.checkOutDate && draft.checkOutDate < today)
    ) {
      setValidationMessage("Stay dates cannot be in the past.");
      return;
    }

    if (
      draft.checkInDate &&
      draft.checkOutDate &&
      draft.checkOutDate <= draft.checkInDate
    ) {
      setValidationMessage("Check-out must be later than check-in.");
      return;
    }

    const adults = parseOptionalNumber(draft.adults);
    if (
      adults !== undefined &&
      (!Number.isInteger(adults) || adults < 1 || adults > 10)
    ) {
      setValidationMessage("Adults must be a whole number from 1 to 10.");
      return;
    }

    const children = parseOptionalNumber(draft.children);
    if (
      children !== undefined &&
      (!Number.isInteger(children) || children < 0 || children > 10)
    ) {
      setValidationMessage("Children must be a whole number from 0 to 10.");
      return;
    }

    const minPrice = parseOptionalNumber(draft.minPrice);
    const maxPrice = parseOptionalNumber(draft.maxPrice);
    if (
      (minPrice !== undefined &&
        (!Number.isInteger(minPrice) || minPrice < 0)) ||
      (maxPrice !== undefined && (!Number.isInteger(maxPrice) || maxPrice < 0))
    ) {
      setValidationMessage(
        "Nightly prices must be non-negative whole numbers."
      );
      return;
    }

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      setValidationMessage("Maximum price must be at least minimum price.");
      return;
    }

    setValidationMessage("");
    setSearch(draft.search.trim());
    setFilter({
      checkInDate: draft.checkInDate || undefined,
      checkOutDate: draft.checkOutDate || undefined,
      adults,
      children,
      slug: draft.slug || undefined,
      minPrice,
      maxPrice,
      isAvailable: draft.isAvailable ? true : undefined,
    } as Partial<ListParams>);
  }

  function handleReset() {
    setDraft(DEFAULT_DRAFT);
    setValidationMessage("");
    setSearch("");
    setFilter({
      checkInDate: undefined,
      checkOutDate: undefined,
      adults: undefined,
      children: undefined,
      slug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      isAvailable: undefined,
    } as Partial<ListParams>);
  }

  return (
    <div className="space-y-5">
      <form
        className="rounded-lg border border-l-4 border-border/80 border-l-primary bg-card p-4 shadow-sm sm:p-5"
        noValidate
        onSubmit={handleSearch}
      >
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-6 xl:grid-cols-12">
          <div className="col-span-2 space-y-1.5 md:col-span-3 xl:col-span-4">
            <Label htmlFor="room-search">Search rooms</Label>
            <Input
              id="room-search"
              type="search"
              value={draft.search}
              onChange={(event) => updateDraft("search", event.target.value)}
              placeholder="Name or description"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-check-in">Check-in date</Label>
            <Input
              id="room-check-in"
              type="date"
              min={today}
              value={draft.checkInDate}
              onChange={(event) =>
                updateDraft("checkInDate", event.target.value)
              }
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-check-out">Check-out date</Label>
            <Input
              id="room-check-out"
              type="date"
              min={draft.checkInDate || today}
              value={draft.checkOutDate}
              onChange={(event) =>
                updateDraft("checkOutDate", event.target.value)
              }
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-adults">Adults</Label>
            <Input
              id="room-adults"
              type="number"
              min={1}
              max={10}
              step={1}
              value={draft.adults}
              onChange={(event) => updateDraft("adults", event.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-children">Children</Label>
            <Input
              id="room-children"
              type="number"
              min={0}
              max={10}
              step={1}
              value={draft.children}
              onChange={(event) => updateDraft("children", event.target.value)}
              className="h-10"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border/70 pt-4 md:grid-cols-6 xl:grid-cols-12">
          <div className="col-span-2 space-y-1.5 md:col-span-3 xl:col-span-4">
            <Label htmlFor="room-type">Room type</Label>
            <Select
              value={draft.slug || "all"}
              onValueChange={(value) =>
                updateDraft("slug", value === "all" ? "" : (value ?? ""))
              }
              disabled={isLoadingRoomTypes}
            >
              <SelectTrigger id="room-type" className="h-10! w-full">
                <SelectValue placeholder="All room types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All room types</SelectItem>
                {roomTypes.map((roomType) => (
                  <SelectItem key={roomType.slug} value={roomType.slug}>
                    {roomType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-min-price">Min / night</Label>
            <Input
              id="room-min-price"
              type="number"
              min={0}
              step={1}
              value={draft.minPrice}
              onChange={(event) => updateDraft("minPrice", event.target.value)}
              placeholder="Any"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-max-price">Max / night</Label>
            <Input
              id="room-max-price"
              type="number"
              min={0}
              step={1}
              value={draft.maxPrice}
              onChange={(event) => updateDraft("maxPrice", event.target.value)}
              placeholder="Any"
              className="h-10"
            />
          </div>

          <label className="col-span-2 flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border/70 bg-muted/30 px-3 md:col-span-3 xl:col-span-4">
            <Checkbox
              checked={draft.isAvailable}
              onCheckedChange={(checked) =>
                updateDraft("isAvailable", checked === true)
              }
              aria-label="Available for selected dates"
            />
            <span className="text-sm font-medium">
              Available for selected dates
            </span>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {validationMessage ? (
            <p
              id="room-search-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {validationMessage}
            </p>
          ) : (
            <span />
          )}
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-10"
            >
              <RotateCcw aria-hidden="true" />
              Reset filters
            </Button>
            <Button type="submit" className="h-10 px-4">
              <Search aria-hidden="true" />
              Search rooms
            </Button>
          </div>
        </div>
      </form>

      {isError ? (
        <div
          role="alert"
          className="flex flex-col items-start justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-foreground">
            Could not load rooms. Try again.
          </p>
          <Button type="button" variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : isLoading ? (
        <p
          role="status"
          className="py-8 text-center text-sm text-muted-foreground"
        >
          Loading rooms…
        </p>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {rooms.map((room) => (
            <BrowseRoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
          No room types match these filters.
        </p>
      )}

      <Pagination onPageChange={setPage} pagination={data?.meta} />
    </div>
  );
}
