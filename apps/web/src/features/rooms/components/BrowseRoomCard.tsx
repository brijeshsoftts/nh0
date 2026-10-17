import { ArrowRight, BedDouble, CheckCircle2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface BrowseRoom {
  id: string;
  slug: string;
  name: string;
  image: string;
  bedConfiguration: string;
  maxOccupancy: number;
  availableRooms: number;
  pricePerNight: number;
  currency?: string;
  description?: string;
}

export function BrowseRoomCard({ room }: { room: BrowseRoom }) {
  const available = room.availableRooms > 0;

  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: room.currency ?? "INR",
    maximumFractionDigits: 0,
  }).format(room.pricePerNight);

  return (
    <Card className="group overflow-hidden rounded-lg border-border bg-card py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-44 shrink-0 overflow-hidden bg-muted sm:h-auto sm:min-h-[190px] sm:w-40 md:w-48">
          <img
            src={room.image}
            alt={room.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <Badge
            variant={available ? "secondary" : "destructive"}
            className="absolute top-2 left-2 gap-1 text-xs"
          >
            {available && <CheckCircle2 className="h-3 w-3" />}
            {available ? `${room.availableRooms} Available` : "Sold Out"}
          </Badge>
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col">
          <CardContent className="flex-1 space-y-3 p-3 sm:p-4">
            <div>
              <h3 className="line-clamp-1 text-base font-semibold text-card-foreground">
                {room.name}
              </h3>

              {room.description && (
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {room.description}
                </p>
              )}
            </div>

            {/* Bed & Occupancy */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" />
                {room.bedConfiguration}
              </span>

              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {room.maxOccupancy} Guests
              </span>
            </div>

            {/* Price & Availability */}
            <div className="flex flex-wrap items-end justify-between gap-2 border-t border-border pt-3">
              <div>
                <p className="text-[11px] text-muted-foreground">
                  Price per night
                </p>
                <p className="text-xl leading-tight font-bold text-card-foreground">
                  {price}
                </p>
              </div>
            </div>
          </CardContent>

          {/* Actions */}
          <CardFooter className="w-fit gap-2 border-0 px-3 pt-0 pb-3 sm:px-4 sm:pb-4">
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>

            <Button size="sm" className="flex-1" disabled={!available}>
              Book Room
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
