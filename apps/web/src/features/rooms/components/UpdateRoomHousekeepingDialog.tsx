import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateRoomMutation } from "../rooms/hooks/useUpdateRoom";
import type { Room } from "../rooms/rooms/rooms.types";

type UpdateRoomHousekeepingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: Room;
};

export function UpdateRoomHousekeepingDialog({
  open,
  onOpenChange,
  room,
}: UpdateRoomHousekeepingDialogProps) {
  const [status, setStatus] = useState(room.housekeepingStatus);
  const { mutate: updateRoom, isPending } = useUpdateRoomMutation(room.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update housekeeping status</DialogTitle>
          <DialogDescription>
            Set the housekeeping status for room {room.roomNumber}.
          </DialogDescription>
        </DialogHeader>
        <Select
          value={status}
          onValueChange={(value) => {
            if (
              value === "CLEAN" ||
              value === "DIRTY" ||
              value === "CLEANING"
            ) {
              setStatus(value);
            }
          }}
          disabled={isPending}
        >
          <SelectTrigger className="w-full" aria-label="Housekeeping status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CLEAN">Clean</SelectItem>
            <SelectItem value="DIRTY">Dirty</SelectItem>
            <SelectItem value="CLEANING">Cleaning</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() =>
              updateRoom(
                { housekeepingStatus: status },
                { onSuccess: () => onOpenChange(false) }
              )
            }
            disabled={isPending || status === room.housekeepingStatus}
          >
            {isPending ? "Saving..." : "Save status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
