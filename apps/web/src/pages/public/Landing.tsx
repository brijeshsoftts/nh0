import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  ChevronRight,
  CircleHelp,
  MessageSquareQuote,
} from "lucide-react";
import { Link } from "react-router-dom";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE } from "@/features/public/public.mock";
import type { AvailableRoomListItem } from "@/features/public/public.types";
import { useAvailableRooms } from "@/features/public/useAvailableRooms";
import { getAmenityIcon } from "@/lib/amenity-icons";

const aboutImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85";

const questions = [
  {
    question: "How do I check room availability?",
    answer:
      "Choose your check-in and check-out dates, then set the number of adults and children. The search takes you to room discovery with those choices included.",
  },
  {
    question: "How do I continue with a room?",
    answer:
      "Review the room details that match your search, then continue from the room page to the booking flow. Availability is checked against your selected dates.",
  },
  {
    question: "Can I change my dates or guest count?",
    answer:
      "Yes. Return to the availability search, update your dates or guest count, and submit the search again.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.16em] text-accent-foreground uppercase">
        {eyebrow}
      </p>
      <h2
        className="mt-3 font-heading text-3xl leading-tight font-medium text-foreground sm:text-4xl lg:text-5xl"
        id={id}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <section className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-foreground text-white sm:min-h-[720px] lg:min-h-[760px]">
        <img
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover object-center"
          fetchPriority="high"
          src={HERO_IMAGE}
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="container mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
              A warm welcome at Nivara
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-[1.05] font-medium text-white sm:text-6xl lg:text-7xl">
              Your comfort,
              <br className="hidden sm:block" /> our priority.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Discover thoughtfully designed rooms and warm hospitality for a
              comfortable stay.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                className="h-12 px-6 text-sm font-semibold"
                nativeButton={false}
                render={<a href="#rooms" />}
                variant="secondary"
              >
                Explore rooms
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button
                className="h-12 border-white/60 bg-transparent px-6 text-sm text-white hover:bg-white/10 hover:text-white"
                nativeButton={false}
                render={<Link to="/about" />}
                variant="outline"
              >
                Discover Nivara
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <div
        className="relative z-10 container mx-auto -mt-14 w-full max-w-7xl px-4 sm:px-6 lg:-mt-16 lg:px-8"
        id="availability"
      >
        <AvailabilitySearch />
      </div>
    </>
  );
}

function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="container mx-auto grid w-full max-w-7xl items-center gap-9 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-14 lg:px-8 lg:py-28"
      id="about"
    >
      <div className="relative">
        <img
          alt="A calm, naturally lit hotel lounge"
          className="aspect-[1.2] w-full rounded-xl object-cover sm:aspect-[1.35]"
          loading="lazy"
          src={aboutImage}
        />
        <div className="absolute -right-2 -bottom-4 hidden h-24 w-24 border-r border-b border-primary sm:block" />
      </div>
      <div className="max-w-xl md:py-8">
        <SectionHeading
          eyebrow="ABOUT NIVARA"
          id="about-title"
          title="A stay that feels welcoming."
        />
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Thoughtful spaces, everyday comforts and attentive hospitality make it
          easier to settle in and enjoy your time away.
        </p>
        <Button
          className="mt-7 h-11 px-5"
          nativeButton={false}
          render={<Link to="/about" />}
          variant="outline"
        >
          Know more about us
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </section>
  );
}

function RoomCard({ room }: { room: AvailableRoomListItem }) {
  const bedDescription = `${room.bedCount} ${room.bedType.toLowerCase().replaceAll("_", " ")} ${room.bedCount === 1 ? "bed" : "beds"}`;
  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(room.basePrice);

  return (
    <article className="group min-w-0">
      <Link
        aria-label={`View ${room.name} details`}
        className="relative block aspect-[1.45] overflow-hidden rounded-lg bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        to={`/rooms/${room.slug}`}
      >
        {room.image ? (
          <img
            alt={room.image.altText ?? room.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            loading="lazy"
            src={room.image.url}
          />
        ) : (
          <span className="grid size-full place-items-center text-muted-foreground">
            <BedDouble aria-hidden="true" className="size-10" />
          </span>
        )}
      </Link>
      <div className="flex items-start justify-between gap-4 pt-4">
        <h3 className="font-heading text-2xl font-medium text-foreground">
          {room.name}
        </h3>
        <p className="shrink-0 text-right text-sm text-muted-foreground">
          <span className="block font-semibold text-foreground">{price}</span>
          per night
        </p>
      </div>
      <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
        {room.description || "Explore the room details for more information."}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        {bedDescription} <span aria-hidden="true">·</span> Up to{" "}
        {room.maxGuests} guests
        {room.sizeSqFt ? ` · ${room.sizeSqFt} sq ft` : ""}
      </p>
      <Link
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        to={`/rooms/${room.slug}`}
      >
        View details <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}

function FeaturedRooms({
  rooms,
  isLoading,
  isError,
  onRetry,
}: {
  rooms: AvailableRoomListItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}) {
  return (
    <section className="bg-muted" id="rooms">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            description="Explore room options with the details and pricing currently listed."
            eyebrow="ROOMS & SUITES"
            title="Find your perfect stay"
          />
          <Button
            className="h-11 self-start px-5 sm:self-auto"
            nativeButton={false}
            render={<Link to="/rooms" />}
            variant="outline"
          >
            View all rooms
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
        {isLoading ? (
          <div
            aria-busy="true"
            aria-label="Loading rooms"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div className="animate-pulse" key={index}>
                <div className="aspect-[1.45] rounded-lg bg-background" />
                <div className="mt-5 h-5 w-2/3 rounded bg-background" />
                <div className="mt-3 h-4 w-full rounded bg-background" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="border-y border-border py-8" role="status">
            <p className="text-base text-foreground">
              Room details are unavailable right now.
            </p>
            <Button className="mt-4" onClick={onRetry} variant="outline">
              Try again
            </Button>
          </div>
        ) : rooms.length ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p className="border-y border-border py-8 text-base text-muted-foreground">
            Room details will appear here when they are published.
          </p>
        )}
      </div>
    </section>
  );
}

function AmenitiesSection({ rooms }: { rooms: AvailableRoomListItem[] }) {
  const amenities = Array.from(
    new Map(
      rooms
        .flatMap((room) => room.amenities)
        .map((amenity) => [amenity.name, amenity])
    ).values()
  ).slice(0, 6);

  return (
    <section
      aria-labelledby="amenities-title"
      className="container mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:px-8 lg:py-28"
      id="amenities"
    >
      <div>
        <SectionHeading
          description="Amenities shown here are taken from the published room details."
          eyebrow="THOUGHTFUL DETAILS"
          id="amenities-title"
          title="Comfort, in the details"
        />
        <Button
          className="mt-7 h-11 px-5"
          nativeButton={false}
          render={<Link to="/rooms" />}
          variant="outline"
        >
          Explore rooms
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
      {amenities.length ? (
        <ul className="grid content-start gap-x-8 gap-y-7 sm:grid-cols-2">
          {amenities.map((amenity) => {
            const Icon = getAmenityIcon(amenity.icon);
            return (
              <li
                className="flex items-center gap-4 border-b border-border pb-5"
                key={amenity.name}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary"
                  strokeWidth={1.6}
                />
                <span className="text-base font-medium text-foreground">
                  {amenity.name}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="self-center border-y border-border py-6 text-sm text-muted-foreground">
          Room amenities will appear here when published room details are
          available.
        </p>
      )}
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-secondary" id="testimonials">
      <div className="container mx-auto flex max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <MessageSquareQuote
          aria-hidden="true"
          className="size-7 text-primary"
          strokeWidth={1.5}
        />
        <h2 className="mt-4 font-heading text-3xl font-medium text-foreground sm:text-4xl">
          Guest stories
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Published guest reviews are not available yet.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      className="container mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[0.75fr_1.25fr] md:gap-16 lg:px-8 lg:py-28"
      id="faq"
    >
      <div>
        <CircleHelp
          aria-hidden="true"
          className="size-6 text-primary"
          strokeWidth={1.5}
        />
        <h2 className="mt-4 max-w-sm font-heading text-3xl leading-tight font-medium text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>
      <Accordion className="border-t border-border">
        {questions.map(({ question, answer }, index) => (
          <AccordionItem
            className="border-border"
            key={question}
            value={`faq-${index}`}
          >
            <AccordionTrigger className="min-h-14 rounded-none border-0 px-0 py-4 text-left text-base font-medium text-foreground hover:no-underline focus-visible:ring-2 focus-visible:ring-ring">
              {question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalBookingSection() {
  return (
    <section className="bg-foreground text-background dark:bg-background dark:text-foreground">
      <div className="container mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 py-14 sm:px-6 sm:py-16 md:flex-row md:items-center lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-background uppercase dark:text-foreground">
            YOUR STAY, YOUR PACE
          </p>
          <h2 className="mt-3 font-heading text-3xl leading-tight font-medium sm:text-4xl">
            Make room for a more comfortable stay.
          </h2>
        </div>
        <Button
          className="h-12 shrink-0 px-6 font-semibold"
          nativeButton={false}
          render={<a href="#availability" />}
          variant="secondary"
        >
          Find your room
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const { rooms, isLoading, isError, refetch } = useAvailableRooms({
    page: 1,
    limit: 3,
  });

  return (
    <div className="min-w-0 bg-background text-foreground" id="top">
      <HeroSection />
      <AboutSection />
      <FeaturedRooms
        isError={isError}
        isLoading={isLoading}
        onRetry={() => void refetch()}
        rooms={rooms}
      />
      <AmenitiesSection rooms={rooms} />
      <TestimonialsSection />
      <FAQSection />
      <FinalBookingSection />
    </div>
  );
}
