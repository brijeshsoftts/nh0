import { Mail, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { BookingListItem } from "../bookings.types";

type BookingCustomerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: BookingListItem["customer"];
};

export function BookingCustomerDialog({
  open,
  onOpenChange,
  customer,
}: BookingCustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customer details</DialogTitle>
          <DialogDescription>
            Contact details recorded for this booking.
          </DialogDescription>
        </DialogHeader>

        <dl className="space-y-4 py-2">
          <div className="flex items-center gap-3">
            <UserRound
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground">Name</dt>
              <dd className="text-sm font-medium wrap-break-word">
                {customer.fullName || "Guest"}
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail aria-hidden="true" className="size-4 text-muted-foreground" />
            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground">Email</dt>
              <dd className="text-sm font-medium break-all">
                {customer.email || "Not provided"}
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd className="text-sm font-medium">
                {customer.phone || "Not provided"}
              </dd>
            </div>
          </div>
        </dl>

        <DialogFooter>
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
