import {
  BedDouble,
  Building2,
  FileText,
  Hash,
  type LucideIcon,
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

import type { Room } from "../rooms.types";

type ViewRoomDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: Room;
};

export function ViewRoomDialog({
  open,
  onOpenChange,
  room,
}: ViewRoomDialogProps) {
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
                {room.name || `Room ${room.roomNumber}`}
              </DialogTitle>
              <DialogDescription>
                Room details and current operational status.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-100 space-y-4 overflow-y-scroll">
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
              value={room.floor ? `Floor ${room.floor}` : "Not specified"}
            />
            <RoomDetail
              icon={BedDouble}
              label="Room type"
              value={room.roomType.name}
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

function RoomDetail({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border bg-card p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={
            mono
              ? "font-mono text-sm font-medium break-all"
              : "text-sm font-medium wrap-break-word"
          }
        >
          {value}
        </p>
      </div>
    </div>
  );
}
