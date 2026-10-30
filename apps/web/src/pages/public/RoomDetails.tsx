import { addDays, format, isValid, parseISO, startOfToday } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Cigarette,
  Expand,
  Images,
  Minus,
  PawPrint,
  Plus,
  Ruler,
  Users,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { RoomCard } from "@/features/public/components/RoomCard";
import type { AvailableRoomDetails } from "@/features/public/public.types";
import {
  useAvailableRoom,
  useAvailableRooms,
} from "@/features/public/useAvailableRooms";
import { getAmenityIcon } from "@/lib/amenity-icons";
import { formatBed, formatPrice } from "@/lib/format";

type StayDates = {
  checkInDate: string;
  checkOutDate: string;
  checkIn: Date;
  checkOut: Date;
};

function parseCount(
  value: string | null,
  fallback: number,
  min: number,
  max: number
) {
  if (value === null || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : fallback;
}

function getValidStay(searchParams: URLSearchParams): StayDates | null {
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  if (!checkInDate || !checkOutDate) return null;

  const checkIn = parseISO(checkInDate);
  const checkOut = parseISO(checkOutDate);
  if (
    !isValid(checkIn) ||
    !isValid(checkOut) ||
    checkIn < startOfToday() ||
    checkOut <= checkIn
  ) {
    return null;
  }

  return { checkInDate, checkOutDate, checkIn, checkOut };
}

function getRoomPhotoAlt(
  altText: string | null,
  roomName: string,
  photoIndex: number
) {
  const trimmedAlt = altText?.trim();
  if (
    !trimmedAlt ||
    /^(pasted image|image)(?:\s*\(\d+\))?(?:\.[a-z0-9]+)?$/i.test(trimmedAlt)
  ) {
    return `${roomName}, photo ${photoIndex + 1}`;
  }
  return trimmedAlt;
}

function buildBookingSearch(
  stay: StayDates | null,
  adults: number,
  children: number
) {
  const params = new URLSearchParams({
    adults: String(adults),
    children: String(children),
  });
  if (stay) {
    params.set("checkInDate", stay.checkInDate);
    params.set("checkOutDate", stay.checkOutDate);
  }
  return `?${params.toString()}`;
}

function RoomGallery({
  room,
  reduceMotion,
}: {
  room: AvailableRoomDetails;
  reduceMotion: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImageUrls, setFailedImageUrls] = useState<Set<string>>(
    () => new Set()
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const photos = room.images
    .filter((image) => !failedImageUrls.has(image.url))
    .sort(
      (first, second) =>
        Number(second.isPrimary) - Number(first.isPrimary) ||
        first.sortOrder - second.sortOrder
    );
  const safeIndex = Math.min(activeIndex, Math.max(photos.length - 1, 0));

  useEffect(() => {
    if (!lightboxOpen || photos.length < 2) return;

    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [lightboxOpen, photos.length]);

  const activePhoto = photos[safeIndex];
  const movePhoto = (direction: number) => {
    setActiveIndex(
      (index) => (index + direction + photos.length) % photos.length
    );
  };
  const handleImageError = (url: string) => {
    setFailedImageUrls((current) => new Set(current).add(url));
  };

  const desktopSupportPhotos = [1, 2, 3]
    .map((offset) => {
      const photoIndex = (safeIndex + offset) % photos.length;
      return photos[photoIndex]
        ? { photo: photos[photoIndex], photoIndex }
        : null;
    })
    .filter(
      (item): item is { photo: (typeof photos)[number]; photoIndex: number } =>
        item !== null
    )
    .slice(0, Math.min(3, Math.max(photos.length - 1, 0)));

  return (
    <section aria-label="Room photographs" className="min-w-0">
      {activePhoto ? (
        <>
          <div className="hidden aspect-[1.78] grid-cols-[1.58fr_1fr_1fr] grid-rows-2 gap-3 md:grid">
            <motion.button
              aria-label={`View photo ${safeIndex + 1} of ${photos.length} larger`}
              className={`group relative col-start-1 row-span-2 min-w-0 cursor-zoom-in overflow-hidden bg-muted text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring ${photos.length === 1 ? "col-span-3" : ""}`}
              onClick={() => setLightboxOpen(true)}
              type="button"
              whileTap={reduceMotion ? undefined : { scale: 0.995 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  alt={getRoomPhotoAlt(
                    activePhoto.altText,
                    room.name,
                    safeIndex
                  )}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 size-full object-cover"
                  initial={reduceMotion ? false : { opacity: 0.45 }}
                  key={activePhoto.url}
                  loading="eager"
                  onError={() => handleImageError(activePhoto.url)}
                  src={activePhoto.url}
                  transition={{ duration: reduceMotion ? 0 : 0.24 }}
                />
              </AnimatePresence>
              <span className="absolute right-4 bottom-4 inline-flex size-10 items-center justify-center bg-background/95 text-foreground shadow-sm transition-colors group-hover:bg-background">
                <Expand aria-hidden="true" className="size-4" />
              </span>
            </motion.button>

            {desktopSupportPhotos.map(({ photo, photoIndex }, index) => {
              const placement =
                photos.length === 2
                  ? "col-start-2 col-span-2 row-span-2"
                  : photos.length === 3
                    ? index === 0
                      ? "col-start-2 col-span-2 row-start-1"
                      : "col-start-2 col-span-2 row-start-2"
                    : index === 0
                      ? "col-start-2 row-start-1"
                      : index === 1
                        ? "col-start-3 row-start-1"
                        : "col-start-2 col-span-2 row-start-2";

              return (
                <button
                  aria-label={`Make photo ${photoIndex + 1} of ${photos.length} the main photo`}
                  className={`group relative min-h-0 min-w-0 cursor-pointer overflow-hidden bg-muted text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring ${placement}`}
                  key={photo.url}
                  onClick={() => setActiveIndex(photoIndex)}
                  type="button"
                >
                  <img
                    alt={getRoomPhotoAlt(photo.altText, room.name, photoIndex)}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    loading="lazy"
                    onError={() => handleImageError(photo.url)}
                    src={photo.url}
                  />
                  {photoIndex === safeIndex ? (
                    <span className="absolute inset-0 ring-2 ring-primary ring-inset" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="relative md:hidden">
            <motion.button
              aria-label={`View photo ${safeIndex + 1} of ${photos.length} larger`}
              className="group relative block aspect-[1.12] w-full cursor-zoom-in touch-pan-y overflow-hidden bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring"
              onClick={() => setLightboxOpen(true)}
              onTouchStart={(event) => {
                touchStartX.current = event.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const startX = touchStartX.current;
                const endX = event.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (
                  startX === null ||
                  endX === undefined ||
                  photos.length < 2
                ) {
                  return;
                }
                const distance = endX - startX;
                if (Math.abs(distance) > 48) {
                  event.preventDefault();
                  movePhoto(distance > 0 ? -1 : 1);
                }
              }}
              type="button"
              whileTap={reduceMotion ? undefined : { scale: 0.995 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  alt={getRoomPhotoAlt(
                    activePhoto.altText,
                    room.name,
                    safeIndex
                  )}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 size-full object-cover"
                  initial={reduceMotion ? false : { opacity: 0.45 }}
                  key={activePhoto.url}
                  loading="eager"
                  onError={() => handleImageError(activePhoto.url)}
                  src={activePhoto.url}
                  transition={{ duration: reduceMotion ? 0 : 0.24 }}
                />
              </AnimatePresence>
              <span className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center bg-background/95 text-foreground shadow-sm">
                <Expand aria-hidden="true" className="size-4" />
              </span>
              <span className="absolute bottom-3 left-3 bg-background/95 px-3 py-2 text-xs font-medium text-foreground">
                {safeIndex + 1} / {photos.length}
              </span>
            </motion.button>
            {photos.length > 1 ? (
              <>
                <Button
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-3 size-10 -translate-y-1/2 bg-background/95"
                  onClick={() => movePhoto(-1)}
                  size="icon"
                  type="button"
                  variant="secondary"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </Button>
                <Button
                  aria-label="Next photo"
                  className="absolute top-1/2 right-3 size-10 -translate-y-1/2 bg-background/95"
                  onClick={() => movePhoto(1)}
                  size="icon"
                  type="button"
                  variant="secondary"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </Button>
              </>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {photos.length} room photo{photos.length === 1 ? "" : "s"}
              {photos.length > 1 ? (
                <span className="mt-1 block text-xs md:hidden">
                  Swipe to explore the gallery
                </span>
              ) : null}
            </p>
            <Button
              className="h-10 shrink-0 px-3"
              onClick={() => setLightboxOpen(true)}
              type="button"
              variant="outline"
            >
              <Images aria-hidden="true" className="size-4" />
              View all photos
            </Button>
          </div>
        </>
      ) : (
        <div className="grid aspect-[1.12] place-items-center bg-muted text-muted-foreground md:aspect-[1.78]">
          <div className="flex flex-col items-center gap-3">
            <BedDouble
              aria-hidden="true"
              className="size-10"
              strokeWidth={1.4}
            />
            <p className="text-sm">Room photography unavailable</p>
          </div>
        </div>
      )}

      <Dialog onOpenChange={setLightboxOpen} open={lightboxOpen}>
        <DialogContent
          className="max-w-6xl gap-3 border-border bg-background p-3 sm:p-5"
          showCloseButton
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{room.name} photos</DialogTitle>
            <DialogDescription>
              Photo {safeIndex + 1} of {photos.length}
            </DialogDescription>
          </DialogHeader>
          {activePhoto ? (
            <div className="relative grid min-h-56 place-items-center bg-muted sm:min-h-96">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  alt={getRoomPhotoAlt(
                    activePhoto.altText,
                    room.name,
                    safeIndex
                  )}
                  animate={{ opacity: 1 }}
                  className="max-h-[76svh] w-full object-contain"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  key={activePhoto.url}
                  onError={() => handleImageError(activePhoto.url)}
                  src={activePhoto.url}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                />
              </AnimatePresence>
              {photos.length > 1 ? (
                <>
                  <Button
                    aria-label="Previous photo"
                    className="absolute left-3 size-11 rounded-full bg-background/95"
                    onClick={() => movePhoto(-1)}
                    size="icon"
                    type="button"
                    variant="secondary"
                  >
                    <ChevronLeft aria-hidden="true" className="size-5" />
                  </Button>
                  <Button
                    aria-label="Next photo"
                    className="absolute right-3 size-11 rounded-full bg-background/95"
                    onClick={() => movePhoto(1)}
                    size="icon"
                    type="button"
                    variant="secondary"
                  >
                    <ChevronRight aria-hidden="true" className="size-5" />
                  </Button>
                </>
              ) : null}
            </div>
          ) : null}
          <p
            aria-live="polite"
            className="text-center text-sm text-muted-foreground"
          >
            {safeIndex + 1} of {photos.length}
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function BookingAction({
  room,
  stay,
  exceedsCapacity,
  bookingSearch,
  label = "Book now",
}: {
  room: AvailableRoomDetails;
  stay: StayDates | null;
  exceedsCapacity: boolean;
  bookingSearch: string;
  label?: string;
}) {
  if (!stay) {
    return (
      <Button
        className="h-12 w-full font-semibold"
        nativeButton={false}
        render={<Link to="/rooms#availability" />}
        variant="default"
      >
        <CalendarDays aria-hidden="true" className="size-4" />
        Choose dates
      </Button>
    );
  }

  if (exceedsCapacity) {
    return (
      <Button className="h-12 w-full" disabled variant="outline">
        Guest limit exceeded
      </Button>
    );
  }

  if (!room.availability.isAvailable) {
    return (
      <Button className="h-12 w-full" disabled variant="outline">
        Unavailable for these dates
      </Button>
    );
  }

  return (
    <Button
      className="h-12 w-full font-semibold"
      nativeButton={false}
      render={<Link to={`/rooms/${room.slug}/book${bookingSearch}`} />}
      variant="default"
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Button>
  );
}

function StaySelector({
  stay,
  adults,
  children,
  onApply,
}: {
  stay: StayDates | null;
  adults: number;
  children: number;
  onApply: (values: {
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
  }) => void;
}) {
  const today = format(startOfToday(), "yyyy-MM-dd");
  const [checkInDate, setCheckInDate] = useState(stay?.checkInDate ?? today);
  const [checkOutDate, setCheckOutDate] = useState(
    stay?.checkOutDate ?? format(addDays(startOfToday(), 1), "yyyy-MM-dd")
  );
  const [guestAdults, setGuestAdults] = useState(adults);
  const [guestChildren, setGuestChildren] = useState(children);
  const minCheckOut = format(
    addDays(parseISO(checkInDate || today), 1),
    "yyyy-MM-dd"
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !checkInDate ||
      checkInDate < today ||
      !checkOutDate ||
      checkOutDate <= checkInDate
    ) {
      return;
    }
    onApply({
      checkInDate,
      checkOutDate,
      adults: guestAdults,
      children: guestChildren,
    });
  };

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <label className="min-w-0 text-xs font-medium text-muted-foreground">
          Check-in
          <span className="relative mt-1.5 block">
            <CalendarDays
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary"
            />
            <input
              className="h-11 w-full min-w-0 rounded-md border border-input bg-background py-2 pr-2 pl-9 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
              min={today}
              onChange={(event) => {
                const next = event.target.value;
                setCheckInDate(next);
                if (checkOutDate <= next) {
                  setCheckOutDate(
                    format(addDays(parseISO(next), 1), "yyyy-MM-dd")
                  );
                }
              }}
              required
              type="date"
              value={checkInDate}
            />
          </span>
        </label>
        <label className="min-w-0 text-xs font-medium text-muted-foreground">
          Check-out
          <span className="relative mt-1.5 block">
            <CalendarCheck
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary"
            />
            <input
              className="h-11 w-full min-w-0 rounded-md border border-input bg-background py-2 pr-2 pl-9 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
              min={minCheckOut}
              onChange={(event) => setCheckOutDate(event.target.value)}
              required
              type="date"
              value={checkOutDate}
            />
          </span>
        </label>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {[
          {
            label: "Adults",
            value: guestAdults,
            min: 1,
            max: 10,
            setValue: setGuestAdults,
          },
          {
            label: "Children",
            value: guestChildren,
            min: 0,
            max: 10,
            setValue: setGuestChildren,
          },
        ].map(({ label, value, min, max, setValue }) => (
          <div
            className="flex min-h-14 items-center justify-between gap-3 py-2"
            key={label}
          >
            <span className="text-sm text-foreground">{label}</span>
            <span className="flex items-center gap-3">
              <Button
                aria-label={`Decrease ${label.toLowerCase()}`}
                className="size-9"
                disabled={value <= min}
                onClick={() => setValue(Math.max(min, value - 1))}
                size="icon"
                type="button"
                variant="outline"
              >
                <Minus aria-hidden="true" className="size-4" />
              </Button>
              <span
                aria-live="polite"
                className="w-4 text-center text-sm tabular-nums"
              >
                {value}
              </span>
              <Button
                aria-label={`Increase ${label.toLowerCase()}`}
                className="size-9"
                disabled={value >= max}
                onClick={() => setValue(Math.min(max, value + 1))}
                size="icon"
                type="button"
                variant="outline"
              >
                <Plus aria-hidden="true" className="size-4" />
              </Button>
            </span>
          </div>
        ))}
      </div>
      <Button className="h-11 w-full" type="submit" variant="outline">
        Update stay
      </Button>
    </form>
  );
}

function BookingPanel({
  room,
  stay,
  adults,
  children,
  exceedsCapacity,
  bookingSearch,
  onApplyStay,
}: {
  room: AvailableRoomDetails;
  stay: StayDates | null;
  adults: number;
  children: number;
  exceedsCapacity: boolean;
  bookingSearch: string;
  onApplyStay: (values: {
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
  }) => void;
}) {
  return (
    <motion.aside
      aria-label="Booking summary"
      className="border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
        Reserve your stay
      </p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="font-heading text-3xl font-medium text-foreground">
          {formatPrice(room.basePrice)}
        </span>
        <span className="text-sm text-muted-foreground">per night</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Plus applicable GST</p>

      <StaySelector
        adults={adults}
        children={children}
        onApply={onApplyStay}
        stay={stay}
      />

      <div aria-live="polite" className="min-h-12 py-3 text-sm">
        {!stay ? (
          <p className="text-muted-foreground">
            Select your stay dates to check availability.
          </p>
        ) : exceedsCapacity ? (
          <p className="text-destructive">
            This room is configured for up to {room.adults} adults and{" "}
            {room.children} children, with {room.maxGuests} guests total.
          </p>
        ) : room.availability.isAvailable ? (
          <p className="font-medium text-success">Available for these dates</p>
        ) : (
          <p className="text-muted-foreground">
            This room is unavailable for the selected dates.
          </p>
        )}
      </div>
      <BookingAction
        bookingSearch={bookingSearch}
        exceedsCapacity={exceedsCapacity}
        room={room}
        stay={stay}
      />
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Choose your dates and plan your stay with Nivara.
      </p>
    </motion.aside>
  );
}

function RoomDetailsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading room details">
      <Skeleton className="aspect-[1.3] w-full rounded-none md:aspect-[2.05]" />
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_19rem]">
        <div className="space-y-5">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    </div>
  );
}

function RoomDetailsContent({
  room,
  stay,
  adults,
  children,
  bookingSearch,
  reduceMotion,
}: {
  room: AvailableRoomDetails;
  stay: StayDates | null;
  adults: number;
  children: number;
  bookingSearch: string;
  reduceMotion: boolean;
}) {
  const navigate = useNavigate();
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const exceedsCapacity =
    adults + children > room.maxGuests ||
    adults > room.adults ||
    children > room.children;
  const applyStay = (values: {
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
  }) => {
    const params = new URLSearchParams({
      checkInDate: values.checkInDate,
      checkOutDate: values.checkOutDate,
      adults: String(values.adults),
      children: String(values.children),
    });
    navigate(`/rooms/${room.slug}?${params.toString()}`);
    setMobileBookingOpen(false);
  };
  const { rooms: availableRooms, isLoading: isLoadingRooms } =
    useAvailableRooms({
      ...(stay
        ? {
            checkInDate: stay.checkInDate,
            checkOutDate: stay.checkOutDate,
          }
        : {}),
      adults,
      children,
      page: 1,
      limit: 4,
    });
  const otherRooms = availableRooms
    .filter((availableRoom) => availableRoom.id !== room.id)
    .slice(0, 3)
    .map((availableRoom) =>
      availableRoom.image
        ? {
            ...availableRoom,
            image: {
              ...availableRoom.image,
              altText: getRoomPhotoAlt(
                availableRoom.image.altText,
                availableRoom.name,
                0
              ),
            },
          }
        : availableRoom
    );
  const closingImage = otherRooms.find((availableRoom) => availableRoom.image)
    ?.image?.url;

  return (
    <>
      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.75fr)_minmax(20rem,0.95fr)] lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <Link className="transition-colors hover:text-foreground" to="/">
                Home
              </Link>
              <ChevronRight aria-hidden="true" className="size-3.5" />
              <Link
                className="transition-colors hover:text-foreground"
                to="/rooms"
              >
                Rooms
              </Link>
              <ChevronRight aria-hidden="true" className="size-3.5" />
              <span
                aria-current="page"
                className="max-w-48 truncate text-foreground"
              >
                {room.name}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
                The Nivara collection
              </p>
              <h1 className="mt-2 font-heading text-4xl leading-[1.08] font-medium tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl">
                {room.name}
              </h1>
            </div>

            <ul
              aria-label="Room specifications"
              className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-4 text-sm text-foreground"
            >
              <li className="inline-flex items-center gap-2">
                <BedDouble aria-hidden="true" className="size-4 text-primary" />
                {formatBed(room.bedType, room.bedCount)}
              </li>
              {room.sizeSqFt ? (
                <li className="inline-flex items-center gap-2">
                  <Ruler aria-hidden="true" className="size-4 text-primary" />
                  {room.sizeSqFt} sq ft
                </li>
              ) : null}
              <li className="inline-flex items-center gap-2">
                <Users aria-hidden="true" className="size-4 text-primary" />
                Maximum {room.maxGuests} guests
              </li>
              <li className="inline-flex items-center gap-2">
                <Users aria-hidden="true" className="size-4 text-primary" />
                {room.adults} adult{room.adults === 1 ? "" : "s"}
              </li>
              <li className="inline-flex items-center gap-2">
                <Users aria-hidden="true" className="size-4 text-primary" />
                {room.children} {room.children === 1 ? "child" : "children"}
              </li>
            </ul>
          </motion.div>

          <div className="mt-6 sm:mt-8">
            <RoomGallery
              key={room.id}
              reduceMotion={reduceMotion}
              room={room}
            />
          </div>

          <section
            aria-labelledby="room-space-title"
            className="mt-10 sm:mt-12"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
              A closer look
            </p>
            <h2
              className="mt-2 font-heading text-2xl font-medium text-foreground sm:text-3xl"
              id="room-space-title"
            >
              Designed around your comfort.
            </h2>
            {room.description ? (
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                {room.description}
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Room details are not available yet.
              </p>
            )}
          </section>

          <div className="mt-10 grid gap-10 sm:mt-12">
            <section aria-labelledby="room-amenities-title">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
                    Room amenities
                  </p>
                  <h2
                    className="mt-1 font-heading text-2xl font-medium text-foreground sm:text-3xl"
                    id="room-amenities-title"
                  >
                    Thoughtful comforts, in every detail.
                  </h2>
                </div>
                {room.amenities.length ? (
                  <p className="text-sm text-muted-foreground">
                    {room.amenities.length} listed
                  </p>
                ) : null}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                The amenities below are listed for this room type.
              </p>
              {room.amenities.length ? (
                <ul className="mt-2 grid gap-x-8 sm:grid-cols-2">
                  {(showAllAmenities
                    ? room.amenities
                    : room.amenities.slice(0, 8)
                  ).map((amenity) => {
                    const Icon = getAmenityIcon(amenity.icon ?? null);
                    return (
                      <li
                        className="flex min-w-0 items-center gap-3 border-b border-border py-4 text-sm text-foreground"
                        key={amenity.id}
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-4 shrink-0 text-primary"
                          strokeWidth={1.7}
                        />
                        <span>{amenity.name}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-5 text-sm text-muted-foreground">
                  No amenities have been listed for this room.
                </p>
              )}
              {room.amenities.length > 8 ? (
                <Button
                  className="mt-4 h-10 px-3"
                  onClick={() => setShowAllAmenities((visible) => !visible)}
                  type="button"
                  variant="outline"
                >
                  {showAllAmenities
                    ? "Show fewer amenities"
                    : "View all amenities"}
                </Button>
              ) : null}
            </section>

            <section aria-labelledby="room-policies-title">
              <h2
                className="font-heading text-2xl font-medium text-foreground sm:text-3xl"
                id="room-policies-title"
              >
                Before you settle in.
              </h2>
              <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                <li className="flex items-center gap-3 border-b border-border py-4 text-sm">
                  <Cigarette
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  <span className="text-foreground">
                    Smoking{" "}
                    {room.smokingAllowed ? "permitted" : "not permitted"}
                  </span>
                </li>
                <li className="flex items-center gap-3 border-b border-border py-4 text-sm">
                  <PawPrint
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                  <span className="text-foreground">
                    Pets {room.petsAllowed ? "permitted" : "not permitted"}
                  </span>
                </li>
              </ul>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Check-in, check-out and cancellation details are not listed
                here.
                <Link
                  className="ml-1 font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
                  to="/contact"
                >
                  Contact us
                </Link>
                for assistance.
              </p>
            </section>

            <section aria-labelledby="room-faq-title">
              <h2
                className="mb-4 font-heading text-2xl font-medium text-foreground sm:text-3xl"
                id="room-faq-title"
              >
                Good to know.
              </h2>
              <Accordion className="border-t border-border">
                <AccordionItem value="capacity">
                  <AccordionTrigger className="min-h-14 rounded-none px-0 py-4 text-left text-base font-medium hover:no-underline">
                    How many guests can stay in this room?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    This room accommodates up to {room.maxGuests} guests, with
                    configured capacity for {room.adults} adult
                    {room.adults === 1 ? "" : "s"} and {room.children}{" "}
                    {room.children === 1 ? "child" : "children"}.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bed">
                  <AccordionTrigger className="min-h-14 rounded-none px-0 py-4 text-left text-base font-medium hover:no-underline">
                    What type of bed is available?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    This room has {formatBed(room.bedType, room.bedCount)}.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="amenities">
                  <AccordionTrigger className="min-h-14 rounded-none px-0 py-4 text-left text-base font-medium hover:no-underline">
                    What amenities are included?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {room.amenities.length
                      ? `The listed amenities are ${room.amenities.map((amenity) => amenity.name).join(", ")}.`
                      : "There are no amenities listed for this room yet."}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="policies">
                  <AccordionTrigger className="min-h-14 rounded-none px-0 py-4 text-left text-base font-medium hover:no-underline">
                    Are smoking and pets allowed?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    Smoking is{" "}
                    {room.smokingAllowed ? "permitted" : "not permitted"} and
                    pets are {room.petsAllowed ? "permitted" : "not permitted"}{" "}
                    in this room.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="reservation">
                  <AccordionTrigger className="min-h-14 rounded-none px-0 py-4 text-left text-base font-medium hover:no-underline">
                    Can I modify a reservation?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    Please contact Nivara for help with an existing reservation.
                    Any applicable terms are shown with your booking.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="check-in">
                  <AccordionTrigger className="min-h-14 rounded-none px-0 py-4 text-left text-base font-medium hover:no-underline">
                    What are the check-in timings?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    Check-in and check-out times are not listed here. Contact us
                    before your stay for the latest details.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <BookingPanel
              adults={adults}
              bookingSearch={bookingSearch}
              children={children}
              exceedsCapacity={exceedsCapacity}
              onApplyStay={applyStay}
              room={room}
              stay={stay}
            />
            <p className="mt-3 px-1 text-xs leading-5 text-muted-foreground">
              Room details and availability are provided by Nivara Hotels.
            </p>
          </div>
        </div>
      </div>

      {otherRooms.length || isLoadingRooms ? (
        <section
          aria-labelledby="other-rooms-title"
          className="mt-14 border-t border-border pt-10 sm:mt-16 sm:pt-12"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">More to discover</p>
              <h2
                className="mt-1 font-heading text-2xl font-medium text-foreground sm:text-3xl"
                id="other-rooms-title"
              >
                Explore other ways to stay.
              </h2>
            </div>
            <Link
              className="hidden min-h-11 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary sm:inline-flex"
              to={`/rooms${bookingSearch}`}
            >
              All rooms <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          {isLoadingRooms ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div className="space-y-3" key={index}>
                  <Skeleton className="aspect-[1.55] w-full rounded-none" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherRooms.map((otherRoom) => (
                <RoomCard
                  bookingSearch={bookingSearch}
                  key={otherRoom.id}
                  room={otherRoom}
                  showAvailability={Boolean(stay)}
                  showTaxNote
                />
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section className="relative isolate mt-12 overflow-hidden bg-secondary text-secondary-foreground sm:mt-16">
        {closingImage ? (
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
            src={closingImage}
          />
        ) : null}
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative flex flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl leading-tight font-medium sm:text-4xl">
              Your stay at Nivara awaits.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-secondary-foreground/85 sm:text-base">
              Choose your dates and look forward to a comfortable, thoughtfully
              arranged stay.
            </p>
          </div>
          <div className="hidden w-full sm:block sm:w-64">
            <BookingAction
              bookingSearch={bookingSearch}
              exceedsCapacity={exceedsCapacity}
              label="Book this room"
              room={room}
              stay={stay}
            />
          </div>
          <Button
            className="h-11 w-full font-semibold sm:hidden"
            onClick={() => setMobileBookingOpen(true)}
          >
            Book this room
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <p className="min-w-0">
            <span className="block truncate font-heading text-xl font-medium text-foreground">
              {formatPrice(room.basePrice)}
            </span>
            <span className="block text-xs text-muted-foreground">
              per night · plus applicable GST
            </span>
          </p>
          <div className="w-52 max-w-[58%]">
            <Button
              className="h-12 w-full font-semibold"
              onClick={() => setMobileBookingOpen(true)}
            >
              Book now
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet onOpenChange={setMobileBookingOpen} open={mobileBookingOpen}>
        <SheetContent
          className="max-h-[88svh] gap-0 overflow-y-auto rounded-t-lg border-border px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 lg:hidden"
          side="bottom"
        >
          <SheetHeader className="px-0 pb-2">
            <SheetTitle>Plan your stay</SheetTitle>
            <SheetDescription>
              Choose dates and guests to check this room’s availability.
            </SheetDescription>
          </SheetHeader>
          <BookingPanel
            adults={adults}
            bookingSearch={bookingSearch}
            children={children}
            exceedsCapacity={exceedsCapacity}
            onApplyStay={applyStay}
            room={room}
            stay={stay}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function RoomDetailsPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion() ?? false;
  const stay = getValidStay(searchParams);
  const adults = parseCount(searchParams.get("adults"), 2, 1, 10);
  const children = parseCount(searchParams.get("children"), 0, 0, 10);
  const bookingSearch = buildBookingSearch(stay, adults, children);
  const { room, isLoading, isError, refetch } = useAvailableRoom(
    slug ?? null,
    stay?.checkInDate,
    stay?.checkOutDate
  );

  return (
    <main className="min-w-0 bg-background pb-24 text-foreground lg:pb-12">
      <div className="container mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8">
        {isLoading ? (
          <RoomDetailsSkeleton />
        ) : isError || !room ? (
          <div className="border-y border-border py-16 text-center sm:py-20">
            <p className="text-sm font-medium text-muted-foreground">
              Room details
            </p>
            <h1 className="mt-2 font-heading text-3xl font-medium text-foreground sm:text-4xl">
              This room could not be loaded
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              The room may no longer be available. Return to the room list or
              try loading its details again.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={() => void refetch()} variant="outline">
                Try again
              </Button>
              <Button nativeButton={false} render={<Link to="/rooms" />}>
                <ArrowLeft aria-hidden="true" className="size-4" />
                Browse rooms
              </Button>
            </div>
          </div>
        ) : (
          <RoomDetailsContent
            key={bookingSearch}
            adults={adults}
            bookingSearch={bookingSearch}
            children={children}
            reduceMotion={reduceMotion}
            room={room}
            stay={stay}
          />
        )}
      </div>
    </main>
  );
}
