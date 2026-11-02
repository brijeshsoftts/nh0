import {
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns";
import {
  AirVent,
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Calendar as CalendarIcon,
  CalendarDays,
  Check,
  ChevronRight,
  CigaretteOff,
  Coffee,
  ConciergeBell,
  Dog,
  Image as ImageIcon,
  LoaderCircle,
  type LucideIcon,
  Minus,
  Plus,
  Ruler,
  Tv,
  Users,
  Wifi,
  X,
} from "lucide-react";
import * as React from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import RoomFallbackImage from "@/assets/landing_hero.png";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import type { AvailableRoomListItem } from "@/features/public/public.types";
import {
  useAvailableRoom,
  useAvailableRooms,
} from "@/features/public/useAvailableRooms";
import { formatPrice, formatString } from "@/lib/format";

const amenityIcons: Record<string, LucideIcon> = {
  "air conditioning": AirVent,
  bathroom: Bath,
  coffee: Coffee,
  "room service": ConciergeBell,
  television: Tv,
  tv: Tv,
  wifi: Wifi,
  "wi-fi": Wifi,
};

function parseGuestCount(value: string | null, fallback: number, min: number) {
  if (!value || !/^\d+$/.test(value)) return fallback;
  return Math.max(min, Math.min(10, Number(value)));
}

function getPhotoAlt(altText: string | null, roomName: string) {
  if (
    !altText ||
    /^(pasted image|image)(?:\s*\(\d+\))?(?:\.[a-z0-9]+)?$/i.test(
      altText.trim()
    )
  ) {
    return `${roomName} room photo`;
  }
  return altText.trim();
}

function handleRoomImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  if (!event.currentTarget.src.endsWith("/landing_hero.png")) {
    event.currentTarget.src = RoomFallbackImage;
  }
}

function formatRoomPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return formatPrice(amount);
  }
}

function RoomDetailsSkeleton() {
  return (
    <main className="min-w-0 bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="mt-5 h-10 w-64" />
        <Skeleton className="mt-2 h-5 w-full max-w-xl" />
        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <Skeleton className="aspect-4/3 w-full md:aspect-video" />
            <div className="mt-3 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton className="aspect-4/3 w-full" key={index} />
              ))}
            </div>
            <Skeleton className="mt-10 h-7 w-48" />
            <Skeleton className="mt-4 h-20 w-full" />
          </div>
          <Skeleton className="h-120 w-full" />
        </div>
      </div>
    </main>
  );
}

function RoomFact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 py-4 sm:px-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground">
          {value}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {label}
        </span>
      </span>
    </div>
  );
}

function SimilarRoomCard({ room }: { room: AvailableRoomListItem }) {
  return (
    <Link
      className="group min-w-0 overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      to={`/rooms/${room.slug}`}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        {room.image ? (
          <img
            alt={getPhotoAlt(room.image.altText, room.name)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            loading="lazy"
            onError={handleRoomImageError}
            src={room.image.url}
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <ImageIcon aria-hidden="true" className="size-7" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-3">
        <span className="min-w-0">
          <span className="block truncate font-heading text-base font-medium text-foreground">
            {room.name}
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            {formatPrice(room.basePrice)} / night
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

export default function RoomDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checkInDate, setCheckInDate] = React.useState(
    searchParams.get("checkInDate") ?? ""
  );
  const [checkOutDate, setCheckOutDate] = React.useState(
    searchParams.get("checkOutDate") ?? ""
  );
  const [requestedAdults, setRequestedAdults] = React.useState(() =>
    parseGuestCount(searchParams.get("adults"), 2, 1)
  );
  const [requestedChildren, setRequestedChildren] = React.useState(() =>
    parseGuestCount(searchParams.get("children"), 0, 0)
  );
  const validCheckIn = isValid(parseISO(checkInDate));
  const validCheckOut = isValid(parseISO(checkOutDate));
  const hasValidStay =
    validCheckIn &&
    validCheckOut &&
    checkInDate >= format(startOfToday(), "yyyy-MM-dd") &&
    checkOutDate > checkInDate;

  const { room, isLoading, isFetching, isError, refetch } = useAvailableRoom(
    slug ?? null,
    hasValidStay ? checkInDate : undefined,
    hasValidStay ? checkOutDate : undefined
  );
  const { rooms } = useAvailableRooms({
    ...(hasValidStay && { checkInDate, checkOutDate }),
    adults: requestedAdults,
    children: requestedChildren,
    limit: 8,
  });
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [bookingError, setBookingError] = React.useState("");

  const adults = Math.min(
    requestedAdults,
    room?.adults ?? 10,
    room?.maxGuests ?? 10
  );
  const children = Math.min(
    requestedChildren,
    room?.children ?? 10,
    Math.max((room?.maxGuests ?? 10) - adults, 0)
  );
  const maxAdults = Math.max(
    1,
    Math.min(room?.adults ?? 10, (room?.maxGuests ?? 10) - children, 10)
  );
  const maxChildren = Math.max(
    0,
    Math.min(room?.children ?? 10, (room?.maxGuests ?? 10) - adults, 10)
  );
  const images = room
    ? [...room.images].sort(
        (first, second) => Number(second.isPrimary) - Number(first.isPrimary)
      )
    : [];
  const displayedImageIndex = Math.min(
    selectedImageIndex,
    Math.max(images.length - 1, 0)
  );
  const activeImage = images[displayedImageIndex] ?? images[0];
  const nights = hasValidStay
    ? differenceInCalendarDays(parseISO(checkOutDate), parseISO(checkInDate))
    : 0;
  const roomTotal = room ? room.basePrice * nights : 0;
  const similarRooms = room
    ? rooms.filter((item) => item.id !== room.id).slice(0, 4)
    : [];

  const changeImage = (direction: -1 | 1) => {
    if (!images.length) return;
    setSelectedImageIndex(
      (current) => (current + direction + images.length) % images.length
    );
  };

  const handleBook = () => {
    setBookingError("");
    if (!checkInDate || !checkOutDate) {
      setBookingError("Choose your check-in and check-out dates.");
      return;
    }
    if (!hasValidStay) {
      setBookingError(
        "Check-out must be after check-in, and dates cannot be in the past."
      );
      return;
    }
    if (!room.availability.isAvailable) {
      setBookingError("This room is not available for those dates.");
      return;
    }

    const checkoutParams = new URLSearchParams({
      checkInDate,
      checkOutDate,
      adults: String(adults),
      children: String(children),
    });
    navigate(`/rooms/${room.slug}/book?${checkoutParams.toString()}`);
  };

  if (isLoading) return <RoomDetailsSkeleton />;

  if (isError || !room) {
    return (
      <main className="min-w-0 bg-background text-foreground">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="border-y border-border py-12 text-center sm:py-16">
            <h1 className="font-heading text-3xl font-medium text-foreground">
              Room details could not be loaded
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              This room may no longer be available. Try again or browse the room
              list.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                onClick={() => void refetch()}
                type="button"
                variant="outline"
              >
                Try again
              </Button>
              <Button nativeButton={false} render={<Link to="/rooms" />}>
                Browse rooms
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 bg-background pb-16 text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          <Link className="transition-colors hover:text-foreground" to="/">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <Link className="transition-colors hover:text-foreground" to="/rooms">
            Rooms
          </Link>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <span aria-current="page" className="text-foreground">
            {room.name}
          </span>
        </nav>

        <header className="mt-5">
          <h1 className="font-heading text-3xl font-medium text-foreground sm:text-4xl">
            {room.name}
          </h1>
          {room.description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              {room.description}
            </p>
          )}
        </header>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-10">
          <div className="min-w-0">
            <section aria-label={`${room.name} photos`}>
              <div className="group relative aspect-4/3 overflow-hidden rounded-lg bg-muted md:aspect-video">
                {activeImage ? (
                  <img
                    alt={getPhotoAlt(activeImage.altText, room.name)}
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    onError={handleRoomImageError}
                    src={activeImage.url}
                  />
                ) : (
                  <div className="grid h-full place-items-center text-muted-foreground">
                    <span className="flex flex-col items-center gap-2 text-sm">
                      <ImageIcon aria-hidden="true" className="size-8" />
                      No room photos available
                    </span>
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <Button
                      aria-label="Previous photo"
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-background/90"
                      onClick={() => changeImage(-1)}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <ArrowLeft aria-hidden="true" />
                    </Button>
                    <Button
                      aria-label="Next photo"
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-background/90"
                      onClick={() => changeImage(1)}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <ArrowRight aria-hidden="true" />
                    </Button>
                  </>
                )}
                {images.length > 0 && (
                  <Button
                    className="absolute bottom-3 left-3 bg-background/95 text-foreground hover:bg-background"
                    onClick={() => setGalleryOpen(true)}
                    type="button"
                    variant="secondary"
                  >
                    <ImageIcon aria-hidden="true" />
                    View all photos ({images.length})
                  </Button>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                  {images.slice(0, 4).map((image, index) => (
                    <button
                      aria-label={`Show photo ${index + 1}`}
                      aria-pressed={displayedImageIndex === index}
                      className={`aspect-4/3 overflow-hidden rounded-md border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                        displayedImageIndex === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                      key={`${image.url}-${index}`}
                      onClick={() => setSelectedImageIndex(index)}
                      type="button"
                    >
                      <img
                        alt={getPhotoAlt(image.altText, room.name)}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={handleRoomImageError}
                        src={image.url}
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-8 border-b border-border pb-7">
              <h2 className="font-heading text-2xl font-medium text-foreground">
                Room information
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                {room.description || "Room details will be updated soon."}
              </p>
              <div className="mt-5 grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {room.sizeSqFt !== null && (
                  <RoomFact
                    icon={Ruler}
                    label="Room size"
                    value={`${room.sizeSqFt} sq ft`}
                  />
                )}
                <RoomFact
                  icon={BedDouble}
                  label="Bed configuration"
                  value={`${formatString(room.bedType)} · ${room.bedCount} ${room.bedCount === 1 ? "bed" : "beds"}`}
                />
                <RoomFact
                  icon={Users}
                  label="Maximum guests"
                  value={`${room.maxGuests} ${room.maxGuests === 1 ? "guest" : "guests"}`}
                />
              </div>
            </section>

            <section className="mt-7 border-b border-border pb-7">
              <h2 className="font-heading text-2xl font-medium text-foreground">
                Guest capacity
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <RoomFact
                  icon={Users}
                  label="Adult capacity"
                  value={`${room.adults} ${room.adults === 1 ? "adult" : "adults"}`}
                />
                <RoomFact
                  icon={Users}
                  label="Children capacity"
                  value={`${room.children} ${room.children === 1 ? "child" : "children"}`}
                />
              </div>
            </section>

            <section className="mt-7 border-b border-border pb-7">
              <h2 className="font-heading text-2xl font-medium text-foreground">
                Room amenities
              </h2>
              {room.amenities.length ? (
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                  {room.amenities.map((amenity) => {
                    const Icon =
                      amenityIcons[amenity.name.toLowerCase()] ?? Check;
                    return (
                      <li
                        className="flex min-w-0 items-center gap-3"
                        key={amenity.id}
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="text-sm text-foreground">
                          {amenity.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Amenity information is not available.
                </p>
              )}
            </section>

            <section className="mt-7">
              <h2 className="font-heading text-2xl font-medium text-foreground">
                Room policies
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    allowed: room.smokingAllowed,
                    icon: CigaretteOff,
                    label: "Smoking",
                    detail: room.smokingAllowed
                      ? "Smoking is allowed in this room."
                      : "Smoking is not permitted in this room.",
                  },
                  {
                    allowed: room.petsAllowed,
                    icon: Dog,
                    label: "Pets",
                    detail: room.petsAllowed
                      ? "Pets are allowed in this room."
                      : "Pets are not permitted in this room.",
                  },
                ].map((policy) => {
                  const Icon = policy.icon;
                  const StatusIcon = policy.allowed ? Check : X;
                  return (
                    <div
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                      key={policy.label}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">
                          {policy.label}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <StatusIcon
                            aria-hidden="true"
                            className="size-4 text-primary"
                          />
                          {policy.allowed ? "Allowed" : "Not allowed"}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {policy.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-6">
            <section
              aria-label="Book this room"
              className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="font-heading text-2xl font-semibold text-foreground">
                    {formatRoomPrice(room.basePrice, room.currency)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    per night
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    hasValidStay && room.availability.isAvailable
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {hasValidStay && room.availability.isAvailable ? (
                    <Check aria-hidden="true" className="size-3.5" />
                  ) : null}
                  {hasValidStay
                    ? isFetching
                      ? "Checking dates"
                      : room.availability.isAvailable
                        ? "Available"
                        : "Unavailable"
                    : "Check dates"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">
                    Check-in
                  </span>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <button
                          aria-label="Choose check-in date"
                          className="mt-2 flex h-10 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-background px-2 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          type="button"
                        />
                      }
                    >
                      <CalendarIcon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-primary"
                      />
                      <span className="truncate">
                        {validCheckIn
                          ? format(parseISO(checkInDate), "dd MMM yyyy")
                          : "Select date"}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto rounded-lg border-border p-0"
                    >
                      <Calendar
                        disabled={(date) => date < startOfToday()}
                        mode="single"
                        onSelect={(date) => {
                          const nextCheckIn = date
                            ? format(date, "yyyy-MM-dd")
                            : "";
                          setCheckInDate(nextCheckIn);
                          if (
                            date &&
                            validCheckOut &&
                            parseISO(checkOutDate) <= date
                          ) {
                            setCheckOutDate("");
                          }
                          setBookingError("");
                        }}
                        selected={
                          validCheckIn ? parseISO(checkInDate) : undefined
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">
                    Check-out
                  </span>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <button
                          aria-label="Choose check-out date"
                          className="mt-2 flex h-10 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-background px-2 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          type="button"
                        />
                      }
                    >
                      <CalendarIcon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-primary"
                      />
                      <span className="truncate">
                        {validCheckOut
                          ? format(parseISO(checkOutDate), "dd MMM yyyy")
                          : "Select date"}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto rounded-lg border-border p-0"
                    >
                      <Calendar
                        disabled={(date) =>
                          date <=
                          (validCheckIn
                            ? parseISO(checkInDate)
                            : startOfToday())
                        }
                        mode="single"
                        onSelect={(date) => {
                          setCheckOutDate(
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                          setBookingError("");
                        }}
                        selected={
                          validCheckOut ? parseISO(checkOutDate) : undefined
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Adults",
                    count: adults,
                    min: 1,
                    max: maxAdults,
                    key: "adults",
                  },
                  {
                    label: "Children",
                    count: children,
                    min: 0,
                    max: maxChildren,
                    key: "children",
                  },
                ].map((guest) => (
                  <div
                    className="flex items-center justify-between gap-4"
                    key={guest.key}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {guest.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <Button
                        aria-label={`Decrease ${guest.label.toLowerCase()}`}
                        className="size-8"
                        disabled={guest.count <= guest.min}
                        onClick={() => {
                          if (guest.key === "adults") {
                            setRequestedAdults(guest.count - 1);
                          } else {
                            setRequestedChildren(guest.count - 1);
                          }
                          setBookingError("");
                        }}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <Minus aria-hidden="true" />
                      </Button>
                      <span className="w-5 text-center text-sm tabular-nums">
                        {guest.count}
                      </span>
                      <Button
                        aria-label={`Increase ${guest.label.toLowerCase()}`}
                        className="size-8"
                        disabled={guest.count >= guest.max}
                        onClick={() => {
                          if (guest.key === "adults") {
                            setRequestedAdults(guest.count + 1);
                          } else {
                            setRequestedChildren(guest.count + 1);
                          }
                          setBookingError("");
                        }}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <Plus aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {hasValidStay && nights > 0 && (
                <div className="mt-5 border-y border-border py-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {nights} {nights === 1 ? "night" : "nights"}
                  </div>
                  <div className="mt-3 flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      {formatRoomPrice(room.basePrice, room.currency)} ×{" "}
                      {nights} nights
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatRoomPrice(roomTotal, room.currency)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Final total shown at checkout.
                  </p>
                </div>
              )}

              {hasValidStay &&
                !isFetching &&
                !room.availability.isAvailable && (
                  <p className="mt-4 text-sm text-destructive" role="status">
                    No availability for these dates. Try another stay.
                  </p>
                )}
              {bookingError && (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {bookingError}
                </p>
              )}

              <Button
                className="mt-5 h-11 w-full"
                disabled={
                  isFetching || (hasValidStay && !room.availability.isAvailable)
                }
                onClick={handleBook}
                type="button"
              >
                {isFetching && (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                )}
                Book now
                {!isFetching && (
                  <ArrowRight aria-hidden="true" className="size-4" />
                )}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                No booking fees. Secure online payment at checkout.
              </p>
            </section>
          </aside>
        </div>

        {similarRooms.length > 0 && (
          <section className="mt-12 border-t border-border pt-8 sm:mt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-medium text-foreground sm:text-3xl">
                Similar rooms
              </h2>
              <Link
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline"
                to="/rooms"
              >
                View all rooms
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {similarRooms.map((similarRoom) => (
                <SimilarRoomCard key={similarRoom.id} room={similarRoom} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Dialog onOpenChange={setGalleryOpen} open={galleryOpen}>
        <DialogContent className="max-w-6xl border-0 p-3 sm:p-5">
          <DialogTitle className="sr-only">{room.name} photos</DialogTitle>
          {activeImage && (
            <div className="relative grid min-h-[50vh] place-items-center bg-muted">
              <img
                alt={getPhotoAlt(activeImage.altText, room.name)}
                className="max-h-[75vh] w-full object-contain"
                onError={handleRoomImageError}
                src={activeImage.url}
              />
              {images.length > 1 && (
                <>
                  <Button
                    aria-label="Previous photo"
                    className="absolute top-1/2 left-3 -translate-y-1/2"
                    onClick={() => changeImage(-1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ArrowLeft aria-hidden="true" />
                  </Button>
                  <Button
                    aria-label="Next photo"
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => changeImage(1)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </>
              )}
            </div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            {images.length
              ? `${displayedImageIndex + 1} of ${images.length}`
              : "No photos"}
          </p>
        </DialogContent>
      </Dialog>
    </main>
  );
}
