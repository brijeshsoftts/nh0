import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/features/public/components/RoomCard";
import { HERO_IMAGE } from "@/features/public/public.mock";
import type { AvailableRoomListItem } from "@/features/public/public.types";
import { useAvailableRooms } from "@/features/public/useAvailableRooms";
import { getAmenityIcon } from "@/lib/amenity-icons";

const aboutImage =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85";
const closingImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90";
const amenityImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
];

function getAmenityImage(name: string, index: number) {
  const label = name.toLowerCase();
  if (label.includes("pool")) return amenityImages[0];
  if (label.includes("restaurant") || label.includes("dining")) {
    return amenityImages[1];
  }
  if (label.includes("spa")) return amenityImages[3];
  if (label.includes("fitness") || label.includes("gym")) {
    return amenityImages[4];
  }
  if (label.includes("wifi") || label.includes("wi-fi")) {
    return amenityImages[2];
  }
  return amenityImages[index % amenityImages.length];
}

const questions = [
  {
    question: "What are the check-in and check-out timings?",
    answer:
      "Timings can vary by property. Please contact the hotel before your visit to confirm the details for your stay.",
  },
  {
    question: "How can I book a room?",
    answer:
      "Choose your dates and guest count in the availability search. You can then review the rooms listed for those dates and continue to booking.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Available payment methods are shown during booking. Contact the hotel if you need help before making a reservation.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Cancellation and change options depend on your reservation. Check the terms shown with your booking or contact the hotel for assistance.",
  },
  {
    question: "Are additional charges applicable?",
    answer:
      "Any applicable taxes or charges are shown with the room and booking details before you confirm.",
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
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
        {eyebrow}
      </p>
      <h2
        className="mt-3 font-heading text-3xl leading-[1.12] font-medium text-foreground sm:text-4xl lg:text-5xl"
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
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto grid min-h-[610px] w-full max-w-7xl items-center gap-9 px-4 pb-24 pt-10 sm:px-6 sm:pb-28 md:grid-cols-[0.76fr_1.24fr] md:gap-8 md:pt-14 lg:px-8 lg:pb-32 lg:pt-16">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-xl py-5 md:py-12"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-accent-foreground uppercase">
              More than just a stay
            </p>
            <h1 className="mt-5 max-w-lg font-heading text-5xl leading-[1.03] font-medium tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.5rem]">
              A place to slow down.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Experience thoughtfully designed spaces, warm hospitality and the
              comfort of feeling at home. Whether you’re here for business or
              leisure, every stay at Nivara is made to feel special.
            </p>
            <a
              className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-foreground transition-colors hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href="#rooms"
            >
              Explore our rooms
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </motion.div>
          <div className="relative md:ml-3 lg:ml-8">
            <div className="absolute -top-5 right-8 z-10 hidden h-24 w-24 rounded-full border border-primary/60 md:block" />
            <img
              alt="A sunlit boutique hotel guest room with considered details and natural materials"
              className="relative aspect-[1.18] w-full object-cover object-center md:aspect-[1.14]"
              fetchPriority="high"
              src={HERO_IMAGE}
            />
            <div className="absolute -bottom-5 -left-3 hidden max-w-52 bg-card px-5 py-4 shadow-md sm:block lg:-left-8">
              <p className="font-heading text-xl text-foreground">Stay awhile</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Thoughtful comfort, from the moment you arrive.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="relative z-10 container mx-auto -mt-16 w-full max-w-7xl px-4 sm:px-6 lg:-mt-20 lg:px-8"
        id="availability"
      >
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="h-px w-8 bg-primary" />
          <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
            Plan your stay
          </p>
        </div>
        <AvailabilitySearch className="rounded-md p-5 sm:p-6" />
      </div>
    </>
  );
}

function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="container mx-auto grid w-full max-w-7xl items-center gap-9 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-[1.08fr_0.92fr] md:gap-16 lg:px-8 lg:py-32"
      id="about"
    >
      <div className="relative">
        <img
          alt="A calm, naturally lit hotel lounge"
          className="aspect-[1.12] w-full object-cover sm:aspect-[1.3]"
          loading="lazy"
          src={aboutImage}
        />
        <div className="absolute -right-2 -bottom-4 hidden h-24 w-24 border-r border-b border-primary sm:block" />
      </div>
      <div className="max-w-xl md:py-8">
        <SectionHeading
          eyebrow="ABOUT NIVARA"
          id="about-title"
          title="Hospitality with a personal touch."
        />
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          At Nivara, we believe a great stay is about more than just a room. It’s
          about the little moments — a warm welcome, thoughtful service and
          spaces that make you feel at ease.
        </p>
        <Button
          className="mt-7 h-11 px-5"
          nativeButton={false}
          render={<Link to="/about" />}
          variant="outline"
        >
          Discover our story
          <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    </section>
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
            description="Thoughtfully designed rooms for every kind of stay."
            eyebrow="ROOMS & SUITES"
            title="Find your kind of comfort."
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
              <RoomCard key={room.id} room={room} showTaxNote />
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
      className="bg-secondary/45"
      id="amenities"
    >
      <div className="container mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <SectionHeading
            description="A few considered details, gathered from the amenities listed with our rooms."
            eyebrow="THE LITTLE THINGS"
            id="amenities-title"
            title="Everything you need, thoughtfully arranged."
          />
          <Link
            className="inline-flex min-h-11 items-center gap-2 self-start border-b border-primary pb-1 text-sm font-semibold text-foreground hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:mb-1"
            to="/rooms"
          >
            Explore the rooms <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      {amenities.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {amenities.map((amenity, index) => {
            const Icon = getAmenityIcon(amenity.icon);
            return (
              <li
                className={`group relative isolate flex aspect-[1.05] items-end overflow-hidden bg-foreground text-white ${index === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto" : ""}`}
                key={amenity.name}
              >
                <img
                  alt=""
                  className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                  loading="lazy"
                  src={getAmenityImage(amenity.name, index)}
                />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="flex w-full items-center justify-between gap-2 p-3 sm:p-5">
                  <span className="font-heading text-base leading-tight sm:text-xl">{amenity.name}</span>
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-white/90 sm:size-5" strokeWidth={1.6} />
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="border-y border-border py-6 text-sm text-muted-foreground">
          Room amenities will appear here when published room details are available.
        </p>
      )}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion() ?? false;
  const testimonials = [
    {
      name: "Ananya S.",
      city: "Chennai",
      room: "Deluxe room",
      quote:
        "The room felt calm, the booking details were clear, and check-in was straightforward.",
    },
    {
      name: "Rohan K.",
      city: "Pune",
      room: "Double room",
      quote:
        "I appreciated having space to unwind after a full day out. Everything I needed was easy to find.",
    },
    {
      name: "Meera D.",
      city: "Mumbai",
      room: "Suite",
      quote:
        "A comfortable stay with thoughtful touches. The room was clean and restful.",
    },
    {
      name: "Kunal P.",
      city: "Hyderabad",
      room: "Deluxe room",
      quote:
        "Finding a room for my dates was simple, and the details matched what I expected.",
    },
    {
      name: "Aisha R.",
      city: "Kochi",
      room: "Double room",
      quote:
        "The welcoming atmosphere made the stay feel easy from the moment I arrived.",
    },
    {
      name: "Nikhil M.",
      city: "New Delhi",
      room: "Suite",
      quote: "I had a relaxing stay and appreciated the well-arranged room.",
    },
  ];
  const move = (step: number) => {
    setDirection(step);
    setActiveIndex(
      (current) => (current + step + testimonials.length) % testimonials.length
    );
  };
  const visibleTestimonials = [-1, 0, 1].map((offset) => ({
    testimonial:
      testimonials[
        (activeIndex + offset + testimonials.length) % testimonials.length
      ],
    isActive: offset === 0,
  }));

  return (
    <section className="overflow-hidden bg-muted" id="testimonials">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            description="A glimpse of the welcome we hope every guest will remember."
            eyebrow="GUEST STORIES"
            title="Experiences worth sharing."
          />
          <span className="self-start border border-border px-3 py-2 text-xs text-muted-foreground md:mb-1">
            Illustrative sample content
          </span>
        </div>

        <div
          aria-label="Guest testimonials"
          aria-roledescription="carousel"
          className="mx-auto max-w-6xl"
          role="region"
        >
          <div className="min-h-72">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center lg:gap-5"
                exit={{
                  opacity: reduceMotion ? 1 : 0,
                  x: reduceMotion ? 0 : direction * -28,
                }}
                initial={
                  reduceMotion ? false : { opacity: 0, x: direction * 28 }
                }
                key={activeIndex}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: "easeOut",
                }}
              >
                {visibleTestimonials.map(({ testimonial, isActive }) => (
                  <figure
                    aria-label={`${testimonial.name} from ${testimonial.city}`}
                    aria-roledescription="slide"
                    className={`${
                      isActive
                        ? "flex min-h-72 bg-foreground text-background shadow-lg dark:bg-card dark:text-card-foreground"
                        : "hidden min-h-64 bg-card text-card-foreground shadow-sm lg:flex lg:translate-y-5"
                    } flex-col justify-between rounded-lg p-6 sm:p-8`}
                    key={testimonial.name}
                  >
                    <div>
                      <MessageSquareQuote
                        aria-hidden="true"
                        className="size-6 text-primary"
                        strokeWidth={1.5}
                      />
                      {isActive ? (
                        <div
                          aria-label="Illustrative rating: five out of five"
                          className="mt-4 flex items-center gap-1 text-primary"
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              aria-hidden="true"
                              className="size-3.5 fill-current"
                              key={index}
                            />
                          ))}
                          <span className="ml-2 text-[11px] text-background/70 dark:text-muted-foreground">
                            Sample rating
                          </span>
                        </div>
                      ) : null}
                      <blockquote
                        className={`${isActive ? "text-background dark:text-card-foreground" : "text-card-foreground"} mt-5 font-heading text-lg leading-relaxed sm:text-xl`}
                      >
                        “{testimonial.quote}”
                      </blockquote>
                    </div>
                    <figcaption className="mt-7 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold`}
                      >
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {testimonial.name}
                        </span>
                        <span
                          className={`${isActive ? "text-background/70 dark:text-muted-foreground" : "text-muted-foreground"} mt-0.5 block text-xs`}
                        >
                          {testimonial.city} <span aria-hidden="true">·</span>{" "}
                          {testimonial.room}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              aria-label="Show previous testimonial"
              className="size-11 rounded-full"
              onClick={() => move(-1)}
              size="icon"
              variant="outline"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </Button>
            <p
              aria-live="polite"
              className="min-w-16 text-center text-xs font-medium text-muted-foreground tabular-nums"
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </p>
            <Button
              aria-label="Show next testimonial"
              className="size-11 rounded-full"
              onClick={() => move(1)}
              size="icon"
              variant="outline"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </Button>
          </div>
        </div>
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
        <p className="text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase">
          Need to know
        </p>
        <h2 className="mt-4 max-w-sm font-heading text-3xl leading-tight font-medium text-foreground sm:text-4xl">
          A few things you may want to know.
        </h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
          Find a quick answer before you plan your stay. Booking specific terms
          are shown during reservation.
        </p>
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
    <section className="relative isolate overflow-hidden bg-foreground text-background">
      <img
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover"
        loading="lazy"
        src={closingImage}
      />
      <div className="absolute inset-0 -z-10 bg-foreground/75" />
      <div className="container mx-auto flex min-h-[380px] max-w-7xl flex-col items-start justify-center gap-7 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.15em] text-background/80 uppercase">
            Nivara Hotels
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-tight font-medium sm:text-5xl">
            Your next stay starts here.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-background/85">
            Book your stay with Nivara and enjoy a comfortable, thoughtfully arranged experience.
          </p>
        </div>
        <Button
          className="h-12 shrink-0 px-6 font-semibold"
          nativeButton={false}
          render={<a href="#availability" />}
          variant="secondary"
        >
          Book now
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
