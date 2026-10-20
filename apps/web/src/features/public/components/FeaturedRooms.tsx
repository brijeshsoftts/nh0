import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { type RoomType, RoomTypeCard } from "./RoomTypeCard";

const featuredRooms: RoomType[] = [
  {
    id: "featured-deluxe-king",
    name: "Deluxe King Room",
    slug: "deluxe-king-room",
    description:
      "A calm, light-filled room with a plush king bed, a writing desk and a rain shower, made for restful stays.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      altText: "Deluxe king room with a made bed and soft daylight",
    },
    basePrice: 6500,
    currency: "INR",
    maxGuests: 3,
    adults: 2,
    children: 1,
    bedType: "KING",
    bedCount: 1,
    numberOfRooms: 6,
    amenities: [
      { name: "High-speed Wi-Fi", icon: "wifi" },
      { name: "Air conditioning", icon: "air-vent" },
      { name: "Rain shower", icon: "shower-head" },
    ],
    isActive: true,
  },
  {
    id: "featured-heritage-twin",
    name: "Heritage Twin Room",
    slug: "heritage-twin-room",
    description:
      "Two generous beds, warm textiles and a quiet corner for tea, ideal for friends or family.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      altText: "Twin room with two beds and warm lighting",
    },
    basePrice: 7800,
    currency: "INR",
    maxGuests: 3,
    adults: 3,
    children: 0,
    bedType: "TWIN",
    bedCount: 2,
    numberOfRooms: 2,
    amenities: [
      { name: "High-speed Wi-Fi", icon: "wifi" },
      { name: "Air conditioning", icon: "air-vent" },
      { name: "Tea and coffee maker", icon: "coffee" },
    ],
    isActive: true,
  },
  {
    id: "featured-royal-suite",
    name: "Royal Suite",
    slug: "royal-suite",
    description:
      "A spacious suite with a separate sitting area, a king bed and room to spread out.",
    primaryImage: {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      altText: "Spacious suite with a king bed and sitting area",
    },
    basePrice: 14500,
    currency: "INR",
    maxGuests: 4,
    adults: 3,
    children: 1,
    bedType: "KING",
    bedCount: 1,
    numberOfRooms: 1,
    amenities: [
      { name: "High-speed Wi-Fi", icon: "wifi" },
      { name: "Air conditioning", icon: "air-vent" },
      { name: "Rain shower", icon: "shower-head" },
    ],
    isActive: true,
  },
];

export function FeaturedRooms() {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="featured-rooms-heading"
      className="bg-secondary/35 text-foreground"
    >
      <div className="mx-auto max-w-360 px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <div className="mb-9 grid gap-6 md:mb-11 md:grid-cols-[1fr_0.8fr] md:items-end lg:mb-12">
          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
              The Nivara collection
            </p>
            <h2
              id="featured-rooms-heading"
              className="max-w-xl font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl lg:text-[44px]"
            >
              A room to feel at home in.
            </h2>
            <p className="mt-3 font-heading text-lg leading-snug text-muted-foreground sm:text-xl">
              Find your kind of comfort.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end md:text-right">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground md:text-[15px] md:leading-7">
              From an easy overnight stay to extra space to unwind, explore
              rooms designed to help you rest well.
            </p>
            <Link
              to="/rooms"
              className="group inline-flex min-h-10 items-center gap-2 border-b border-gold/60 pb-1 text-[10px] font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              View all rooms
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {featuredRooms.map((room) => (
            <RoomTypeCard
              key={room.id}
              room={room}
              onViewDetails={() => navigate("/rooms")}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
