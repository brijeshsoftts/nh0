import { Link } from "react-router-dom";
import { BedDouble, CalendarCheck, Eye, Maximize2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getAmenityIcon } from "@/lib/amenity-icons";
import { formatBed, formatPrice } from "@/lib/format";
import { goldButton, goldIcon } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { AvailableRoomListItemResponse } from "@/types/room.types";

const VISIBLE_AMENITIES = 4;
const LOW_STOCK_THRESHOLD = 3;

type RoomCardProps = {
  room: AvailableRoomListItemResponse;
  onView: (slug: string) => void;
};

export function RoomCard({ room, onView }: RoomCardProps) {
  const soldOut = room.availableRooms <= 0;
  const lowStock = !soldOut && room.availableRooms <= LOW_STOCK_THRESHOLD;

  const visibleAmenities = room.amenities.slice(0, VISIBLE_AMENITIES);
  const hiddenAmenities = room.amenities.length - visibleAmenities.length;

  const guestBreakdown =
    room.children > 0
      ? `${room.adults} adults and ${room.children} ${room.children === 1 ? "child" : "children"}`
      : `${room.adults} adults`;

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-3xl border-border/60 py-0 transition-shadow duration-300 hover:shadow-2xl hover:shadow-amber-500/10 motion-reduce:transition-none">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        {room.image ? (
          <img
            src={room.image.url}
            alt={room.image.altText ?? room.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="grid size-full place-items-center bg-linear-to-br from-amber-100 to-stone-200 dark:from-stone-800 dark:to-stone-900">
            <BedDouble className={cn("size-12", goldIcon)} />
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
        />

        {(soldOut || lowStock) && (
          <Badge
            className={cn(
              "absolute top-4 left-4 border-0 px-3 py-1",
              soldOut
                ? "bg-neutral-900/85 text-white"
                : "bg-amber-500 text-neutral-950"
            )}
          >
            {soldOut ? "Fully booked" : `Only ${room.availableRooms} left`}
          </Badge>
        )}

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          <BedDouble className="size-3.5" />
          {formatBed(room.bedType, room.bedCount)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="font-display text-2xl leading-tight font-medium">
            {room.name}
          </h3>
          {room.description ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {room.description}
            </p>
          ) : null}
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {room.sizeSqFt ? (
            <li className="flex items-center gap-2">
              <Maximize2 className={cn("size-4", goldIcon)} />
              {room.sizeSqFt} sq ft
            </li>
          ) : null}
          <li
            className="flex items-center gap-2"
            title={`Sleeps ${guestBreakdown}`}
          >
            <Users className={cn("size-4", goldIcon)} />
            Up to {room.maxGuests} guests
          </li>
        </ul>

        {visibleAmenities.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {visibleAmenities.map((amenity) => {
              const Icon = getAmenityIcon(amenity.icon);
              return (
                <li
                  key={amenity.name}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-2.5 py-1 text-xs"
                >
                  <Icon className={cn("size-3.5", goldIcon)} />
                  {amenity.name}
                </li>
              );
            })}
            {hiddenAmenities > 0 && (
              <li className="inline-flex items-center rounded-full border border-dashed px-2.5 py-1 text-xs text-muted-foreground">
                +{hiddenAmenities} more
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto space-y-4 pt-2">
          <Separator />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="font-display text-3xl font-medium">
              {formatPrice(room.basePrice)}
            </span>
            <span className="text-sm text-muted-foreground">per night</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              aria-haspopup="dialog"
              onClick={() => onView(room.slug)}
            >
              <Eye className="size-4" />
              View
            </Button>

            {soldOut ? (
              <Button disabled className="rounded-full">
                <CalendarCheck className="size-4" />
                Book
              </Button>
            ) : (
              <Link to={`/rooms/${room.slug}/book`}>
                <Button className={cn("rounded-full", goldButton)}>
                  <CalendarCheck className="size-4" />
                  Book
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function RoomCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden rounded-3xl py-0" aria-hidden>
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <div className="space-y-4 p-6">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </Card>
  );
}
