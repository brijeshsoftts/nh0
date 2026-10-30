import { addDays, format, isValid, parseISO, startOfToday } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RoomCard } from "@/features/public/components/RoomCard";
import { useAvailableRooms } from "@/features/public/useAvailableRooms";

const PAGE_SIZE = 6;

function parseCount(
  value: string | null,
  fallback: number,
  min: number,
  max: number
) {
  if (value === null || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : fallback;
}

function getValidDateRange(searchParams: URLSearchParams) {
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  if (!checkInDate || !checkOutDate) return undefined;

  const checkIn = parseISO(checkInDate);
  const checkOut = parseISO(checkOutDate);
  if (
    !isValid(checkIn) ||
    !isValid(checkOut) ||
    checkIn < startOfToday() ||
    checkOut <= checkIn
  ) {
    return undefined;
  }

  return { checkInDate, checkOutDate };
}

function buildPageHref(searchParams: URLSearchParams, page: number) {
  const nextParams = new URLSearchParams();
  for (const key of ["checkInDate", "checkOutDate", "adults", "children"]) {
    const value = searchParams.get(key);
    if (value !== null) nextParams.set(key, value);
  }
  nextParams.set("page", String(page));
  return `/rooms?${nextParams.toString()}`;
}

function getPageItems(currentPage: number, totalPages: number) {
  const pages = Array.from(
    new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter(
        (page) => page >= 1 && page <= totalPages
      )
    )
  ).sort((first, second) => first - second);

  return pages.flatMap((page, index) => {
    const previousPage = pages[index - 1];
    return [
      ...(previousPage && page - previousPage > 1 ? ["ellipsis"] : []),
      page,
    ];
  });
}

function RoomCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <Skeleton
        className="aspect-[16/10] w-full rounded-none"
        style={{ aspectRatio: "16 / 10" }}
      />
      <div className="space-y-4 p-5 sm:p-6">
        <Skeleton className="h-7 w-3/5" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-7 w-1/2" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-11" />
          <Skeleton className="h-11" />
        </div>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
}) {
  if (totalPages <= 1) return null;
  const pageItems = getPageItems(page, totalPages);

  return (
    <nav
      aria-label="Room results pages"
      className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5"
    >
      {page > 1 ? (
        <Button
          className="h-11 px-3 sm:px-4"
          nativeButton={false}
          render={
            <Link
              aria-label="Go to previous page"
              to={buildPageHref(searchParams, page - 1)}
            />
          }
          variant="outline"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
      ) : (
        <Button
          aria-label="Previous page"
          className="h-11 px-3 sm:px-4"
          disabled
          variant="outline"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
      )}

      <div className="hidden items-center gap-1 sm:flex">
        {pageItems.map((item, index) =>
          typeof item === "number" ? (
            <Button
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
              className="size-11 p-0"
              key={item}
              nativeButton={false}
              render={<Link to={buildPageHref(searchParams, item)} />}
              variant={item === page ? "default" : "ghost"}
            >
              {item}
            </Button>
          ) : (
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center text-muted-foreground"
              key={`${item}-${index}`}
            >
              …
            </span>
          )
        )}
      </div>
      <p className="text-xs font-medium text-muted-foreground tabular-nums sm:hidden">
        Page {page} of {totalPages}
      </p>

      {page < totalPages ? (
        <Button
          className="h-11 px-3 sm:px-4"
          nativeButton={false}
          render={
            <Link
              aria-label="Go to next page"
              to={buildPageHref(searchParams, page + 1)}
            />
          }
          variant="outline"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      ) : (
        <Button
          aria-label="Next page"
          className="h-11 px-3 sm:px-4"
          disabled
          variant="outline"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      )}
    </nav>
  );
}

export default function RoomsPage() {
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion() ?? false;
  const dateRange =
    getValidDateRange(searchParams) ??
    (() => {
      const checkIn = startOfToday();
      return {
        checkInDate: format(checkIn, "yyyy-MM-dd"),
        checkOutDate: format(addDays(checkIn, 1), "yyyy-MM-dd"),
      };
    })();
  const adults = parseCount(searchParams.get("adults"), 2, 1, 10);
  const children = parseCount(searchParams.get("children"), 0, 0, 10);
  const requestedPage = parseCount(searchParams.get("page"), 1, 1, 100000);
  const { rooms, pagination, isLoading, isError, refetch } = useAvailableRooms({
    ...dateRange,
    adults,
    children,
    page: requestedPage,
    limit: PAGE_SIZE,
  });
  const total = pagination?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const currentPage = pagination?.page ?? requestedPage;
  const firstResult = total ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const lastResult = Math.min(currentPage * PAGE_SIZE, total);
  const bookingParams = new URLSearchParams({
    checkInDate: dateRange.checkInDate,
    checkOutDate: dateRange.checkOutDate,
    adults: String(adults),
    children: String(children),
  });
  const bookingSearch = `?${bookingParams.toString()}`;

  return (
    <div className="min-w-0 bg-background text-foreground">
      <motion.section
        className="container mx-auto w-full max-w-7xl px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-7 lg:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold tracking-[0.16em] text-accent-foreground uppercase">
          Explore Nivara
        </p>
        <h1 className="mt-2 font-heading text-3xl leading-tight font-medium text-foreground sm:text-4xl">
          Find a Room That Feels Right
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Discover comfortable rooms designed to make your stay relaxing and
          convenient. Explore the available options and choose the room that
          suits your visit.
        </p>
        <div className="mt-5 scroll-mt-24 sm:mt-6" id="availability">
          <AvailabilitySearch />
        </div>
      </motion.section>

      <motion.section
        aria-labelledby="results-title"
        className="container mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8"
        id="room-results"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
      >
        <div className="mb-4 flex flex-col gap-2 border-b border-border pb-4 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="font-heading text-2xl font-medium text-foreground sm:text-3xl"
              id="results-title"
            >
              Available Rooms
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore our room options and find the right space for your stay.
            </p>
          </div>
          <p
            aria-live="polite"
            className="shrink-0 text-sm text-muted-foreground"
          >
            {isLoading
              ? "Loading room options…"
              : isError
                ? "Room results unavailable"
                : `Showing ${firstResult}–${lastResult} of ${total} rooms`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: PAGE_SIZE }, (_, index) => (
              <RoomCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="border-y border-border py-8" role="alert">
            <p className="font-medium text-foreground">
              We couldn’t load the room results.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please try again in a moment.
            </p>
            <Button
              className="mt-4 h-11"
              onClick={() => void refetch()}
              variant="outline"
            >
              Try again
            </Button>
          </div>
        ) : rooms.length ? (
          <>
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {rooms.map((room) => (
                <RoomCard
                  bookingSearch={bookingSearch}
                  key={room.id}
                  room={room}
                />
              ))}
            </div>
            <Pagination
              page={currentPage}
              searchParams={searchParams}
              totalPages={totalPages}
            />
          </>
        ) : (
          <div className="border-y border-border py-10 text-center">
            <h3 className="font-heading text-2xl font-medium text-foreground">
              No Rooms Found
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              We couldn’t find rooms matching your selected dates and guest
              requirements. Try adjusting your search dates or guest count.
            </p>
            <Button
              className="mt-5 h-11"
              nativeButton={false}
              render={<a href="#availability" />}
              variant="outline"
            >
              Update availability search
            </Button>
          </div>
        )}
      </motion.section>

      <section className="bg-foreground text-background dark:bg-card dark:text-card-foreground">
        <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-7 sm:px-6 sm:py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-medium sm:text-3xl">
              Your Comfortable Stay Starts Here
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-background/75 sm:text-base dark:text-muted-foreground">
              Found a room that suits your plans? Explore the details and book
              your stay with Nivara.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              className="h-11 w-full px-5 font-semibold sm:w-auto"
              nativeButton={false}
              render={<a href="#room-results" />}
              variant="secondary"
            >
              Explore rooms
            </Button>
            <Button
              className="h-11 w-full border-background/50 bg-transparent px-5 text-background hover:bg-background/10 hover:text-background sm:w-auto dark:border-foreground/50 dark:text-foreground dark:hover:bg-foreground/10"
              nativeButton={false}
              render={<a href="#availability" />}
              variant="outline"
            >
              Check availability
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
