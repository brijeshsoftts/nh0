import { addDays, format, startOfToday } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";
import {
  type RoomType,
  RoomTypeCard,
} from "@/features/public/components/RoomTypeCard";
import {
  type RoomTypeViewData,
  RoomTypeViewDialog,
} from "@/features/public/components/RoomTypeViewDialog";
import { HERO_IMAGE } from "@/features/public/public.mock";
import type { AvailableRoomDetails } from "@/features/public/public.types";
import {
  useAvailableRoom,
  useAvailableRooms,
} from "@/features/public/useAvailableRooms";

const PAGE_SIZE = 6;

function getQueryDate(
  params: URLSearchParams,
  currentName: string,
  legacyName: string
) {
  return params.get(currentName) ?? params.get(legacyName) ?? undefined;
}

function toRoomCard(room: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  maxGuests: number;
  adults: number;
  children: number;
  basePrice: number;
  bedType: string;
  bedCount: number;
  availableRooms: number;
  image: { url: string; altText: string | null } | null;
  amenities: { name: string; icon: string | null }[];
}): RoomType {
  return {
    id: room.id,
    name: room.name,
    slug: room.slug,
    description: room.description,
    primaryImage: room.image
      ? { url: room.image.url, altText: room.image.altText ?? undefined }
      : undefined,
    basePrice: room.basePrice,
    currency: "INR",
    maxGuests: room.maxGuests,
    adults: room.adults,
    children: room.children,
    bedType: room.bedType as RoomType["bedType"],
    bedCount: room.bedCount,
    numberOfRooms: room.availableRooms,
    amenities: room.amenities.map(({ name, icon }) => ({
      name,
      icon: icon ?? "",
    })),
    isActive: room.availableRooms > 0,
  };
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

export default function RoomsPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);

  const checkInDate = getQueryDate(searchParams, "checkIn", "check-in");
  const checkOutDate = getQueryDate(searchParams, "checkOut", "check-out");
  const adults = Math.max(1, Number(searchParams.get("adults")) || 2);
  const children = Math.max(0, Number(searchParams.get("children")) || 0);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const listParams = useMemo(
    () => ({
      ...(checkInDate && checkOutDate ? { checkInDate, checkOutDate } : {}),
      adults,
      children,
      page,
      limit: PAGE_SIZE,
    }),
    [checkInDate, checkOutDate, adults, children, page]
  );

  const { rooms, pagination, isLoading, isError, refetch } =
    useAvailableRooms(listParams);

  const fallbackCheckIn = checkInDate ?? format(startOfToday(), "yyyy-MM-dd");
  const fallbackCheckOut =
    checkOutDate ?? format(addDays(startOfToday(), 1), "yyyy-MM-dd");
  const totalPages = Math.max(
    1,
    Math.ceil((pagination?.total ?? 0) / PAGE_SIZE)
  );
  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => {
      const firstPage = Math.max(1, Math.min(page - 2, totalPages - 4));
      return firstPage + index;
    }
  );

  const changePage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
  };

  const cardRooms = rooms.map(toRoomCard);

  return (
    <>
      <section
        aria-labelledby="rooms-hero-heading"
        className="relative isolate z-10 overflow-visible bg-primary text-primary-foreground"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt=""
            fetchPriority="high"
            className="size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/50 to-foreground/20" />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/75 via-foreground/15 to-foreground/25" />
        </div>

        <div className="mx-auto flex min-h-82.5 max-w-360 flex-col items-center justify-center px-5 pt-16 pb-24 text-center sm:min-h-92.5 sm:px-8 sm:pt-20 sm:pb-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
          >
            <p className="mb-4 text-[10px] font-medium tracking-[0.24em] text-gold uppercase sm:text-xs">
              The Nivara collection
            </p>
            <h1
              id="rooms-hero-heading"
              className="font-heading text-4xl leading-tight font-normal tracking-[-0.035em] sm:text-5xl lg:text-[58px]"
            >
              A room for your stay.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-primary-foreground/80 sm:text-base sm:leading-7">
              Choose your dates and find a place to settle in.
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-300">
            <AvailabilitySearch />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="room-listings-heading"
        className="bg-background text-foreground"
      >
        <div className="mx-auto max-w-360 px-5 pt-36 pb-14 sm:px-8 sm:pt-40 sm:pb-16 lg:px-14 lg:pt-44 lg:pb-20 xl:px-20">
          <header className="mb-8 sm:mb-10">
            <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
              Find your comfort
            </p>
            <h2
              id="room-listings-heading"
              className="font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl"
            >
              Explore our rooms
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              Thoughtful spaces for a restful night and an easy stay.
            </p>
          </header>

          {isError ? (
            <div
              role="alert"
              className="flex flex-col items-start gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-muted-foreground">
                We couldn’t load the rooms just now. Please try again.
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="inline-flex min-h-11 items-center border-b border-gold/60 text-xs font-medium tracking-wider uppercase transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <p
              role="status"
              className="border-t border-border py-8 text-sm text-muted-foreground"
            >
              Finding rooms for your stay…
            </p>
          ) : cardRooms.length === 0 ? (
            <p className="border-t border-border py-8 text-sm leading-6 text-muted-foreground">
              No rooms match those dates and guest numbers. Try changing your
              search.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {cardRooms.map((room) => (
                  <RoomTypeCard
                    key={room.id}
                    room={room}
                    onViewDetails={() => setSelectedRoomSlug(room.slug)}
                    className="h-full"
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav
                  aria-label="Room listing pages"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-7"
                >
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={page <= 1}
                    onClick={() => changePage(page - 1)}
                    className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                  </button>
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      aria-label={`Page ${pageNumber}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                      onClick={() => changePage(pageNumber)}
                      className={`grid size-11 place-items-center border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${pageNumber === page ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-gold"}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={page >= totalPages}
                    onClick={() => changePage(page + 1)}
                    className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedRoomSlug ? (
          <RoomDetailsDialog
            key={selectedRoomSlug}
            slug={selectedRoomSlug}
            checkInDate={fallbackCheckIn}
            checkOutDate={fallbackCheckOut}
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
