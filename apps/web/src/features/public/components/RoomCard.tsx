import { ArrowRight, Bed, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface RoomData {
  id: string;
  title: string;
  price: number;
  description: string;
  maxGuests: number;
  bedCount: number;
  image: {
    url: string;
    altText: string | null;
  } | null;
  amenities: {
    name: string;
    icon: string | null;
  }[];
}

interface RoomCardProps {
  room: RoomData;
  className?: string;
}

export function RoomCard({ room, className }: RoomCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN").format(room.price);

  return (
    <Card
      className={cn(
        "group flex w-full max-w-105 flex-col overflow-hidden rounded-2xl border border-border bg-card py-0 font-sans shadow-[0_4px_20px_rgb(0,0,0,0.03)]",
        className
      )}
    >
      {/* Room Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={room.image?.url || "/images/placeholder-room.jpg"}
          alt={room.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      {/* Content Area */}
      <div className="flex grow flex-col p-4">
        {/* Header: Title & Price */}
        <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="min-w-0 font-serif text-xl font-semibold tracking-tight break-words text-foreground sm:text-2xl">
            {room.title}
          </h3>
          <div className="mt-1 shrink-0 text-right">
            <span className="text-base font-bold text-foreground">
              ₹ {formattedPrice}
            </span>
            <span className="text-sm text-foreground/70"> / night</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground/70">
          {room.description}
        </p>

        {/* Amenities Row */}
        <div className="mb-4 flex flex-wrap gap-2.5">
          <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/80">
            <Users className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            {room.maxGuests} {room.maxGuests === 1 ? "Guest" : "Guests"}
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/80">
            <Bed className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            {room.bedCount} {room.bedCount === 1 ? "Bed" : "Beds"}
          </div>

          {/* <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/80">
            <Droplet className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            {room.amenities.view}
          </div>

          {room.amenities.hasWifi && (
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/80">
              <Wifi className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
              Free Wi-Fi
            </div>
          )} */}
        </div>

        {/* Action Button */}
        <div className="mt-auto grid grid-cols-2 gap-x-4">
          <Button
            nativeButton={false}
            render={<Link to={`/rooms/${room.id}`} />}
            className="group/button h-11 w-full rounded-full text-sm font-medium shadow-sm transition-all"
            variant="outline"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link to={`/rooms/${room.id}/book`} />}
            className="group/button h-11 w-full rounded-full text-sm font-medium shadow-sm transition-all"
          >
            Book Now
            <Calendar className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
