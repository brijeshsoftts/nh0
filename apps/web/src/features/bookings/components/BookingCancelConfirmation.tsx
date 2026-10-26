import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { BookingStatus } from "../bookings.types";

type BookingCancelConfirmationProps = {
  open: boolean;
  isPending: boolean;
  message: string | undefined;
  onOpenChange: (open: boolean) => void;
  onConfirm: (status: BookingStatus) => void;
  status: BookingStatus | undefined;
};

export function BookingCancelConfirmation({
  open,
  isPending,
  message,
  onOpenChange,
  onConfirm,
  status,
}: BookingCancelConfirmationProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !isPending) onOpenChange(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel booking?</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Keep booking
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              if (status) onConfirm(status);
            }}
            disabled={isPending || !status}
          >
            {isPending ? "Cancelling..." : "Cancel booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
