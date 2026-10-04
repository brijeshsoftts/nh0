import { Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { getInitials } from "@/lib/format";
import { goldIcon } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "../public.mock";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex gap-1"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating
              ? "fill-amber-500 text-amber-500"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

function Guest({ item }: { item: any }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar className="size-11">
        <AvatarFallback className="bg-linear-to-br from-amber-300 to-amber-600 font-medium text-neutral-950">
          {getInitials(item.guestName)}
        </AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium">{item.guestName}</p>
        <p className="text-muted-foreground">
          {item.guestLocation}, {item.stay}
        </p>
      </div>
    </figcaption>
  );
}

export function TestimonialsSection() {
  const [featured, ...others] = TESTIMONIALS;

  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Words from our guests"
          description="Guests describe their stay better than we can."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {featured && (
            <Card className="rounded-3xl bg-linear-to-br from-amber-500/10 via-card to-card p-7 sm:p-10 lg:col-span-3 lg:row-span-2">
              <figure className="flex h-full flex-col justify-between gap-10">
                <div className="space-y-6">
                  <Quote className={cn("size-10", goldIcon)} aria-hidden />
                  <blockquote className="font-display text-2xl leading-snug text-balance sm:text-3xl">
                    {featured.quote}
                  </blockquote>
                  <Stars rating={featured.rating} />
                </div>
                <Guest item={featured} />
              </figure>
            </Card>
          )}

          {others.map((item) => (
            <Card key={item.id} className="rounded-3xl p-7 lg:col-span-2">
              <figure className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-4">
                  <Stars rating={item.rating} />
                  <blockquote className="leading-relaxed text-foreground/90">
                    {item.quote}
                  </blockquote>
                </div>
                <Guest item={item} />
              </figure>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
