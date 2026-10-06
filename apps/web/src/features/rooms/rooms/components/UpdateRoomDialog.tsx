import { Check, Sparkles } from "lucide-react";

import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import { TextareaField } from "@/components/common/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

import { housekeepingStatus, occupancyStatus } from "../../rooms.constants";
import { useRoomTypes } from "../../roomTypes/hooks/useRoomTypes";
import { useCreateRoomFacade } from "../hooks/useCreateRoom";
import type { Room } from "../rooms.types";

export function UpdateRoomDialog({
  open,
  onOpenChange,
  room,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: Room;
}) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useCreateRoomFacade();
  const { items } = useRoomTypes({ limit: 20 });
  const roomTypeOptions = items?.map((i) => ({
    id: i.id,
    name: i.name,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-6 overflow-y-auto sm:min-w-100">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground shadow-sm">
              <Sparkles className="size-5" />
            </div>

            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Update room
              </DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Update a room to be used in your hotel.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="max-h-100 space-y-4 overflow-y-scroll">
            <InputField
              label="Room Name"
              placeholder="e.g. Deluxe Garden View"
              {...register("name", { value: room.name })}
              disabled={isPending}
              error={errors.name?.message}
            />
            <InputField
              label="Room Number"
              type="number"
              placeholder="e.g. 101"
              {...register("roomNumber", { value: room.roomNumber })}
              disabled={isPending}
              error={errors.roomNumber?.message}
            />

            <SelectField
              name="roomTypeId"
              label="Room Type"
              control={control}
              options={roomTypeOptions}
              error={errors.roomTypeId?.message}
              disabled={isPending}
              defaultValue={room.roomType?.id}
            />

            <InputField
              label="Floor"
              type="number"
              placeholder="e.g. 1"
              {...register("floor", { value: room.floor })}
              disabled={isPending}
              error={errors.floor?.message}
            />
            <SelectField
              name="occupancyStatus"
              label="Occupancy Status"
              control={control}
              options={occupancyStatus}
              error={errors.occupancyStatus?.message}
              disabled={isPending}
            />

            <SelectField
              name="housekeepingStatus"
              label="Housekeeping Status"
              control={control}
              options={housekeepingStatus}
              error={errors.housekeepingStatus?.message}
              disabled={isPending}
            />

            <TextareaField
              label="Description"
              placeholder="Add any notes about this room (optional)"
              {...register("description", { value: room.description })}
              disabled={isPending}
              error={errors.description?.message}
            />
          </div>

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending} className="min-w-28">
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <Check className="size-4" />
                  <span>Update Room</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
