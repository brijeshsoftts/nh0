import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";

import { useLookupHousekeepers, useUpdateTask } from "../tasks.crud";
import type { HousekeeperLookupItem, TaskItem } from "../tasks.types";

type TaskAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskItem;
};

export function TaskAssignmentDialog({
  open,
  onOpenChange,
  task,
}: TaskAssignmentDialogProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<HousekeeperLookupItem | null>(null);
  const query = useDebounce(search, 300);
  const { data: housekeepers, isLoading } = useLookupHousekeepers({
    search: query,
    limit: 10,
    category: "housekeeper",
  });
  const updateTask = useUpdateTask(task.id, {
    onSuccess: () => onOpenChange(false),
  });
  const isPending = updateTask.mutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) onOpenChange(nextOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign task</DialogTitle>
          <DialogDescription>
            Choose a housekeeper for room {task.room.roomNumber}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="task-housekeeper">Housekeeper</Label>
          <Combobox items={housekeepers ?? []}>
            <ComboboxInput
              id="task-housekeeper"
              placeholder="Search housekeepers"
              onChange={(event) => setSearch(event.target.value)}
              disabled={isPending}
            />
            <ComboboxContent>
              <ComboboxEmpty>
                {isLoading
                  ? "Loading housekeepers..."
                  : "No housekeepers found."}
              </ComboboxEmpty>
              <ComboboxList>
                {(housekeeper: HousekeeperLookupItem) => (
                  <ComboboxItem
                    key={housekeeper.id}
                    value={housekeeper.fullName}
                    onClick={() => setSelected(housekeeper)}
                  >
                    {housekeeper.fullName}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <p className="text-sm text-muted-foreground">
            Current: {task.assignee.fullName}
            {selected ? ` · Selected: ${selected.fullName}` : ""}
          </p>
        </div>

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
            onClick={() => {
              if (selected) updateTask.submit({ assignedTo: selected.id });
            }}
            disabled={
              isPending || !selected || selected.id === task.assignee.id
            }
          >
            {isPending ? "Saving..." : "Assign task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
