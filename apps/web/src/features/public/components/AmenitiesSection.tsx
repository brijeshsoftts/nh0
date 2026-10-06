import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { icons } from "@/constants/icons";
import { useAmenities } from "@/features/rooms/amenities/hooks/useAmenities";
import { goldIconBox } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function AmenitiesSection() {
  const { items } = useAmenities({ limit: 10 });

  return (
    <section id="amenities" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20 lg:px-8">
        <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            title="Everything a good night needs"
            description="Considered essentials in every room, so nothing stands between you and proper rest."
          />
          <Link to="/rooms">
            <Button variant="outline" className="rounded-full">
              See the rooms
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        <ul className="grid gap-x-12 sm:grid-cols-2">
          {items.map((amenity) => {
            const Icon = icons[amenity.icon] || Sparkles;

            return (
              <li key={amenity.id} className="flex gap-4 border-t py-7">
                <span className={cn(goldIconBox)}>
                  <Icon className="size-5" />
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-display text-xl font-medium">
                    {amenity.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {amenity.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
