import { BedDouble, ChevronLeft, ChevronRight } from "lucide-react";
import { type KeyboardEvent, useMemo, useState } from "react";

import type { RoomTypeDetails } from "@/features/rooms/roomTypes/roomTypes.types";
import { cn } from "@/lib/utils";

type RoomGalleryProps = {
  images: RoomTypeDetails["images"];
  roomName: string;
};

export function RoomGallery({ images = [], roomName }: RoomGalleryProps) {
  const sorted = useMemo(
    () =>
      [...images].sort(
        (a, b) =>
          Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder
      ),
    [images]
  );
  const [index, setIndex] = useState(0);
  const count = sorted.length;
  const current = sorted[index];

  if (!current) {
    return (
      <div className="grid aspect-4/3 place-items-center bg-muted">
        <BedDouble className="size-14 text-muted-foreground" />
      </div>
    );
  }

  const go = (next: number) => setIndex((next + count) % count);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") go(index - 1);
    if (event.key === "ArrowRight") go(index + 1);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${roomName} photos`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          key={current.url}
          src={current.url}
          alt={current.altText ?? roomName}
          className="size-full animate-in object-cover duration-500 fade-in motion-reduce:animate-none"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/25"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChevronRight className="size-5" />
            </button>
            <span
              aria-live="polite"
              className="absolute right-3 bottom-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white tabular-nums backdrop-blur-md"
            >
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-4 sm:px-6">
          {sorted.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-14 w-20 shrink-0 overflow-hidden rounded-lg transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                i === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={image.url}
                alt={image.altText ?? roomName}
                loading="lazy"
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
