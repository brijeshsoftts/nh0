import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BedDouble, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export type BedType =
  | "SINGLE"
  | "TWIN"
  | "DOUBLE"
  | "QUEEN"
  | "KING"
  | "SUPER_KING"
  | "BUNK"
  | "SOFA_BED"
  | "OTHER";

export type Amenity = {
  name: string;
  icon: string;
};

export type RoomType = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  primaryImage?: {
    url: string;
    altText?: string;
  };
  basePrice: number;
  currency: string;
  maxGuests: number;
  adults: number;
  children: number;
  bedType: BedType;
  bedCount: number;
  numberOfRooms: number;
  amenities: Amenity[];
  isActive: boolean;
};

type RoomTypeCardProps = {
  room: RoomType;
  onViewDetails?: (room: RoomType) => void;
  onBook?: (room: RoomType) => void;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Formatting                                                                 */
/* -------------------------------------------------------------------------- */

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return ` ${amount.toLocaleString("en-IN")}`;
  }
}

function formatBedType(bedType: BedType) {
  const labels: Record<BedType, string> = {
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

  return labels[bedType] ?? "Bed arrangement";
}

function getAmenitySymbol(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("wifi") || normalized.includes("internet")) {
    return "Wi-Fi";
  }

  if (normalized.includes("pool")) return "Pool";
  if (normalized.includes("breakfast")) return "Breakfast";

  if (
    normalized.includes("air condition") ||
    normalized === "ac" ||
    normalized.includes("air conditioning")
  ) {
    return "Climate control";
  }

  if (normalized.includes("parking")) return "Parking";

  if (normalized.includes("coffee") || normalized.includes("tea")) {
    return "Tea & coffee";
  }

  return name;
}

/* -------------------------------------------------------------------------- */
/* Image                                                                      */
/* -------------------------------------------------------------------------- */

function RoomImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary">
        <BedDouble
          className="size-10 text-gold"
          strokeWidth={1.1}
          aria-hidden="true"
        />
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Nivara Collection
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      draggable={false}
      className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

export function RoomTypeCard({
  room,
  onViewDetails,
  onBook,
  className = "",
}: RoomTypeCardProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const available = room.isActive && room.numberOfRooms > 0;
  const amenities = room.amenities ?? [];
  const visibleAmenities = amenities.slice(0, 3);
  const extraAmenities = Math.max(0, amenities.length - 3);

  const bedLabel = `${room.bedCount} ${
    room.bedCount === 1 ? "" : "× "
  }${formatBedType(room.bedType)}`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "group flex min-w-0 flex-col overflow-hidden",
        "border border-border/70 bg-card text-card-foreground",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-ring/50 hover:shadow-lg",
        className,
      ].join(" ")}
    >
      {/* Image */}
      <button
        type="button"
        onClick={() => onViewDetails?.(room)}
        aria-label={`View details for ${room.name}`}
        className="relative block w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring"
      >
        <div className="relative aspect-[5/3] overflow-hidden bg-secondary">
          <RoomImage
            src={room.primaryImage?.url}
            alt={room.primaryImage?.altText ?? room.name}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-background/10" />

          <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
            <span className="inline-flex items-center gap-2 border border-border/70 bg-card/90 px-2.5 py-1.5 text-[9px] tracking-[0.16em] text-card-foreground uppercase backdrop-blur-sm">
              <span
                className={`size-1.5 rounded-full ${
                  available ? "bg-success" : "bg-destructive"
                }`}
              />
              {available ? "Available" : "Unavailable"}
            </span>
          </div>

          <span
            className="absolute right-4 bottom-4 grid size-9 place-items-center border border-border/70 bg-card/80 text-foreground backdrop-blur-sm transition-colors duration-300 group-hover:border-ring group-hover:bg-accent group-hover:text-accent-foreground sm:right-5 sm:bottom-5"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-[17px]" strokeWidth={1.4} />
          </span>

          <div className="absolute bottom-4 left-4 max-w-[75%] sm:bottom-5 sm:left-5">
            <p className="mb-1.5 text-[9px] tracking-[0.22em] text-white/90 uppercase">
              Nivara Collection
            </p>
            <p className="font-heading text-xl leading-tight text-white sm:text-2xl">
              {room.name}
            </p>
          </div>
        </div>
      </button>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        {/* Occupancy and bed */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users
              className="size-3.5 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Up to {room.maxGuests} guests
          </span>

          <span className="inline-flex items-center gap-1.5">
            <BedDouble
              className="size-3.5 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {bedLabel}
          </span>
        </div>

        {/* Description */}
        {room.description ? (
          <p className="mt-4 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
            {room.description}
          </p>
        ) : (
          <div className="mt-4" />
        )}

        {/* Amenities */}
        {visibleAmenities.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {visibleAmenities.map((amenity, index) => (
              <span
                key={`${amenity.name}-${index}`}
                className="border border-border bg-secondary px-2.5 py-1.5 text-[10px] text-secondary-foreground"
              >
                {getAmenitySymbol(amenity.name)}
              </span>
            ))}

            {extraAmenities > 0 && (
              <span className="px-1 text-[10px] text-muted-foreground">
                +{extraAmenities} more
              </span>
            )}
          </div>
        )}

        {/* Price and actions */}
        <div className="mt-auto pt-5">
          <div className="mb-4 h-px bg-border" />

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.18em] text-muted-foreground uppercase">
                Starting from
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                <span className="font-heading text-[26px] leading-tight tracking-[-0.03em] sm:text-[30px]">
                  {formatMoney(room.basePrice, room.currency)}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  / night
                </span>
              </div>

              <p className="mt-1 text-[10px] text-muted-foreground">
                Plus applicable GST
              </p>
            </div>

            <div className="flex shrink-0 items-end gap-2">
              <Link to={`/rooms/${room.slug}`}>
                <button
                  type="button"
                  disabled={!available}
                  className="inline-flex h-10 items-center justify-center gap-2 border border-primary bg-primary px-3 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground sm:px-4"
                >
                  Book now
                  <ArrowUpRight
                    className="size-3.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              </Link>
              <button
                type="button"
                onClick={() => onViewDetails?.(room)}
                className="inline-flex h-10 items-center justify-center gap-2 border border-border bg-transparent px-3 text-[11px] font-medium text-foreground transition-colors hover:border-ring hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-4"
              >
                View
                <ArrowUpRight
                  className="size-3.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default RoomTypeCard;
