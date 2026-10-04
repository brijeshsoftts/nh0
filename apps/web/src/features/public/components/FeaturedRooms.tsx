import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BedDouble } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";

import { Button } from "@/components/ui/button";
import { goldIcon } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { AvailableRoomListItemResponse } from "@/types/room.types";
import { RoomCard, RoomCardSkeleton } from "@/components/common/RoomCard";
import { RoomDetailsDialog } from "@/components/common/RoomDetailsDialog";

type FeaturedRoomsProps = {
  rooms: AvailableRoomListItemResponse[];
  isLoading?: boolean;
};

export function FeaturedRooms({
  rooms,
  isLoading = false,
}: FeaturedRoomsProps) {
  // The slug is kept after closing so the dialog content survives its exit animation.
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleView = (slug: string) => {
    setSelectedSlug(slug);
    setIsDialogOpen(true);
  };

  return (
    <section id="rooms" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Rooms worth coming back to"
            description="Each room is kept to the same standard: spotless, quiet and ready when you arrive."
          />
          <Link to="/rooms">
            <Button variant="outline" className="w-fit rounded-full">
              View all rooms
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <RoomCardSkeleton key={index} />
              ))
            : rooms.map((room) => (
                <RoomCard key={room.slug} room={room} onView={handleView} />
              ))}
        </div>

        {!isLoading && rooms.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-dashed py-16 text-center">
            <BedDouble className={cn("size-8", goldIcon)} />
            <p className="font-display text-2xl">Rooms are being prepared</p>
            <p className="text-sm text-muted-foreground">
              Please check back shortly.
            </p>
          </div>
        )}
      </div>

      <RoomDetailsDialog
        slug={selectedSlug}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
