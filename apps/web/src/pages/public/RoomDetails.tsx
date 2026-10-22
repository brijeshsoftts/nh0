import {
  addDays,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfToday,
} from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cigarette,
  CigaretteOff,
  Clock,
  Coffee,
  DoorOpen,
  Maximize2,
  Minus,
  PawPrint,
  Plus,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  XCircle,
} from "lucide-react";
import { type FormEvent, useId, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAvailableRoom } from "@/features/public/useAvailableRooms";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Helpers & Formatters                                                       */
/* -------------------------------------------------------------------------- */

function formatMoney(amount: number, currency: string = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

function formatBedType(bedType: string) {
  const labels: Record<string, string> = {
    SINGLE: "Single bed",
    TWIN: "Twin beds",
    DOUBLE: "Double bed",
    QUEEN: "Queen bed",
    KING: "King bed",
    SUPER_KING: "Super king bed",
    BUNK: "Bunk beds",
    SOFA_BED: "Sofa bed",
    OTHER: "Bed arrangement",
  };

  return (
    labels[bedType] ??
    bedType
      .toLowerCase()
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function AmenityIcon({ name }: { name?: string }) {
  const iconName = (name ?? "").toLowerCase();

  const Icon =
    iconName.includes("wifi") || iconName.includes("internet")
      ? Wifi
      : iconName.includes("bath") || iconName.includes("shower")
        ? Bath
        : iconName.includes("coffee") || iconName.includes("tea")
          ? Coffee
          : iconName.includes("door") || iconName.includes("balcony")
            ? DoorOpen
            : iconName.includes("bed")
              ? BedDouble
              : iconName.includes("security") || iconName.includes("safe")
                ? ShieldCheck
                : Sparkles;

  return <Icon className="size-4 shrink-0 text-gold" strokeWidth={1.5} />;
}

function parseValidIsoDate(value: string | null): string | undefined {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime())
    ? undefined
    : format(parsed, "yyyy-MM-dd");
}

/* -------------------------------------------------------------------------- */
/* Room Image Gallery Component                                               */
/* -------------------------------------------------------------------------- */

interface GalleryImage {
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

function RoomGallery({
  images,
  roomName,
  reduceMotion,
}: {
  images: GalleryImage[];
  roomName: string;
  reduceMotion: boolean;
}) {
  const sortedImages = useMemo(() => {
    return [...images].sort(
      (a, b) =>
        Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder
    );
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const count = sortedImages.length;
  const currentImage = count > 0 ? sortedImages[activeIndex % count] : null;

  const prevImage = () => {
    if (count <= 1) return;
    setActiveIndex((current) => (current - 1 + count) % count);
  };

  const nextImage = () => {
    if (count <= 1) return;
    setActiveIndex((current) => (current + 1) % count);
  };

  return (
    <section
      aria-label={`${roomName} gallery`}
      className="overflow-hidden border border-border bg-card"
    >
      {/* Featured Main Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary sm:aspect-[16/9]">
        <AnimatePresence mode="wait">
          {currentImage ? (
            <motion.img
              key={currentImage.url}
              src={currentImage.url}
              alt={currentImage.altText ?? roomName}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: "easeOut",
              }}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <BedDouble className="size-12 text-gold" strokeWidth={1.2} />
              <span className="text-xs tracking-wider uppercase">
                Room photography coming soon
              </span>
            </div>
          )}
        </AnimatePresence>

        {/* Gradient overlays for aesthetic depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Collection Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <span className="border border-white/30 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase backdrop-blur-sm">
            Nivara Collection
          </span>
        </div>

        {/* Prev / Next controls */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous room photo"
              className="absolute top-1/2 left-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white sm:left-4 sm:size-10"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next room photo"
              className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:size-10"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>

            {/* Counter */}
            <div
              aria-live="polite"
              className="absolute right-4 bottom-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs tracking-widest text-white backdrop-blur-sm"
            >
              <span className="font-medium">
                {String((activeIndex % count) + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-white/60">/</span>
              <span className="text-white/80">
                {String(count).padStart(2, "0")}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-border bg-card p-3 sm:p-4">
          {sortedImages.map((image, index) => {
            const isSelected = index === activeIndex % count;
            return (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo ${index + 1}`}
                aria-pressed={isSelected}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-16 sm:w-24",
                  isSelected
                    ? "border-primary opacity-100 ring-1 ring-primary"
                    : "border-border opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={image.url}
                  alt={image.altText ?? `${roomName} thumbnail ${index + 1}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Guest Selector Counter Component                                           */
/* -------------------------------------------------------------------------- */

function GuestCounter({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid size-7 place-items-center border border-border text-foreground transition hover:border-gold focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="size-3" aria-hidden="true" />
        </button>

        <span
          className="w-5 text-center text-xs font-medium tabular-nums"
          aria-live="polite"
        >
          {value}
        </span>

        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid size-7 place-items-center border border-border text-foreground transition hover:border-gold focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="size-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Room Details Content Component                                             */
/* -------------------------------------------------------------------------- */

function RoomDetailsContent() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion() ?? false;
  const formId = useId();

  const today = startOfToday();
  const todayString = format(today, "yyyy-MM-dd");
  const defaultCheckOutString = format(addDays(today, 1), "yyyy-MM-dd");

  // Read URL query parameters
  const queryCheckIn = parseValidIsoDate(
    searchParams.get("checkIn") ?? searchParams.get("check-in")
  );
  const queryCheckOut = parseValidIsoDate(
    searchParams.get("checkOut") ?? searchParams.get("check-out")
  );
  const queryAdults = Number(searchParams.get("adults")) || undefined;
  const queryChildren = Number(searchParams.get("children")) || undefined;

  // Local form state
  const [checkIn, setCheckIn] = useState<string>(queryCheckIn ?? todayString);
  const [checkOut, setCheckOut] = useState<string>(
    queryCheckOut ?? defaultCheckOutString
  );
  const [adults, setAdults] = useState<number>(Math.max(1, queryAdults ?? 2));
  const [children, setChildren] = useState<number>(
    Math.max(0, queryChildren ?? 0)
  );
  const [formErrors, setFormErrors] = useState<{
    checkIn?: string;
    checkOut?: string;
    occupancy?: string;
  }>({});

  // Has availability check been performed
  const hasSearched = Boolean(queryCheckIn && queryCheckOut);

  // Fetch room details and availability using existing hook
  const { room, isLoading, isFetching, isError, refetch } = useAvailableRoom(
    slug ?? null,
    queryCheckIn,
    queryCheckOut
  );

  // Handle Check Availability Submission
  const handleCheckAvailability = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const errors: typeof formErrors = {};

    if (!checkIn) {
      errors.checkIn = "Please select a check-in date.";
    } else if (checkIn < todayString) {
      errors.checkIn = "Check-in cannot be in the past.";
    }

    if (!checkOut) {
      errors.checkOut = "Please select a check-out date.";
    } else if (checkIn && checkOut <= checkIn) {
      errors.checkOut = "Check-out must be after check-in.";
    }

    const totalGuests = adults + children;
    if (room && totalGuests > room.maxGuests) {
      errors.occupancy = `Maximum occupancy for this room is ${room.maxGuests} guest${room.maxGuests === 1 ? "" : "s"}.`;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Update URL query parameters to execute availability check
    const newParams = new URLSearchParams(searchParams);
    newParams.set("checkIn", checkIn);
    newParams.set("checkOut", checkOut);
    newParams.set("adults", String(adults));
    newParams.set("children", String(children));
    setSearchParams(newParams, { replace: true });
  };

  // Stay calculations
  const nights = useMemo(() => {
    if (!queryCheckIn || !queryCheckOut) return 0;
    try {
      const diff = differenceInCalendarDays(
        parseISO(queryCheckOut),
        parseISO(queryCheckIn)
      );
      return Math.max(1, diff);
    } catch {
      return 1;
    }
  }, [queryCheckIn, queryCheckOut]);

  // Book Now action handler
  const handleBookNow = () => {
    if (!room || !queryCheckIn || !queryCheckOut) return;
    if (!room.availability.isAvailable) return;

    const bookingParams = new URLSearchParams({
      checkIn: queryCheckIn,
      checkOut: queryCheckOut,
      adults: String(adults),
      children: String(children),
    });

    navigate(`/rooms/${room.slug}/book?${bookingParams.toString()}`);
  };

  // Alternative rooms link handler
  const handleViewAlternatives = () => {
    const searchParamsOut = new URLSearchParams({
      "check-in": checkIn,
      "check-out": checkOut,
      adults: String(adults),
      children: String(children),
      page: "1",
    });
    navigate(`/rooms?${searchParamsOut.toString()}`);
  };

  /* ------------------------------------------------------------------------ */
  /* Loading State                                                            */
  /* ------------------------------------------------------------------------ */

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 h-4 w-48 animate-pulse bg-muted" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="aspect-[16/9] w-full animate-pulse bg-muted" />
            <div className="h-8 w-2/3 animate-pulse bg-muted" />
            <div className="h-4 w-full animate-pulse bg-muted" />
            <div className="h-4 w-5/6 animate-pulse bg-muted" />
          </div>
          <div className="h-96 w-full animate-pulse border border-border bg-muted/40 p-6" />
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Error / Not-Found State                                                  */
  /* ------------------------------------------------------------------------ */

  if (isError || !room) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <XCircle
          className="mb-4 size-12 text-destructive/80"
          strokeWidth={1.2}
        />
        <p className="mb-2 text-[10px] font-medium tracking-[0.24em] text-gold uppercase">
          Nivara Hotels & Resorts
        </p>
        <h1 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
          Room details unavailable
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          We were unable to locate the requested room or encountered an issue
          fetching details. Please try again or browse our full room collection.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
            className="rounded-none border-border"
          >
            <RotateCw className="mr-2 size-4" />
            Try again
          </Button>

          <Link to="/rooms">
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Explore all rooms
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Main Content Layout                                                      */
  /* ------------------------------------------------------------------------ */

  const bedDescription = `${room.bedCount} × ${formatBedType(room.bedType)}`;
  const isAvailable = Boolean(hasSearched && room.availability.isAvailable);
  const isUnavailable = Boolean(hasSearched && !room.availability.isAvailable);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Header & Breadcrumb */}
      <section className="border-b border-border bg-card/40 pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Section A: Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="size-3 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </li>
              <li>
                <Link to="/rooms" className="transition-colors hover:text-gold">
                  Rooms
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="size-3 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </li>
              <li aria-current="page" className="font-medium text-foreground">
                {room.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[10px] font-medium tracking-[0.24em] text-gold uppercase">
                The Nivara Collection
              </p>
              <h1 className="font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                {room.name}
              </h1>
            </div>

            {/* Price badge */}
            <div className="text-left sm:text-right">
              <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Starting from
              </p>
              <div className="mt-1 flex items-baseline gap-1.5 sm:justify-end">
                <span className="font-heading text-2xl font-normal text-foreground sm:text-3xl">
                  {formatMoney(room.basePrice, room.currency)}
                </span>
                <span className="text-xs text-muted-foreground">/ night</span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Plus applicable GST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Availability Section */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-start lg:gap-12 xl:gap-16">
          {/* Left Column: Gallery, Overview, Amenities & Policies */}
          <div className="space-y-10 sm:space-y-12">
            {/* Section B: Room Image Gallery */}
            <RoomGallery
              images={room.images}
              roomName={room.name}
              reduceMotion={reduceMotion}
            />

            {/* Section C: Room Key Facts & Description */}
            <section
              aria-labelledby="room-overview-heading"
              className="space-y-6"
            >
              <div>
                <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                  Overview
                </p>
                <h2
                  id="room-overview-heading"
                  className="font-heading text-2xl font-normal"
                >
                  About this room
                </h2>
              </div>

              {room.description ? (
                <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  {room.description}
                </p>
              ) : null}

              {/* Quick Spec Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3 sm:gap-4">
                {/* Max Occupancy */}
                <div className="border border-border/80 bg-card p-3.5 sm:p-4">
                  <div className="mb-1 flex items-center gap-2 text-gold">
                    <Users className="size-4" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                      Occupancy
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Up to {room.maxGuests} guests
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    ({room.adults} adults, {room.children} children)
                  </p>
                </div>

                {/* Bed Type */}
                <div className="border border-border/80 bg-card p-3.5 sm:p-4">
                  <div className="mb-1 flex items-center gap-2 text-gold">
                    <BedDouble className="size-4" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                      Bed arrangement
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {bedDescription}
                  </p>
                </div>

                {/* Room Size (if available) */}
                {room.sizeSqFt ? (
                  <div className="border border-border/80 bg-card p-3.5 sm:p-4">
                    <div className="mb-1 flex items-center gap-2 text-gold">
                      <Maximize2 className="size-4" strokeWidth={1.5} />
                      <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                        Room size
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {room.sizeSqFt} sq. ft.
                    </p>
                  </div>
                ) : null}
              </div>
            </section>

            {/* Section F: Existing Room Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <section
                aria-labelledby="room-amenities-heading"
                className="border-t border-border pt-8 sm:pt-10"
              >
                <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                  Comfort & Conveniences
                </p>
                <h2
                  id="room-amenities-heading"
                  className="mb-6 font-heading text-2xl font-normal"
                >
                  Included room amenities
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-3 border border-border/60 bg-card/60 p-3"
                    >
                      <AmenityIcon name={amenity.name} />
                      <span className="text-xs font-medium text-foreground">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section F: Room Policies & Guidelines */}
            <section
              aria-labelledby="room-policies-heading"
              className="border-t border-border pt-8 sm:pt-10"
            >
              <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                Stay Details
              </p>
              <h2
                id="room-policies-heading"
                className="mb-6 font-heading text-2xl font-normal"
              >
                Room policies & guidelines
              </h2>

              <div className="divide-y divide-border border border-border bg-card">
                {/* Smoking Policy */}
                <div className="flex items-start gap-4 p-4 sm:p-5">
                  {room.smokingAllowed ? (
                    <Cigarette
                      className="mt-0.5 size-5 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <CigaretteOff
                      className="mt-0.5 size-5 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {room.smokingAllowed
                        ? "Smoking permitted"
                        : "Smoke-free accommodation"}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {room.smokingAllowed
                        ? "Designated smoking is permitted in this room."
                        : "Smoking is strictly prohibited in this room and adjacent indoor spaces."}
                    </p>
                  </div>
                </div>

                {/* Pets Policy */}
                <div className="flex items-start gap-4 p-4 sm:p-5">
                  <PawPrint
                    className="mt-0.5 size-5 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {room.petsAllowed
                        ? "Pets welcome"
                        : "Pet-free accommodation"}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {room.petsAllowed
                        ? "Pets are welcome with prior notification."
                        : "Pets are not permitted in this room type."}
                    </p>
                  </div>
                </div>

                {/* Standard Check-in / Check-out times */}
                <div className="flex items-start gap-4 p-4 sm:p-5">
                  <Clock
                    className="mt-0.5 size-5 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      Check-in and Check-out
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Check-in starts from 2:00 PM. Check-out is until 11:00 AM.
                      Early arrivals and late departures are subject to
                      availability.
                    </p>
                  </div>
                </div>

                {/* Identification Requirement */}
                <div className="flex items-start gap-4 p-4 sm:p-5">
                  <ShieldCheck
                    className="mt-0.5 size-5 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      Identification
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      All adult guests must present a valid government-issued
                      photo ID at check-in.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Check Availability & Booking Widget (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-24">
            <section
              aria-labelledby={`${formId}-widget-heading`}
              className="border border-border bg-card p-5 shadow-lg sm:p-7"
            >
              <div className="border-b border-border pb-4">
                <p className="text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                  Reservation
                </p>
                <div className="mt-1 flex items-baseline justify-between">
                  <h2
                    id={`${formId}-widget-heading`}
                    className="font-heading text-xl font-normal sm:text-2xl"
                  >
                    Check availability
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Direct booking
                  </span>
                </div>
              </div>

              {/* Section D: Availability Form */}
              <form
                onSubmit={handleCheckAvailability}
                className="mt-5 space-y-4"
              >
                {/* Check-in Date */}
                <div>
                  <label
                    htmlFor={`${formId}-checkin`}
                    className="mb-1.5 block text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase"
                  >
                    Check-in Date
                  </label>
                  <div className="relative flex items-center border border-border bg-background px-3 py-2.5 focus-within:border-gold">
                    <CalendarDays
                      className="mr-2.5 size-4 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <input
                      id={`${formId}-checkin`}
                      type="date"
                      required
                      min={todayString}
                      value={checkIn}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCheckIn(val);
                        setFormErrors((prev) => ({
                          ...prev,
                          checkIn: undefined,
                        }));
                        if (checkOut <= val) {
                          setCheckOut(
                            format(addDays(parseISO(val), 1), "yyyy-MM-dd")
                          );
                        }
                      }}
                      className="block w-full min-w-0 appearance-none bg-transparent text-xs font-medium text-foreground scheme-light outline-none"
                    />
                  </div>
                  {formErrors.checkIn && (
                    <p role="alert" className="mt-1 text-xs text-destructive">
                      {formErrors.checkIn}
                    </p>
                  )}
                </div>

                {/* Check-out Date */}
                <div>
                  <label
                    htmlFor={`${formId}-checkout`}
                    className="mb-1.5 block text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase"
                  >
                    Check-out Date
                  </label>
                  <div className="relative flex items-center border border-border bg-background px-3 py-2.5 focus-within:border-gold">
                    <CalendarDays
                      className="mr-2.5 size-4 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <input
                      id={`${formId}-checkout`}
                      type="date"
                      required
                      min={
                        checkIn
                          ? format(addDays(parseISO(checkIn), 1), "yyyy-MM-dd")
                          : defaultCheckOutString
                      }
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setFormErrors((prev) => ({
                          ...prev,
                          checkOut: undefined,
                        }));
                      }}
                      className="block w-full min-w-0 appearance-none bg-transparent text-xs font-medium text-foreground scheme-light outline-none"
                    />
                  </div>
                  {formErrors.checkOut && (
                    <p role="alert" className="mt-1 text-xs text-destructive">
                      {formErrors.checkOut}
                    </p>
                  )}
                </div>

                {/* Guest Occupancy Selectors */}
                <div className="divide-y divide-border/60 border border-border bg-background p-3.5">
                  <GuestCounter
                    label="Adults"
                    description="Age 13+"
                    value={adults}
                    min={1}
                    max={room.maxGuests}
                    onChange={(val) => {
                      setAdults(val);
                      setFormErrors((prev) => ({
                        ...prev,
                        occupancy: undefined,
                      }));
                    }}
                  />
                  <GuestCounter
                    label="Children"
                    description="Ages 0–12"
                    value={children}
                    min={0}
                    max={Math.max(0, room.maxGuests - 1)}
                    onChange={(val) => {
                      setChildren(val);
                      setFormErrors((prev) => ({
                        ...prev,
                        occupancy: undefined,
                      }));
                    }}
                  />
                </div>

                {formErrors.occupancy && (
                  <p role="alert" className="text-xs text-destructive">
                    {formErrors.occupancy}
                  </p>
                )}

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={isFetching}
                  className="h-11 w-full rounded-none bg-primary text-xs font-medium tracking-widest text-primary-foreground uppercase transition-colors hover:bg-primary/90"
                >
                  {isFetching ? (
                    <span className="flex items-center gap-2">
                      <RotateCw className="size-3.5 animate-spin" />
                      Checking availability…
                    </span>
                  ) : (
                    "Check availability"
                  )}
                </Button>
              </form>

              {/* Section E: Availability Results States */}
              <div className="mt-6 border-t border-border pt-5">
                {/* State 1: Initial state - Not yet searched */}
                {!hasSearched && (
                  <div className="rounded border border-border/80 bg-secondary/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Select your stay dates and guests above to check live room
                      availability and pricing.
                    </p>
                  </div>
                )}

                {/* State 2: Available State */}
                {isAvailable && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 border border-success/30 bg-success/10 p-3.5 text-success">
                      <CheckCircle2 className="size-4 shrink-0" />
                      <div>
                        <p className="text-xs font-medium">
                          Room available for your dates
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {nights} night{nights > 1 ? "s" : ""}: {queryCheckIn}{" "}
                          to {queryCheckOut}
                        </p>
                      </div>
                    </div>

                    {/* Calculated Price Summary */}
                    <div className="space-y-2 border border-border/80 bg-background p-3.5 text-xs">
                      <div className="flex justify-between text-muted-foreground">
                        <span>
                          {formatMoney(room.basePrice, room.currency)} ×{" "}
                          {nights} night{nights > 1 ? "s" : ""}
                        </span>
                        <span>
                          {formatMoney(room.basePrice * nights, room.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Taxes & GST (18%)</span>
                        <span>
                          {formatMoney(
                            room.basePrice * nights * 0.18,
                            room.currency
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 font-medium text-foreground">
                        <span>Estimated Total</span>
                        <span className="font-heading text-sm text-foreground">
                          {formatMoney(
                            room.basePrice * nights * 1.18,
                            room.currency
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Section 3: Book Now Button */}
                    <Button
                      type="button"
                      onClick={handleBookNow}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-none bg-gold text-xs font-medium tracking-widest text-primary-foreground uppercase transition-colors hover:bg-gold/90"
                    >
                      <span>Book now</span>
                      <ArrowRight className="size-4" strokeWidth={1.5} />
                    </Button>
                    <p className="text-center text-[10px] text-muted-foreground">
                      No prepayment or account registration required.
                    </p>
                  </div>
                )}

                {/* State 3: Unavailable State */}
                {isUnavailable && (
                  <div className="space-y-4">
                    <div className="border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                      <div className="mb-1.5 flex items-center gap-2">
                        <XCircle className="size-4 shrink-0" />
                        <p className="text-xs font-medium">Room unavailable</p>
                      </div>
                      <p className="text-xs leading-5 text-muted-foreground">
                        The {room.name} is fully committed for the selected
                        dates ({queryCheckIn} to {queryCheckOut}). Please adjust
                        your dates or view other available options.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleViewAlternatives}
                      className="h-11 w-full rounded-none border-gold text-xs font-medium tracking-wider text-foreground uppercase transition-colors hover:bg-gold/10"
                    >
                      View available alternatives
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const searchKey = `${slug ?? ""}-${searchParams.toString()}`;

  return <RoomDetailsContent key={searchKey} />;
}
