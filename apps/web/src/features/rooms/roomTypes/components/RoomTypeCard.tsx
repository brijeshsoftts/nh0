import { motion } from "framer-motion";
import {
  Baby,
  BedDouble,
  CheckCircle2,
  DoorOpen,
  Eye,
  Pencil,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { useState } from "react";

import { RoomTypeDetailsDialog } from "@/components/common/RoomTypeDetailsDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { RoomType } from "../roomTypes.types";

interface RoomTypeCardProps {
  roomType: RoomType;
}

const MAX_VISIBLE_AMENITIES = 4;

export function RoomTypeCard({ roomType }: RoomTypeCardProps) {
  const visibleAmenities = roomType.amenities.slice(0, MAX_VISIBLE_AMENITIES);
  const [open, setOpen] = useState(false);

  const remainingAmenities =
    roomType.amenities.length - visibleAmenities.length;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: roomType.currency,
    maximumFractionDigits: 0,
  }).format(roomType.basePrice);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full"
      >
        <Card className="group flex h-full flex-col overflow-hidden border-border/60 bg-card p-0 shadow-sm transition-shadow duration-300 hover:shadow-xl">
          {/* ───────────────── Image ───────────────── */}
          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            {roomType.primaryImage?.url ? (
              <img
                src={roomType.primaryImage.url}
                alt={roomType.primaryImage.altText ?? roomType.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                <BedDouble className="size-12 opacity-30" />
              </div>
            )}

            {/* Image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent opacity-70" />

            {/* Status */}
            <div className="absolute top-4 left-4">
              <Badge
                variant={roomType.isActive ? "secondary" : "outline"}
                className="rounded-full border border-white/20 bg-background/85 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-md"
              >
                {roomType.isActive ? (
                  <>
                    <CheckCircle2 className="mr-1.5 size-3.5" />
                    Active
                  </>
                ) : (
                  "Inactive"
                )}
              </Badge>
            </div>

            {/* Rooms available */}
            <div className="absolute right-4 bottom-4">
              <Badge
                variant="secondary"
                className="rounded-full border border-white/20 bg-background/85 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-md"
              >
                <DoorOpen className="mr-1.5 size-3.5" />
                {roomType.numberOfRooms}
                {roomType.numberOfRooms === 1 ? "room" : "rooms"}
              </Badge>
            </div>
          </div>

          {/* ───────────────── Content ───────────────── */}
          <CardContent className="flex flex-1 flex-col p-5">
            {/* Name + Price */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold tracking-tight text-foreground">
                  {roomType.name}
                </h3>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {roomType.slug}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {formattedPrice}
                </p>

                <p className="text-[11px] text-muted-foreground">per night</p>
              </div>
            </div>

            {/* Occupancy */}
            <div className="mt-5 grid grid-cols-3 divide-x rounded-xl border border-border/60 bg-muted/30 py-3">
              <InfoItem
                icon={Users}
                label="Guests"
                value={roomType.maxGuests}
              />

              <InfoItem
                icon={UserRound}
                label="Adults"
                value={roomType.adults}
              />

              <InfoItem
                icon={Baby}
                label="Children"
                value={roomType.children}
              />
            </div>

            {/* Bed information */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
                <BedDouble className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  Sleeping arrangement
                </p>

                <p className="mt-0.5 truncate text-sm font-medium">
                  {formatBedType(roomType.bedType)}
                  <span className="font-normal text-muted-foreground">
                    × {roomType.bedCount}
                  </span>
                </p>
              </div>
            </div>

            {/* Amenities */}
            {roomType.amenities.length > 0 && (
              <>
                <Separator className="my-5 bg-border/60" />

                <div>
                  <p className="mb-2.5 text-xs font-medium text-muted-foreground">
                    Amenities
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {visibleAmenities.map((amenity) => (
                      <Badge
                        key={`${amenity.name}-${amenity.icon}`}
                        variant="secondary"
                        className="rounded-md bg-muted/60 px-2 py-1 text-xs font-normal"
                      >
                        {amenity.icon && (
                          <span className="mr-1.5">{amenity.icon}</span>
                        )}

                        {amenity.name}
                      </Badge>
                    ))}

                    {remainingAmenities > 0 && (
                      <Badge
                        variant="outline"
                        className="rounded-md px-2 py-1 text-xs font-normal text-muted-foreground"
                      >
                        +{remainingAmenities} more
                      </Badge>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>

          {/* ───────────────── Actions ───────────────── */}
          <CardFooter className="grid grid-cols-2 gap-2 border-t border-border/60 bg-muted/10 p-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 gap-2"
            >
              <Pencil className="size-3.5" />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 gap-2"
              onClick={() => setOpen(true)}
            >
              <Eye className="size-3.5" />
              View
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 gap-2"
            >
              Book Now
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {open && (
        <RoomTypeDetailsDialog
          onOpenChange={setOpen}
          open={open}
          slug={roomType.slug}
        />
      )}
    </>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
}
function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col items-center justify-center px-2 text-center">
      <Icon className="mb-1 size-3.5 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground"> {value} </span>
      <span className="text-[10px] text-muted-foreground"> {label} </span>
    </div>
  );
}
function formatBedType(bedType: RoomType["bedType"]) {
  const labels: Record<RoomType["bedType"], string> = {
    SINGLE: "Single bed",
    TWIN: "Twin beds",
    DOUBLE: "Double bed",
    QUEEN: "Queen bed",
    KING: "King bed",
    BUNK: "Bunk bed",
    SOFA_BED: "Sofa bed",
  };
  return labels[bedType];
}
