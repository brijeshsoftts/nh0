import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Cigarette,
  CigaretteOff,
  Coffee,
  DoorOpen,
  Maximize2,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type RoomTypeViewImage = {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
};

export type RoomTypeViewAmenity = {
  id: string;
  name: string;
  icon?: string;
};

export type RoomTypeViewData = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  images: RoomTypeViewImage[];
  sizeSqFt?: number | null;
  maxGuests: number;
  adults: number;
  children: number;
  bedType: string;
  bedCount: number;
  basePrice: number;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  amenities: RoomTypeViewAmenity[];
  availableRooms: number;
};

type RoomTypeViewDialogProps = {
  room: RoomTypeViewData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
  error?: boolean;
  onRetry?: () => void;
};

/* -------------------------------------------------------------------------- */
/* Design tokens                                                              */
/* -------------------------------------------------------------------------- */

const gold = "#AD8A52";
const ivory = "#FAF8F4";
const charcoal = "#25251F";

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const titleCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

/* -------------------------------------------------------------------------- */
/* Amenity icons                                                              */
/* -------------------------------------------------------------------------- */

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

  return <Icon className="size-[17px] shrink-0" strokeWidth={1.5} />;
}

/* -------------------------------------------------------------------------- */
/* Image gallery                                                              */
/* -------------------------------------------------------------------------- */

function RoomGallery({
  images,
  roomName,
  reduceMotion,
}: {
  images: RoomTypeViewImage[];
  roomName: string;
  reduceMotion: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedImages = [...images].sort(
    (a, b) =>
      Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder
  );

  const count = sortedImages.length;
  const index = count ? activeIndex % count : 0;
  const activeImage = sortedImages[index];

  useEffect(() => {
    (async () => {
      setActiveIndex(0);
    })();
  }, [images]);

  const move = (direction: number) => {
    if (!count) return;

    setActiveIndex((current) => (current + direction + count) % count);
  };

  return (
    <section
      aria-label={`${roomName} image gallery`}
      className="flex h-full min-h-100 flex-col"
      style={{ background: ivory }}
    >
      {/* Main image: fills the available gallery height */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#E8E2D8]">
        <AnimatePresence mode="wait">
          {activeImage ? (
            <motion.img
              key={activeImage.id}
              src={activeImage.url}
              alt={activeImage.altText ?? roomName}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              draggable={false}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-3 text-[#817D74]">
                <BedDouble className="size-12" strokeWidth={1.2} />
                <span className="text-sm">Room photography coming soon</span>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Image overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />

        <div className="absolute top-5 left-5 sm:top-7 sm:left-7">
          <span className="border border-white/30 bg-black/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase backdrop-blur-sm">
            Nivara Collection
          </span>
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-4 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-4 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
            >
              <ChevronRight className="size-5" />
            </button>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="absolute right-5 bottom-5 text-xs tracking-[0.12em] text-white sm:right-7 sm:bottom-7"
            >
              <span className="font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 text-white/60">/</span>
              <span className="text-white/75">
                {String(count).padStart(2, "0")}
              </span>
            </div>
          </>
        ) : null}

        {/* Room name overlay */}
        <div className="absolute bottom-5 left-5 max-w-[75%] sm:bottom-7 sm:left-7">
          <p className="mb-2 text-[10px] tracking-[0.22em] text-white/80 uppercase">
            Discover your stay
          </p>
          <p className="font-serif text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
            {roomName}
          </p>
        </div>
      </div>

      {/* Thumbnail strip stays with the gallery, not the scrolling content */}
      {count > 1 ? (
        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-[#E5DED2] bg-[#FAF8F4] p-3 sm:gap-3 sm:p-4 lg:p-5">
          {sortedImages.map((image, imageIndex) => {
            const selected = imageIndex === index;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(imageIndex)}
                aria-label={`View photo ${imageIndex + 1}`}
                aria-pressed={selected}
                className={[
                  "relative h-14 w-[76px] shrink-0 overflow-hidden",
                  "transition-opacity sm:h-[68px] sm:w-[92px]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD8A52]",
                  selected ? "opacity-100" : "opacity-55 hover:opacity-100",
                ].join(" ")}
              >
                <img
                  src={image.url}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="size-full object-cover"
                />
                {selected ? (
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px]"
                    style={{ background: gold }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Room facts                                                                 */
/* -------------------------------------------------------------------------- */

function RoomFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BedDouble;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 border border-[#E8E2D8] p-3 sm:p-4">
      <Icon
        className="mt-0.5 size-[18px] shrink-0 text-[#AD8A52]"
        strokeWidth={1.5}
      />
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.13em] text-[#817D74] uppercase">
          {label}
        </p>
        <p className="mt-1 text-sm leading-5 break-words text-[#25251F]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading                                                            */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="mb-1.5 text-[9px] font-medium tracking-[0.22em] text-[#AD8A52] uppercase">
        {eyebrow}
      </p>
      <h3 className="font-serif text-[22px] leading-tight text-[#25251F] sm:text-2xl">
        {children}
      </h3>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading and error states                                                   */
/* -------------------------------------------------------------------------- */

function RoomLoading() {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-2">
      <div className="min-h-[180px] animate-pulse bg-[#E8E2D8] lg:min-h-0" />
      <div className="space-y-5 overflow-hidden p-6 sm:p-9">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-9 w-3/4 animate-pulse bg-muted" />
        <div className="h-3 w-full animate-pulse bg-muted" />
        <div className="h-3 w-5/6 animate-pulse bg-muted" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 animate-pulse bg-muted" />
          <div className="h-20 animate-pulse bg-muted" />
          <div className="h-20 animate-pulse bg-muted" />
          <div className="h-20 animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  );
}

function RoomError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <Sparkles className="size-8 text-[#AD8A52]" strokeWidth={1.3} />
      <DialogTitle className="font-serif text-3xl text-[#25251F]">
        Details unavailable
      </DialogTitle>
      <DialogDescription className="max-w-sm text-sm leading-6 text-muted-foreground">
        We couldn't retrieve this room's details. Please try again.
      </DialogDescription>
      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          className="mt-2 rounded-none border-[#AD8A52] px-5"
        >
          Try again
        </Button>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main dialog                                                                */
/* -------------------------------------------------------------------------- */

export function RoomTypeViewDialog({
  room,
  open,
  onOpenChange,
  isLoading = false,
  error = false,
  onRetry,
}: RoomTypeViewDialogProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const available = (room?.availableRooms ?? 0) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          // Mobile: full viewport, with independent gallery/details rows.
          "fixed inset-0 top-0 left-0 z-50",
          "flex h-dvh w-screen max-w-none translate-x-0 translate-y-0",
          "flex-col gap-0 overflow-hidden rounded-none border-0 p-0",
          "bg-[#FAF8F4] text-[#25251F] shadow-2xl",

          // Desktop: elegant centred dialog.
          "sm:top-1/2 sm:left-1/2",
          "sm:h-[min(88dvh,820px)] sm:max-h-[calc(100dvh-2rem)]",
          "sm:w-[calc(100vw-2rem)] sm:max-w-[1240px]",
          "sm:-translate-x-1/2 sm:-translate-y-1/2",
          "sm:rounded-sm sm:border sm:border-[#DCD3C4]",

          // Hide shadcn's default close button.
          "[&>button.absolute]:hidden",
        ].join(" ")}
        style={{
          backgroundColor: ivory,
          color: charcoal,
        }}
      >
        {/* Close button */}
        <DialogClose>
          <button
            type="button"
            aria-label="Close room details"
            className={[
              "absolute top-3 right-3 z-50 grid size-10 place-items-center",
              "border border-white/40 bg-black/30 text-white backdrop-blur-sm",
              "transition hover:bg-black/55",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD8A52]",
              "sm:top-5 sm:right-5",
            ].join(" ")}
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </DialogClose>

        {/* Main region: gallery never scrolls with the right panel */}
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-[minmax(180px,36dvh)_minmax(0,1fr)] overflow-hidden lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:grid-rows-1">
          {isLoading ? (
            <RoomLoading />
          ) : error || !room ? (
            <div className="col-span-full flex min-h-0 flex-col overflow-hidden">
              <RoomError onRetry={onRetry} />
            </div>
          ) : (
            <>
              {/* Fixed gallery column */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
                className="relative min-h-0 min-w-0 overflow-hidden border-b border-[#E5DED2] lg:border-r lg:border-b-0"
              >
                <RoomGallery
                  key={room.id}
                  images={room.images ?? []}
                  roomName={room.name}
                  reduceMotion={reduceMotion}
                />
              </motion.div>

              {/* Only this right-hand panel scrolls */}
              <motion.div
                key={room.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain"
              >
                <div className="mx-auto max-w-2xl space-y-7 px-5 py-6 sm:space-y-9 sm:px-8 sm:py-9 lg:px-10 lg:py-10 xl:px-12">
                  {/* Intro */}
                  <header>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="h-px w-8" style={{ background: gold }} />
                      <span className="text-[10px] font-medium tracking-[0.22em] text-[#817D74] uppercase">
                        The accommodation
                      </span>

                      <span
                        className="ml-auto inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] tracking-[0.08em] uppercase"
                        style={{
                          borderColor: available ? "#D7DDCC" : "#E8D6D0",
                          color: available ? "#536849" : "#995B4C",
                        }}
                      >
                        <span
                          className="size-1.5 rounded-full"
                          style={{
                            backgroundColor: available ? "#718765" : "#B77C6B",
                          }}
                        />
                        {available ? "Available" : "Fully booked"}
                      </span>
                    </div>

                    <DialogTitle className="max-w-xl font-serif text-[34px] leading-[1.12] font-normal tracking-[-0.035em] break-words text-[#25251F] sm:text-[42px] lg:text-[48px]">
                      {room.name}
                    </DialogTitle>

                    {room.description ? (
                      <DialogDescription className="mt-5 max-w-xl text-sm leading-7 text-[#716D64] sm:text-[15px] sm:leading-7">
                        {room.description}
                      </DialogDescription>
                    ) : (
                      <DialogDescription className="sr-only">
                        View room details, amenities, occupancy, and pricing for{" "}
                        {room.name}.
                      </DialogDescription>
                    )}

                    <div className="mt-7 h-px bg-[#E5DED2]" />
                  </header>

                  {/* Quick facts */}
                  <section aria-label="Room specifications">
                    <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
                      {room.sizeSqFt ? (
                        <RoomFact
                          icon={Maximize2}
                          label="Room size"
                          value={`${room.sizeSqFt} sq ft`}
                        />
                      ) : null}

                      <RoomFact
                        icon={BedDouble}
                        label="Bed arrangement"
                        value={`${room.bedCount} × ${titleCase(room.bedType)}`}
                      />

                      <RoomFact
                        icon={Users}
                        label="Maximum occupancy"
                        value={`${room.maxGuests} guests`}
                      />

                      <RoomFact
                        icon={Sparkles}
                        label="Ideal for"
                        value={
                          room.adults > 0
                            ? `${room.adults} adults${room.children ? `, ${room.children} children` : ""}`
                            : `${room.maxGuests} guests`
                        }
                      />
                    </div>
                  </section>

                  {/* Amenities */}
                  {room.amenities?.length ? (
                    <section>
                      <SectionHeading eyebrow="Thoughtful comforts">
                        Amenities
                      </SectionHeading>

                      <ul className="grid grid-cols-1 gap-y-4 min-[420px]:grid-cols-2 min-[420px]:gap-x-5">
                        {room.amenities.map((amenity) => (
                          <li
                            key={amenity.id}
                            className="flex min-w-0 items-start gap-3 text-sm text-[#48463F]"
                          >
                            <span className="mt-0.5 text-[#AD8A52]">
                              <AmenityIcon name={amenity.icon} />
                            </span>
                            <span className="min-w-0 leading-5 break-words">
                              {amenity.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {/* House rules */}
                  <section>
                    <SectionHeading eyebrow="Before you settle in">
                      House rules
                    </SectionHeading>

                    <div className="divide-y divide-[#E5DED2] border-y border-[#E5DED2]">
                      <div className="flex items-start gap-3 py-4">
                        {room.smokingAllowed ? (
                          <Cigarette
                            className="mt-0.5 size-[18px] shrink-0 text-[#AD8A52]"
                            strokeWidth={1.5}
                          />
                        ) : (
                          <CigaretteOff
                            className="mt-0.5 size-[18px] shrink-0 text-[#AD8A52]"
                            strokeWidth={1.5}
                          />
                        )}

                        <div>
                          <p className="text-sm font-medium text-[#302F29]">
                            {room.smokingAllowed
                              ? "Smoking permitted"
                              : "Smoke-free accommodation"}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#817D74]">
                            {room.smokingAllowed
                              ? "Smoking is permitted in this room."
                              : "Smoking is not permitted in this room."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 py-4">
                        <PawPrint
                          className="mt-0.5 size-[18px] shrink-0 text-[#AD8A52]"
                          strokeWidth={1.5}
                        />

                        <div>
                          <p className="text-sm font-medium text-[#302F29]">
                            {room.petsAllowed
                              ? "Pets welcome"
                              : "Pet-free accommodation"}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#817D74]">
                            {room.petsAllowed
                              ? "Pets are permitted in this room."
                              : "Pets are not permitted in this room."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Small closing detail */}
                  <div className="flex items-center gap-3 pb-2 text-[#817D74]">
                    <ShieldCheck
                      className="size-4 shrink-0 text-[#AD8A52]"
                      strokeWidth={1.5}
                    />
                    <p className="text-xs leading-5">
                      A considered stay, with comfort in every detail.
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Fixed footer */}
        {!isLoading && !error && room ? (
          <footer className="relative z-20 shrink-0 border-t border-[#DED6C9] bg-[#FAF8F4]">
            <div className="flex min-w-0 items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-7 sm:py-4 lg:px-10">
              <div className="min-w-0">
                <p className="text-[9px] tracking-[0.2em] text-[#817D74] uppercase sm:text-[10px]">
                  Starting from
                </p>

                <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-serif text-[25px] leading-tight text-[#25251F] sm:text-[30px]">
                    {money(room.basePrice)}
                  </span>
                  <span className="text-xs text-[#817D74]">/ night</span>
                </div>

                <p className="mt-0.5 text-[10px] text-[#817D74] sm:text-xs">
                  Plus applicable GST
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <DialogClose>
                  <Button
                    type="button"

                    className="hidden h-11 rounded-none border-[#D8CEBD] bg-transparent px-5 text-xs font-medium text-[#48463F] hover:bg-[#F0EBE2] sm:inline-flex"
                  >
                    Close
                  </Button>
                </DialogClose>

                {available ? (
                  <a
                    href={`/rooms/${room.slug}/book`}
                    onClick={() => onOpenChange(false)}
                  >
                    <Button className="h-10 gap-2 rounded-none border border-[#25251F] bg-[#25251F] px-3 text-xs font-medium text-[#FAF8F4] hover:bg-[#3B3931] sm:h-11 sm:px-6">
                      <span>Reserve your stay</span>
                      <ArrowRight className="size-4" strokeWidth={1.5} />
                    </Button>
                  </a>
                ) : (
                  <Button
                    type="button"
                    disabled
                    className="h-10 rounded-none px-4 text-xs sm:h-11 sm:px-6"
                  >
                    Unavailable
                  </Button>
                )}
              </div>
            </div>
          </footer>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
