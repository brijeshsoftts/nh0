import { addDays, format, isValid, parseISO, startOfToday } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import {
  BedDouble,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RoomCard } from "@/features/public/components/RoomCard";
import { useAvailableRooms } from "@/features/public/useAvailableRooms";

const PAGE_SIZE = 6;
const roomHeroImage =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1500&q=88";

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
  for (const key of [
    "checkInDate",
    "checkOutDate",
    "adults",
    "children",
    "roomType",
    "sortBy",
  ]) {
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
  const navigate = useNavigate();
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
  const roomType = searchParams.get("roomType") ?? undefined;
  const requestedSort = searchParams.get("sortBy");
  const sortBy =
    requestedSort === "price-asc" || requestedSort === "price-desc"
      ? requestedSort
      : "recommended";
  const requestedPage = parseCount(searchParams.get("page"), 1, 1, 100000);
  const { rooms, pagination, isLoading, isError, refetch } = useAvailableRooms({
    ...dateRange,
    adults,
    children,
    roomType,
    sortBy,
    page: requestedPage,
    limit: PAGE_SIZE,
  });
  const { rooms: roomTypeRooms } = useAvailableRooms({
    ...dateRange,
    adults,
    children,
    page: 1,
    limit: 100,
  });
  const roomTypeOptions = Array.from(
    new Map(
      roomTypeRooms.map((room) => [room.slug, room.name] as const)
    ).entries()
  ).map(([value, label]) => ({ value, label }));
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
  const guestSummary = `${adults} adult${adults === 1 ? "" : "s"}, ${children} ${children === 1 ? "child" : "children"}`;
  const staySummary = `${format(parseISO(dateRange.checkInDate), "d MMM yyyy")} – ${format(parseISO(dateRange.checkOutDate), "d MMM yyyy")}`;

  const changeSort = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("sortBy", value);
    nextParams.set("page", "1");
    navigate(`/rooms?${nextParams.toString()}`);
  };

  return (
    <div className="min-w-0 bg-background text-foreground">
      <section className="bg-secondary/45">
        <div className="container mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:px-8 lg:py-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.15em] text-accent-foreground uppercase">
              Discover your stay
            </p>
            <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.08] font-medium tracking-[-0.025em] text-foreground sm:text-5xl lg:text-6xl">
              Rooms designed for the way you stay.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              From comfortable spaces for a short getaway to thoughtfully
              designed suites for longer stays, find the right room for your
              time at Nivara.
            </p>
          </motion.div>
          <div className="relative md:ml-3 lg:ml-8">
            <img
              alt="Quietly detailed boutique hotel room with natural light"
              className="aspect-[1.65] w-full object-cover sm:aspect-[1.8] md:aspect-[1.28]"
              fetchPriority="high"
              src={roomHeroImage}
            />
            <div className="absolute right-3 -bottom-3 flex items-center gap-2 bg-card px-4 py-3 shadow-sm sm:right-6">
              <BedDouble aria-hidden="true" className="size-4 text-primary" />
              <span className="font-heading text-base text-foreground">
                Find your place to pause
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container mx-auto w-full max-w-7xl scroll-mt-24 px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8"
        id="availability"
      >
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="h-px w-8 bg-primary" />
          <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
            Plan your stay
          </p>
        </div>
        <AvailabilitySearch
          key={searchParams.toString()}
          roomTypeOptions={roomTypeOptions}
          submitLabel="Find rooms"
        />
      </section>

      <motion.section
        aria-labelledby="results-title"
        className="container mx-auto w-full max-w-7xl scroll-mt-24 px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24"
        id="room-results"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
      >
        <div className="mb-7 flex flex-col gap-5 border-b border-border pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="font-heading text-3xl font-medium text-foreground sm:text-4xl"
              id="results-title"
            >
              Find your perfect room.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore our thoughtfully designed spaces and choose the stay that
              suits you.
            </p>
            <p
              aria-live="polite"
              className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:text-sm"
            >
              <span>
                {isLoading
                  ? "Loading room types…"
                  : isError
                    ? "Room results unavailable"
                    : `Showing ${firstResult}–${lastResult} of ${total} room types`}
              </span>
              <span aria-hidden="true">·</span>
              <CalendarDays
                aria-hidden="true"
                className="size-3.5 text-primary"
              />
              <span>{staySummary}</span>
              <span aria-hidden="true">·</span>
              <span>{guestSummary}</span>
            </p>
          </div>
          <label
            className="flex shrink-0 flex-col gap-2 text-xs font-medium text-muted-foreground"
            htmlFor="room-sort"
          >
            Sort by
            <span className="relative">
              <select
                className="h-11 min-w-52 appearance-none rounded-md border border-input bg-background py-2 pr-9 pl-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
                id="room-sort"
                onChange={(event) => changeSort(event.target.value)}
                value={sortBy}
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
            </span>
          </label>
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
                  showAvailability
                  showTaxNote
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

      <section className="bg-secondary/45">
        <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-14 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-medium text-foreground sm:text-4xl">
              Need help choosing your stay?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore the available room options or get in touch with our team
              for assistance.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              className="h-11 w-full px-5 font-semibold sm:w-auto"
              nativeButton={false}
              render={<a href="#room-results" />}
              variant="default"
            >
              Explore rooms
            </Button>
            <Button
              className="h-11 w-full px-5 sm:w-auto"
              nativeButton={false}
              render={<Link to="/contact" />}
              variant="outline"
            >
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
