import { motion, useReducedMotion } from "framer-motion";
import { BedDouble, CalendarCheck, Maximize2, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AvailableRoomListItem } from "@/features/public/public.types";
import { getAmenityIcon } from "@/lib/amenity-icons";
import { formatBed, formatPrice } from "@/lib/format";

type RoomCardProps = {
  room: AvailableRoomListItem;
  bookingSearch?: string;
  showTaxNote?: boolean;
  showAvailability?: boolean;
};

export function RoomCard({
  room,
  bookingSearch = "",
  showTaxNote = false,
  showAvailability = false,
}: RoomCardProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const roomPhoto = room.image;
  const isAvailable = room.availableRooms > 0;
  const visibleAmenities = room.amenities.slice(0, 2);
  const remainingAmenities = room.amenities.length - visibleAmenities.length;

  return (
    <motion.article
      className="h-full"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
    >
      <Card className="group h-full gap-0 overflow-hidden rounded-xl border-border bg-card py-0 text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none">
        <Link
          aria-label={`View ${room.name} details`}
          className="relative block aspect-[1.55] overflow-hidden bg-muted focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring"
          to={`/rooms/${room.slug}${bookingSearch}`}
        >
          {roomPhoto ? (
            <img
              alt={roomPhoto.altText ?? `${room.name} room`}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              height={480}
              loading="lazy"
              src={roomPhoto.url}
              width={768}
            />
          ) : (
            <span className="grid size-full place-items-center text-muted-foreground">
              <BedDouble aria-hidden="true" className="size-10" />
            </span>
          )}
          {showAvailability ? (
            <span
              className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-semibold ${isAvailable ? "bg-success text-success-foreground" : "bg-background text-muted-foreground"}`}
            >
              {isAvailable ? "Available" : "Sold out"}
            </span>
          ) : null}
        </Link>

        <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="line-clamp-1 font-heading text-xl leading-snug font-medium text-card-foreground sm:text-2xl">
                {room.name}
              </h2>
              <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                {room.description ||
                  "Explore the room details for more information."}
              </p>
            </div>
            <p className="shrink-0 text-right">
              <span className="block font-heading text-xl leading-tight font-medium text-primary sm:text-2xl">
                {formatPrice(room.basePrice)}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                per night
              </span>
              {showTaxNote ? (
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  Plus applicable GST
                </span>
              ) : null}
            </p>
          </div>

          <ul
            aria-label="Room details"
            className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:gap-3 sm:text-sm"
          >
            <li className="flex min-w-0 items-center gap-1.5">
              <BedDouble
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              <span className="truncate">
                {formatBed(room.bedType, room.bedCount)}
              </span>
            </li>
            <li className="flex min-w-0 items-center gap-1.5">
              <Users
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate">{room.maxGuests} guests max</span>
                {room.adults > 0 || room.children > 0 ? (
                  <span className="truncate text-[10px] text-muted-foreground">
                    {room.adults} {room.adults === 1 ? "adult" : "adults"} ·{" "}
                    {room.children} {room.children === 1 ? "child" : "children"}
                  </span>
                ) : null}
              </span>
            </li>
            <li className="flex min-w-0 items-center gap-1.5">
              {room.sizeSqFt ? (
                <>
                  <Maximize2
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  <span className="truncate">{room.sizeSqFt} sq ft</span>
                </>
              ) : (
                <span className="truncate text-muted-foreground">
                  Room size n/a
                </span>
              )}
            </li>
          </ul>

          {visibleAmenities.length > 0 ? (
            <ul
              aria-label="Room amenities"
              className="mt-3 flex min-h-7 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
            >
              {visibleAmenities.map((amenity) => {
                const Icon = getAmenityIcon(amenity.icon);
                return (
                  <li
                    className="inline-flex min-w-0 items-center gap-1.5"
                    key={amenity.name}
                    title={amenity.name}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-primary"
                    />
                    <span className="max-w-28 truncate">{amenity.name}</span>
                  </li>
                );
              })}
              {remainingAmenities > 0 ? (
                <li className="font-medium whitespace-nowrap text-foreground">
                  +{remainingAmenities} more
                </li>
              ) : null}
            </ul>
          ) : null}

          <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
            <Button
              className="h-10 min-w-0 px-2 text-sm sm:px-3"
              nativeButton={false}
              render={<Link to={`/rooms/${room.slug}${bookingSearch}`} />}
              variant={showAvailability ? "default" : "outline"}
            >
              View details
            </Button>
            {isAvailable ? (
              <Button
                className={`h-10 min-w-0 px-2 text-sm sm:px-3 ${showAvailability ? "border-border bg-background text-foreground hover:bg-muted" : ""}`}
                nativeButton={false}
                render={
                  <Link to={`/rooms/${room.slug}/book${bookingSearch}`} />
                }
                variant={showAvailability ? "outline" : "default"}
              >
                <CalendarCheck aria-hidden="true" className="size-4" />
                Book now
              </Button>
            ) : (
              <Button
                className="h-10 min-w-0 border-border bg-muted px-2 text-sm text-muted-foreground opacity-100 sm:px-3"
                disabled
                variant="outline"
              >
                Unavailable
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
