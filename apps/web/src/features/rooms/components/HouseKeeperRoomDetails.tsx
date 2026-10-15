import { BedDouble, Building2, Eye, Users } from "lucide-react";
import { type ReactNode, useState } from "react";

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

import { useHousekeeperRoomDetails } from "../rooms.crud";

type HouseKeeperRoomDetailsProps = {
  roomId: string;
  buttonLabel?: string;
};

export function HouseKeeperRoomDetails({
  roomId,
  buttonLabel,
}: HouseKeeperRoomDetailsProps) {
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
        size={buttonLabel ? "sm" : "icon-sm"}
        aria-label={buttonLabel ? undefined : "View room details"}
        onClick={() => setOpen(true)}
      >
        <Eye className="size-4" />
        {buttonLabel}
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
                <RoomDetail label="Room number" value={room.roomNumber}>
                  <Building2 />
                </RoomDetail>
                <RoomDetail label="Floor" value={String(room.floor)}>
                  <Building2 />
                </RoomDetail>
                <RoomDetail
                  label="Maximum guests"
                  value={String(room.roomType.maxGuests)}
                >
                  <Users />
                </RoomDetail>
                <RoomDetail
                  label="Bed"
                  value={`${room.roomType.bed.count} × ${room.roomType.bed.type}`}
                >
                  <BedDouble />
                </RoomDetail>
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

function RoomDetail({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <span className="size-4 shrink-0 text-muted-foreground">{children}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
