import {
  Ban,
  BedDouble,
  CalendarCheck,
  Cigarette,
  CigaretteOff,
  CircleCheck,
  CircleX,
  type LucideIcon,
  Maximize2,
  PawPrint,
  RotateCw,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { roomTypeDetails } from "@/features/rooms/roomTypes/roomTypes.mock";
import type { RoomTypeDetails } from "@/features/rooms/roomTypes/roomTypes.types";
import { useAuth } from "@/hooks/useAuth";
import { getAmenityIcon } from "@/lib/amenity-icons";
import { formatBed, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

import { RoomGallery } from "./RoomGallery";

/* ------------------------------ Small parts ------------------------------ */

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-muted/40 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="leading-snug font-medium whitespace-nowrap">{value}</p>
      </div>
    </div>
  );
}

function Rule({
  icon: Icon,
  allowed,
  title,
  detail,
}: {
  icon: LucideIcon;
  allowed: boolean;
  title: string;
  detail: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl",
          allowed
            ? "bg-primary/10 text-primary ring-1 ring-primary/20"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="size-4" />
      </span>
      <div>
        <p className="leading-snug font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </li>
  );
}

function AvailabilityPill({ isAvailable }: { isAvailable: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1",
        isAvailable
          ? "bg-primary/10 text-primary ring-primary/30"
          : "bg-destructive/10 text-destructive ring-destructive/30"
      )}
    >
      {isAvailable ? (
        <CircleCheck className="size-3.5" />
      ) : (
        <CircleX className="size-3.5" />
      )}
      {isAvailable ? "Available" : "Not available"}
    </span>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h3 className="font-display text-2xl font-medium">{children}</h3>;
}

/* ------------------------------- States ------------------------------- */

function LoadingState() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto" aria-busy>
      <DialogTitle className="sr-only">Loading room details</DialogTitle>
      <DialogDescription className="sr-only">
        Please wait while the room details load.
      </DialogDescription>
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Skeleton className="aspect-4/3 w-full rounded-none" />
          <div className="flex gap-2 px-4 py-4 sm:px-6">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-14 w-20 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6 p-6 sm:p-8 lg:p-10">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="grid min-h-[50svh] flex-1 place-items-center p-8 text-center">
      <DialogTitle className="sr-only">Room details unavailable</DialogTitle>
      <div className="space-y-4">
        <p className="font-display text-3xl">We could not load this room</p>
        <DialogDescription className="text-muted-foreground">
          Check your connection and try again.
        </DialogDescription>
        <Button onClick={onRetry} variant="outline" className="rounded-full">
          <RotateCw className="size-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------- Content -------------------------------- */

function RoomContent({ room }: { room: RoomTypeDetails }) {
  const isAvailable = room?.roomStatusSummary?.occupancy?.available > 0;
  const guestHint =
    room.children > 0
      ? `${room.adults} adults, ${room.children} ${room.children === 1 ? "child" : "children"}`
      : `${room.adults} adults`;

  return (
    <div
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      aria-busy
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="lg:sticky lg:top-0 lg:self-start">
          <RoomGallery
            key={room.id}
            images={room.images}
            roomName={room.name}
          />
        </div>

        <div className="space-y-9 p-6 sm:p-8 lg:p-10">
          <header className="space-y-4 lg:pr-10">
            <AvailabilityPill isAvailable={isAvailable} />
            <DialogTitle className="font-display text-4xl leading-tight font-medium text-balance sm:text-5xl">
              {room.name}
            </DialogTitle>
            <DialogDescription
              className={cn(
                room.description
                  ? "text-base leading-relaxed text-muted-foreground"
                  : "sr-only"
              )}
            >
              {room.description ?? `Details for ${room.name}`}
            </DialogDescription>
            <div aria-hidden className="h-px w-full bg-border" />
          </header>

          <section
            aria-label="Room facts"
            className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-3"
          >
            {room.sizeSqFt ? (
              <Fact
                icon={Maximize2}
                label="Room size"
                value={`${room.sizeSqFt} sq ft`}
              />
            ) : null}
            <Fact
              icon={BedDouble}
              label="Bed"
              value={formatBed(room.bedType, room.bedCount)}
            />
            <Fact
              icon={Users}
              label="Guests"
              value={`Up to ${room.maxGuests}`}
              hint={guestHint}
            />
          </section>

          {room.amenities.length > 0 && (
            <section className="space-y-4">
              <SectionTitle>Amenities</SectionTitle>
              <ul className="grid gap-x-6 gap-y-3 min-[480px]:grid-cols-2">
                {room.amenities.map((amenity) => {
                  const Icon = getAmenityIcon(amenity.icon);
                  return (
                    <li
                      key={amenity.name}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Icon className="size-4.5 shrink-0 text-primary" />
                      {amenity.name}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="space-y-4">
            <SectionTitle>House rules</SectionTitle>
            <ul className="space-y-4">
              <Rule
                icon={room.smokingAllowed ? Cigarette : CigaretteOff}
                allowed={room.smokingAllowed}
                title={
                  room.smokingAllowed ? "Smoking allowed" : "Non-smoking room"
                }
                detail={
                  room.smokingAllowed
                    ? "Smoking is permitted in this room."
                    : "Smoking is not permitted in this room."
                }
              />
              <Rule
                icon={room.petsAllowed ? PawPrint : Ban}
                allowed={room.petsAllowed}
                title={room.petsAllowed ? "Pets welcome" : "No pets"}
                detail={
                  room.petsAllowed
                    ? "Pets are allowed in this room."
                    : "Pets are not allowed in this room."
                }
              />
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function BookingBar({
  room,
  onClose,
}: {
  room: RoomTypeDetails;
  onClose: () => void;
}) {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between gap-4 border-t bg-card/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:px-8">
      <div>
        <p className="text-xs text-muted-foreground">From</p>
        <p className="leading-none">
          <span className="font-display text-3xl font-medium">
            {formatPrice(room.basePrice)}
          </span>
          <span className="ml-1.5 text-sm text-muted-foreground">
            per night
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <DialogClose>
          <Button
            variant="outline"
            size="lg"
            className="hidden rounded-full sm:inline-flex"
          >
            Close
          </Button>
        </DialogClose>
        <Button
          variant="outline"
          size="lg"
          className="hidden rounded-full sm:inline-flex"
        >
          Book Now
        </Button>
        {user?.role === "ADMIN" && (
          <Button
            variant="outline"
            size="lg"
            className="hidden rounded-full sm:inline-flex"
          >
            Delete
          </Button>
        )}
        {room.roomStatusSummary?.occupancy?.available > 0 ? (
          <Button size="lg" className="rounded-full px-6 sm:px-8">
            <Link to={`/rooms/${room.slug}/book`} onClick={onClose}>
              <CalendarCheck className="size-4" />
              Book this room
            </Link>
          </Button>
        ) : (
          <Button size="lg" disabled className="rounded-full px-6 sm:px-8">
            Unavailable
          </Button>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- Dialog --------------------------------- */

type RoomTypeDetailsDialogProps = {
  slug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RoomTypeDetailsDialog({
  open,
  onOpenChange,
}: RoomTypeDetailsDialogProps) {
  const { room, isLoading, isError, refetch } = {
    room: roomTypeDetails,
    isLoading: false,
    isError: false,
    refetch: () => {},
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // Full screen on phones, large centred modal from sm up.
        // The built-in close button is hidden in favour of the one below (it sits on photos).
        className="h-svh w-full max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 p-0 sm:h-auto sm:max-h-153.75 sm:max-w-6xl sm:rounded-3xl sm:border [&>button.absolute]:hidden"
      >
        <div className="absolute top-3 right-3 z-20 sm:top-4 sm:right-4">
          <DialogClose>
            <Button
              size="icon"
              aria-label="Close"
              className="size-10 rounded-full border-0 bg-black/55 text-white backdrop-blur-md hover:bg-black/75"
            >
              <X className="size-5" />
            </Button>
          </DialogClose>
        </div>

        {isLoading || (!room && !isError) ? <LoadingState /> : null}
        {isError ? <ErrorState onRetry={refetch} /> : null}
        {room ? (
          <>
            <RoomContent room={room} />
            <BookingBar room={room} onClose={() => onOpenChange(false)} />
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
