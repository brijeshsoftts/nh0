import { BedDouble, Building2, Eye, Users } from "lucide-react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
} from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useListParams } from "@/hooks/useListParams";

import { useHousekeeperRoomDetails, useRooms } from "../rooms.crud";
import type { HousekeeperRoom } from "../types";

import { RoomsStats } from "./RoomsStats";

const columns: ColumnDef<HousekeeperRoom>[] = [
  {
    key: "roomNumber",
    header: "Room",
    className: "min-w-28",
    cell: (room) => <span className="font-medium">{room.roomNumber}</span>,
  },
  {
    key: "floor",
    header: "Floor",
    cell: (room) => room.floor,
  },
  {
    key: "roomType",
    header: "Room Type",
    className: "min-w-36",
    cell: (room) => <span className="font-medium">{room.roomType.name}</span>,
  },
  {
    key: "occupancyStatus",
    header: "Occupancy",
    className: "min-w-32",
    cell: (room) => <OccupancyBadge value={room.occupancyStatus} />,
  },
  {
    key: "housekeepingStatus",
    header: "Housekeeping Status",
    className: "min-w-44",
    cell: (room) => <HousekeepingBadge value={room.housekeepingStatus} />,
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-20",
    cell: (room) => <HouseKeeperRoomDetails roomId={room.id} />,
  },
];

function HouseKeeperRoomsTable() {
  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } =
    useRooms<HousekeeperRoom>({
      search: searchInput,
      page: params.page,
      limit: 10,
    });

  return (
    <DataTable
      title="Rooms"
      description="Manage rooms."
      data={items}
      columns={columns}
      searchPlaceholder="Search room number..."
      searchableKeys={[
        "roomNumber",
        "roomType",
        "occupancyStatus",
        "housekeepingStatus",
      ]}
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load rooms. Please try again."
      emptyMessage="No rooms match your search or filters."
      showPagination
    />
  );
}

function HouseKeeperRoomDetails({ roomId }: { roomId: string }) {
  const [open, setOpen] = useState(false);
  const {
    data: room,
    isLoading,
    isError,
    refetch,
  } = useHousekeeperRoomDetails(open ? roomId : undefined);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="View room details"
        onClick={() => setOpen(true)}
      >
        <Eye className="size-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] gap-5 overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {room?.roomName ||
                (room ? `Room ${room.roomNumber}` : "Room details")}
            </DialogTitle>
            <DialogDescription>
              Room information for your active assignment.
            </DialogDescription>
          </DialogHeader>

          {isLoading && (
            <div
              role="status"
              aria-label="Loading room details"
              className="space-y-3"
            >
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}

          {isError && (
            <div
              role="alert"
              className="flex flex-col items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
            >
              <p className="text-sm text-muted-foreground">
                Could not load this room. It may no longer be assigned to you.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          )}

          {room && !isLoading && !isError && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <OccupancyBadge value={room.occupancyStatus} />
                <HousekeepingBadge value={room.housekeepingStatus} />
              </div>

              <section
                aria-label="Room details"
                className="grid gap-3 sm:grid-cols-2"
              >
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Building2 className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Room number</p>
                    <p className="text-sm font-medium">{room.roomNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Building2 className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="text-sm font-medium">{room.floor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Users className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Maximum guests
                    </p>
                    <p className="text-sm font-medium">
                      {room.roomType.maxGuests}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <BedDouble className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bed</p>
                    <p className="text-sm font-medium">
                      {room.roomType.bed.count} × {room.roomType.bed.type}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border p-3 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Room size</p>
                  <p className="text-sm font-medium">
                    {room.roomType.roomSize
                      ? `${room.roomType.roomSize} sq ft`
                      : "Not specified"}
                  </p>
                </div>
              </section>

              <section aria-label="Room type description" className="space-y-2">
                <h3 className="text-sm font-medium">Room type description</h3>
                <p className="min-h-16 rounded-lg border bg-muted/30 p-3 text-sm leading-relaxed text-muted-foreground">
                  {room.roomType.description?.trim() ||
                    "No description has been added."}
                </p>
              </section>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function HouseKeeperRooms() {
  return (
    <>
      <RoomsStats />
      <HouseKeeperRoomsTable />
    </>
  );
}
