import {
  Ban,
  Banknote,
  CheckCircle2,
  EllipsisVertical,
  Eye,
  LoaderCircle,
  LogIn,
  LogOut,
  QrCode,
  Receipt,
  UserRound,
} from "lucide-react";
import { Fragment, useState } from "react";

import { IconBtn } from "@/components/common/IconBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewInvoiceDetails } from "@/features/invoices/components/ViewInvoiceDetails";
import { CollectCashDialog } from "@/features/payments/components/CollectCashDialog";
import { RecordQrPaymentDialog } from "@/features/payments/components/RecordQrPaymentDialog";
import { useAuth } from "@/hooks/useAuth";
import type { BookingStatus } from "@/types/enum.types";

import { getBookingStatusActions } from "../booking-status";
import type { BookingListItem } from "../bookings.types";
import { useUpdateBookingStatus } from "../hooks/useUpdateBookingStatus";

import { BookingCancelConfirmation } from "./BookingCancelConfirmation";
import { BookingCustomerDialog } from "./BookingCustomerDialog";
import { BookingDetailsSheet } from "./BookingDetailsSheet";

const STATUS_ICONS: Partial<Record<BookingStatus, typeof CheckCircle2>> = {
  CONFIRMED: CheckCircle2,
  CHECKED_IN: LogIn,
  CHECKED_OUT: LogOut,
  CANCELLED: Ban,
};

export function BookingRowActions({ booking }: { booking: BookingListItem }) {
  const { user } = useAuth();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCashDialogOpen, setIsCashDialogOpen] = useState(false);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    status: BookingStatus;
    message: string;
  } | null>(null);
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus();
  const canUpdate =
    user?.role === "ADMIN" ||
    user?.role === "MANAGER" ||
    (user?.role === "STAFF" && user.category === "RECEPTIONIST");
  const statusActions = canUpdate
    ? getBookingStatusActions(booking.status)
    : [];
  const canViewInvoice =
    (booking.status === "CHECKED_OUT" || booking.status === "CANCELLED") &&
    booking.invoice !== null;
  const canCollectCash =
    canUpdate &&
    booking.paymentMethod === "CASH" &&
    ["PENDING", "CONFIRMED"].includes(booking.status) &&
    booking.invoice !== null &&
    booking.invoice.status !== "PAID" &&
    booking.invoice.status !== "REFUNDED";
  const canRecordQrPayment =
    canUpdate &&
    booking.paymentMethod === "ONLINE" &&
    booking.status === "PENDING" &&
    booking.invoice !== null &&
    booking.invoice.status !== "PAID" &&
    booking.invoice.status !== "REFUNDED";
  const canCheckIn = booking.canCheckIn === true;

  const changeStatus = (status: BookingStatus) => {
    updateStatus(
      { id: booking.id, status },
      { onSuccess: () => setConfirmation(null) }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <IconBtn
              size="sm"
              variant="ghost"
              shape="square"
              aria-label={`Actions for ${booking.bookingReference}`}
              disabled={isPending}
            />
          }
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" aria-hidden="true" />
          ) : (
            <EllipsisVertical aria-hidden="true" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-fit rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
          <DropdownMenuItem
            onClick={() => setIsDetailsOpen(true)}
            disabled={isPending}
          >
            <Eye aria-hidden="true" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsCustomerOpen(true)}
            disabled={isPending}
            className={"whitespace-nowrap"}
          >
            <UserRound aria-hidden="true" />
            View Customer
          </DropdownMenuItem>

          {canCollectCash && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsCashDialogOpen(true)}>
                <Banknote aria-hidden="true" />
                Collect Cash
              </DropdownMenuItem>
            </>
          )}

          {canRecordQrPayment && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsQrDialogOpen(true)}>
                <QrCode aria-hidden="true" />
                Record QR Pay
              </DropdownMenuItem>
            </>
          )}

          {statusActions.length > 0 && <DropdownMenuSeparator />}
          {statusActions.map((action) => {
            const Icon = STATUS_ICONS[action.status] ?? CheckCircle2;
            return (
              <Fragment key={action.status}>
                {action.destructive && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  variant={action.destructive ? "destructive" : "default"}
                  disabled={
                    isPending || (action.status === "CHECKED_IN" && !canCheckIn)
                  }
                  onClick={() => {
                    if (action.confirmMessage) {
                      setConfirmation({
                        status: action.status,
                        message: action.confirmMessage,
                      });
                    } else {
                      changeStatus(action.status);
                    }
                  }}
                >
                  <Icon aria-hidden="true" />
                  {action.status === "CHECKED_IN" && !canCheckIn
                    ? "Check In (Not eligible)"
                    : action.label}{" "}
                </DropdownMenuItem>
              </Fragment>
            );
          })}

          {canViewInvoice && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsInvoiceOpen(true)}
                disabled={isPending}
              >
                <Receipt aria-hidden="true" />
                View Invoice
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <BookingDetailsSheet
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        bookingId={booking.id}
      />
      <BookingCustomerDialog
        open={isCustomerOpen}
        onOpenChange={setIsCustomerOpen}
        customer={booking.customer}
      />
      {isCashDialogOpen && (
        <CollectCashDialog
          bookingId={booking.id}
          open={isCashDialogOpen}
          onOpenChange={setIsCashDialogOpen}
        />
      )}
      {isQrDialogOpen && (
        <RecordQrPaymentDialog
          bookingId={booking.id}
          open={isQrDialogOpen}
          onOpenChange={setIsQrDialogOpen}
        />
      )}
      {canViewInvoice && booking.invoice && isInvoiceOpen && (
        <ViewInvoiceDetails
          id={booking.invoice.id}
          open={isInvoiceOpen}
          onOpenChange={setIsInvoiceOpen}
        />
      )}
      <BookingCancelConfirmation
        open={confirmation !== null}
        isPending={isPending}
        message={confirmation?.message}
        onOpenChange={(open) => {
          if (!open) setConfirmation(null);
        }}
        onConfirm={changeStatus}
        status={confirmation?.status}
      />
    </>
  );
}
