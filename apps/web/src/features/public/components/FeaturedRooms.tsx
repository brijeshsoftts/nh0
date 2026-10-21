import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { toRoomCard } from "@/pages/public/Rooms";

import type { AvailableRoomDetails } from "../public.types";
import { useAvailableRoom, useAvailableRooms } from "../useAvailableRooms";

import { RoomTypeCard } from "./RoomTypeCard";
import {
  type RoomTypeViewData,
  RoomTypeViewDialog,
} from "./RoomTypeViewDialog";

export function FeaturedRooms() {
  const reduceMotion = useReducedMotion() ?? false;
  const { rooms } = useAvailableRooms({ limit: 3 });
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);
  const cardRooms = rooms.map(toRoomCard);

  return (
    <>
      <section
        aria-labelledby="featured-rooms-heading"
        className="bg-secondary/35 text-foreground"
      >
        <div className="mx-auto max-w-360 px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
          <div className="mb-9 grid gap-6 md:mb-11 md:grid-cols-[1fr_0.8fr] md:items-end lg:mb-12">
            <div>
              <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
                The Nivara collection
              </p>
              <h2
                id="featured-rooms-heading"
                className="max-w-xl font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl lg:text-[44px]"
              >
                A room to feel at home in.
              </h2>
              <p className="mt-3 font-heading text-lg leading-snug text-muted-foreground sm:text-xl">
                Find your kind of comfort.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 md:items-end md:text-right">
              <p className="max-w-lg text-sm leading-6 text-muted-foreground md:text-[15px] md:leading-7">
                From an easy overnight stay to extra space to unwind, explore
                rooms designed to help you rest well.
              </p>
              <Link
                to="/rooms"
                className="group inline-flex min-h-10 items-center gap-2 border-b border-gold/60 pb-1 text-[10px] font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                View all rooms
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {cardRooms?.map((room) => (
              <RoomTypeCard
                key={room.id}
                room={room}
                onViewDetails={() => setSelectedRoomSlug(room.slug)}
                className="h-full"
                onBook={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRoomSlug ? (
          <RoomDetailsDialog
            key={selectedRoomSlug}
            slug={selectedRoomSlug}
            checkInDate={new Date().toISOString().split("T")[0]}
            checkOutDate={(() => {
              const date = new Date();
              date.setDate(date.getDate() + 1);
              return date.toISOString().split("T")[0];
            })()}
            open
            onOpenChange={(open) => {
              if (!open) setSelectedRoomSlug(null);
            }}
            reduceMotion={reduceMotion}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function RoomDetailsDialog({
  slug,
  checkInDate,
  checkOutDate,
  open,
  onOpenChange,
  reduceMotion,
}: {
  slug: string;
  checkInDate: string;
  checkOutDate: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reduceMotion: boolean;
}) {
  const { room, isLoading, isError, refetch } = useAvailableRoom(
    slug,
    checkInDate,
    checkOutDate
  );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
    >
      <RoomTypeViewDialog
        room={room ? toRoomDetails(room) : null}
        open={open}
        onOpenChange={onOpenChange}
        isLoading={isLoading}
        error={isError}
        onRetry={() => void refetch()}
      />
    </motion.div>
  );
}

function toRoomDetails(room: AvailableRoomDetails): RoomTypeViewData {
  return {
    id: room.id,
    name: room.name,
    slug: room.slug,
    description: room.description,
    images: room.images.map((image, index) => ({
      id: `${room.id}-image-${index}`,
      url: image.url,
      altText: image.altText ?? undefined,
      isPrimary: image.isPrimary,
      sortOrder: image.sortOrder,
    })),
    sizeSqFt: room.sizeSqFt,
    maxGuests: room.maxGuests,
    adults: room.adults,
    children: room.children,
    bedType: room.bedType,
    bedCount: room.bedCount,
    basePrice: room.basePrice,
    smokingAllowed: room.smokingAllowed,
    petsAllowed: room.petsAllowed,
    amenities: room.amenities,
    availableRooms: room.availability.isAvailable ? 1 : 0,
  };
}
