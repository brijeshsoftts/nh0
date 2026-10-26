import {
  BedDouble,
  Building2,
  CalendarDays,
  FileText,
  Hash,
} from "lucide-react";

import {
  HousekeepingBadge,
  OccupancyBadge,
  StatusBadge,
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

import { useRoomDetails } from "../hooks/useRooms";

import { formatRoomCurrency, formatRoomDate } from "./room-format";
import { RoomDetail } from "./RoomDetail";

type ViewRoomDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
};

export function ViewRoomDialog({
  open,
  onOpenChange,
  roomId,
}: ViewRoomDialogProps) {
  const { room, isLoading, isError, refetch } = useRoomDetails(roomId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-6 overflow-y-auto sm:min-w-100">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl border bg-muted/50 text-foreground">
              <BedDouble aria-hidden="true" className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                {room?.name ||
                  (room ? `Room ${room.roomNumber}` : "Room details")}
              </DialogTitle>
              <DialogDescription>
                Database details and current operational status.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading && (
          <div
            role="status"
            aria-label="Loading room details"
            className="space-y-3"
          >
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {isError && (
          <div role="alert" className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Could not load this room. It may have been removed or you may not
              have access.
            </p>
            <Button type="button" variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !isError && !room && (
          <p role="status" className="text-sm text-muted-foreground">
            Room not found.
          </p>
        )}

        {room && !isLoading && !isError && (
          <div className="max-h-100 space-y-4 overflow-y-auto">
            <section aria-label="Room status" className="flex flex-wrap gap-2">
              <StatusBadge value={room.isActive} />
              <OccupancyBadge value={room.occupancyStatus} />
              <HousekeepingBadge value={room.housekeepingStatus} />
            </section>

            <section
              aria-label="Room information"
              className="grid gap-3 sm:grid-cols-2"
            >
              <RoomDetail
                icon={Hash}
                label="Room number"
                value={`#${room.roomNumber}`}
              />
              <RoomDetail
                icon={Building2}
                label="Floor"
                value={`Floor ${room.floor}`}
              />
              <RoomDetail
                icon={BedDouble}
                label="Room type"
                value={room.roomType.name}
              />
              <RoomDetail
                icon={BedDouble}
                label="Room type status"
                value={room.roomType.isActive ? "Active" : "Inactive"}
              />
              <RoomDetail
                icon={BedDouble}
                label="Room type base price"
                value={formatRoomCurrency(
                  room.roomType.basePrice,
                  room.roomType.currency
                )}
              />
              <RoomDetail
                icon={CalendarDays}
                label="Created"
                value={formatRoomDate(room.createdAt)}
              />
              <RoomDetail
                icon={CalendarDays}
                label="Last updated"
                value={formatRoomDate(room.updatedAt)}
              />
            </section>

            <section className="space-y-2" aria-labelledby="room-description">
              <h3
                id="room-description"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FileText
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
                Description
              </h3>
              <p className="min-h-16 rounded-xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
                {room.description?.trim() || "No description has been added."}
              </p>
            </section>
          </div>
        )}

        <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
