import {
  BrushCleaning,
  EllipsisVertical,
  Eye,
  LoaderCircle,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { IconBtn } from "@/components/common/IconBtn";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

import { UpdateRoomDialog } from "../rooms/components/UpdateRoomDialog";
import { ViewRoomDialog } from "../rooms/components/ViewRoomDialog";
import { useDeleteRoom } from "../rooms/hooks/useDeleteRoom";
import { useUpdateRoomMutation } from "../rooms/hooks/useUpdateRoom";
import type { Room } from "../rooms/rooms.types";

import { UpdateRoomHousekeepingDialog } from "./UpdateRoomHousekeepingDialog";

export function RoomActionDropdownMenu({ room }: { room: Room }) {
  const { user } = useAuth();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isHousekeepingOpen, setIsHousekeepingOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const canManage = user?.role === "ADMIN" || user?.role === "MANAGER";
  const canDelete = user?.role === "ADMIN";
  const { mutate: updateRoom, isPending: isUpdating } = useUpdateRoomMutation(
    room.id
  );
  const { handleDelete, isDeleting } = useDeleteRoom();

  if (!canManage) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for room ${room.roomNumber}`}
            disabled={isUpdating || isDeleting}
          >
            {isUpdating || isDeleting ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : (
              <EllipsisVertical aria-hidden="true" />
            )}
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsViewOpen(true)}
            disabled={isUpdating || isDeleting}
          >
            <Eye aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateRoom({ isActive: !room.isActive })}
            disabled={isUpdating || isDeleting}
          >
            <Power aria-hidden="true" />
            {isUpdating
              ? "Updating status..."
              : room.isActive
                ? "Deactivate"
                : "Activate"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsHousekeepingOpen(true)}
            disabled={isUpdating || isDeleting}
          >
            <BrushCleaning aria-hidden="true" />
            Room Care
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsUpdateOpen(true)}
            disabled={isUpdating || isDeleting}
          >
            <Pencil aria-hidden="true" />
            Update
          </DropdownMenuItem>
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
                disabled={isUpdating || isDeleting}
              >
                <Trash2 aria-hidden="true" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isViewOpen && (
        <ViewRoomDialog
          open={isViewOpen}
          onOpenChange={setIsViewOpen}
          roomId={room.id}
        />
      )}
      {isUpdateOpen && (
        <UpdateRoomDialog
          open={isUpdateOpen}
          onOpenChange={setIsUpdateOpen}
          room={room}
        />
      )}
      {isHousekeepingOpen && (
        <UpdateRoomHousekeepingDialog
          open={isHousekeepingOpen}
          onOpenChange={setIsHousekeepingOpen}
          room={room}
        />
      )}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete room?</DialogTitle>
            <DialogDescription>
              Delete {room.name || `room ${room.roomNumber}`}? This cannot be
              undone. Existing related records may prevent deletion.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                handleDelete(room.id, {
                  onSuccess: () => setIsDeleteOpen(false),
                })
              }
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete room"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
