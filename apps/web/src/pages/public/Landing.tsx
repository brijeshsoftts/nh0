import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Flower2,
  Quote,
  Star,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const rooms = [
  {
    name: "Deluxe Suite",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    description: "A quiet retreat with generous space and considered detail.",
    area: "45 sq m",
    price: "18,000",
  },
  {
    name: "Heritage Room",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
    description: "Classic character, softened by warm natural materials.",
    area: "38 sq m",
    price: "16,000",
  },
  {
    name: "Presidential Suite",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85",
    description: "A private residence with room to settle in and stay awhile.",
    area: "82 sq m",
    price: "28,000",
  },
  {
    name: "Deluxe Suite",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    description: "A quiet retreat with generous space and considered detail.",
    area: "45 sq m",
    price: "18,000",
  },
  {
    name: "Heritage Room",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
    description: "Classic character, softened by warm natural materials.",
    area: "38 sq m",
    price: "16,000",
  },
  {
    name: "Presidential Suite",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85",
    description: "A private residence with room to settle in and stay awhile.",
    area: "82 sq m",
    price: "28,000",
  },
];

const amenities = [
  {
    title: "High-Speed Wi-Fi",
    description: "Fast, complimentary connection throughout your stay.",
    icon: Wifi,
  },
  {
    title: "Valet Parking",
    description: "Arrive at the door; we will take care of the rest.",
    icon: CarFront,
  },
  {
    title: "Fine Dining",
    description: "Seasonal menus shaped by the best of the region.",
    icon: UtensilsCrossed,
  },
  {
    title: "Wellness & Spa",
    description: "Restore your pace with considered treatments.",
    icon: Flower2,
  },
  {
    title: "24/7 Concierge",
    description: "Thoughtful local guidance, whenever you need it.",
    icon: Bell,
  },
  {
    title: "In-Room Dining",
    description: "A well-made meal, delivered to your own table.",
    icon: Coffee,
  },
];

const testimonials = [
  {
    quote:
      "Our room was beautifully quiet, and every detail felt considered. We left already planning a return.",
    name: "Maya Bennett",
    stay: "Stayed in the Heritage Room",
  },
  {
    quote:
      "A lovely sense of place, with service that was warm without ever being intrusive.",
    name: "Daniel Foster",
    stay: "Stayed in the Deluxe Suite",
  },
  {
    quote:
      "From the first welcome to the last breakfast, the whole stay felt effortless.",
    name: "Amara Lewis",
    stay: "Stayed for a long weekend",
  },
];

const questions = [
  {
    question: "How can I make a room reservation?",
    answer:
      "Choose your dates in the availability form above to see current room options and complete your reservation.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in begins at 3:00 pm and check-out is by 11:00 am. Please contact our team if you need more flexibility.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation terms vary by rate. Your selected policy and any applicable deadline are shown before you confirm a booking.",
  },
  {
    question: "What amenities are included in each room?",
    answer:
      "Every room includes Wi-Fi, thoughtful bath amenities, climate control, and round-the-clock guest assistance.",
  },
  {
    question: "Are dining options available at the hotel?",
    answer:
      "Our dining room serves seasonal dishes, and a selection of meals is available to enjoy in your room.",
  },
  {
    question: "Can I make a special request before arrival?",
    answer:
      "Certainly. Share your request with our guest team after booking and we will do our best to arrange it.",
  },
];

function getVisibleTestimonialCount() {
  if (typeof window === "undefined") return 3;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 768px)").matches) return 2;
  return 1;
}

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold text-foreground">{eyebrow}</p>
      <h2 className="text-3xl leading-tight font-medium text-primary md:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export default function LandingPage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(1);
  const [visibleTestimonialCount, setVisibleTestimonialCount] = useState(
    getVisibleTestimonialCount
  );
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 768px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const updateVisibleCount = () => {
      setVisibleTestimonialCount(desktop.matches ? 3 : tablet.matches ? 2 : 1);
    };

    tablet.addEventListener("change", updateVisibleCount);
    desktop.addEventListener("change", updateVisibleCount);
    return () => {
      tablet.removeEventListener("change", updateVisibleCount);
      desktop.removeEventListener("change", updateVisibleCount);
    };
  }, []);

  const moveTestimonials = (direction: number) => {
    setTestimonialDirection(direction);
    setTestimonialIndex(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length
    );
  };

  const visibleTestimonials = Array.from(
    { length: visibleTestimonialCount },
    (_, offset) =>
      testimonials[(testimonialIndex + offset) % testimonials.length]
  );

  return (
    <div className="min-w-0 bg-background text-foreground" id="top">
      <div>
        <section className="relative isolate flex min-h-192 flex-col bg-foreground text-background sm:min-h-160 lg:min-h-145 dark:bg-background dark:text-foreground">
          <img
            className="absolute inset-0 -z-20 size-full object-cover object-center"
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2200&q=90"
            alt=""
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-foreground/85 dark:bg-background/85" />
          <div className="container mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 pb-96 sm:px-6 sm:py-10 sm:pb-72 lg:px-8 lg:py-12 lg:pb-40">
            <div className="flex flex-1 flex-col justify-center py-8">
              <p className="mb-4 text-base font-semibold text-background dark:text-foreground">
                A warm welcome at Nivara
              </p>
              <h1 className="max-w-3xl font-heading text-5xl leading-[1.08] font-medium text-primary md:text-6xl">
                A comfortable stay starts here.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-background dark:text-foreground">
                Choose your dates and guest count to plan a stay that works for
                you.
              </p>
              <Button
                className="mt-6 h-11 self-start rounded-md px-5 text-sm font-semibold"
                variant="secondary"
                render={<a href="#rooms" />}
              >
                Explore Rooms
              </Button>
            </div>
          </div>
          <div
            className="absolute bottom-6 left-1/2 z-10 container mx-auto w-full max-w-5xl -translate-x-1/2 px-4"
            id="availability"
          >
            <AvailabilitySearch />
          </div>
        </section>

        <section
          className="container mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-16 lg:gap-16 lg:px-8 lg:py-20"
          id="about"
        >
          <img
            className="aspect-[1.35] w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
            alt="A softly lit hotel lounge with a view of the garden"
            loading="lazy"
          />
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-foreground">ABOUT US</p>
            <h2 className="mt-2 font-heading text-3xl leading-tight font-medium text-primary md:text-4xl">
              Our Story
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Nivara is a small pause in a busy world. For generations, we have
              welcomed guests with the ease of a familiar place and the care of
              a thoughtful host.
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground">
              From the rooms we prepare to the people who remember your name,
              every detail is here to make your time away feel entirely your
              own.
            </p>
            <Button
              variant="outline"
              className="mt-5 h-10 rounded-md px-4 text-sm"
              render={<Link to="/about" />}
            >
              Discover Our Story
            </Button>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16 lg:py-20" id="rooms">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="FEATURED ROOMS">
              Rooms Designed for Your Comfort.
            </SectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {rooms.map((room, index) => (
                <article
                  className="overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm"
                  key={`${room.name}-${index}`}
                >
                  <Link
                    className="block aspect-[1.62] overflow-hidden bg-muted"
                    to={`/rooms?category=${encodeURIComponent(room.name)}`}
                    aria-label={`View ${room.name}`}
                  >
                    <img
                      className="size-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                      src={room.image}
                      alt={`${room.name} interior`}
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-heading text-xl leading-snug font-medium text-primary">
                      {room.name}
                    </h3>
                    <p className="mt-2 min-h-11 text-sm leading-relaxed text-card-foreground">
                      {room.description}
                    </p>
                    <p className="mt-2 text-sm text-card-foreground">
                      1 King Bed · {room.area} · 2 Adults
                    </p>
                    <p className="mt-2 text-sm text-card-foreground">
                      <strong className="text-base">₹{room.price}</strong> /
                      Night + GST
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 rounded-md text-sm"
                        render={
                          <Link
                            to={`/rooms?category=${encodeURIComponent(room.name)}`}
                          />
                        }
                      >
                        View Details
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-9 rounded-md text-sm font-semibold"
                        render={<Link to="/rooms" />}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="container mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20"
          id="amenities"
        >
          <SectionHeading eyebrow="AMENITIES">
            Thoughtful Details. Exceptional Comfort.
          </SectionHeading>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ title, description, icon: Icon }) => (
              <article className="flex items-start gap-4" key={title}>
                <Icon
                  aria-hidden="true"
                  className="size-7 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-base font-semibold text-primary">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16 lg:py-20" id="testimonials">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Our Reviews
                </p>
                <h2 className="mt-2 font-heading text-3xl leading-tight font-medium text-foreground md:text-4xl">
                  What Our Guests Say
                </h2>
              </div>
              <div className="flex gap-2 sm:pb-1">
                <Button
                  aria-label="Show previous guest reviews"
                  className="size-11 rounded-full"
                  onClick={() => moveTestimonials(-1)}
                  size="icon"
                  variant="outline"
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
                <Button
                  aria-label="Show next guest reviews"
                  className="size-11 rounded-full"
                  onClick={() => moveTestimonials(1)}
                  size="icon"
                  variant="outline"
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div
              aria-label="Guest testimonials"
              aria-roledescription="carousel"
              className="overflow-hidden"
              role="region"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                  exit={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    x: prefersReducedMotion ? 0 : testimonialDirection * -20,
                  }}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, x: testimonialDirection * 20 }
                  }
                  key={`${testimonialIndex}-${visibleTestimonialCount}`}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.22,
                    ease: "easeOut",
                  }}
                >
                  {visibleTestimonials.map((testimonial, slot) => (
                    <figure
                      aria-roledescription="slide"
                      className="flex min-h-64 flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:min-h-72 sm:p-7"
                      key={`${testimonial.name}-${slot}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div
                          aria-hidden="true"
                          className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold text-foreground"
                        >
                          {testimonial.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div
                          className="flex gap-1 text-primary"
                          aria-label="5 out of 5 stars"
                          role="img"
                        >
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star
                              className="size-4 fill-current"
                              key={starIndex}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                      <Quote
                        aria-hidden="true"
                        className="mt-6 size-6 text-primary"
                      />
                      <blockquote className="mt-3 flex-1 font-heading text-xl leading-snug text-card-foreground sm:text-2xl">
                        “{testimonial.quote}”
                      </blockquote>
                      <figcaption className="mt-6 border-l border-border pl-3">
                        <p className="text-base font-semibold text-card-foreground">
                          {testimonial.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {testimonial.stay}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section
          className="container mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-16 lg:gap-16 lg:px-8 lg:py-20"
          id="faq"
        >
          <div>
            <p className="text-sm font-semibold text-foreground">FAQ</p>
            <h2 className="mt-2 max-w-sm font-heading text-3xl leading-tight font-medium text-primary md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion className="border-t border-border">
            {questions.map(({ question, answer }, index) => (
              <AccordionItem
                className="border-border"
                key={question}
                value={`question-${index}`}
              >
                <AccordionTrigger className="min-h-12 rounded-none border-0 px-0 py-3 text-base font-medium text-foreground hover:no-underline focus-visible:ring-2 focus-visible:ring-ring">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="bg-muted px-4 py-10 text-center sm:px-6 md:py-14">
          <div className="relative isolate container mx-auto grid min-h-72 w-full max-w-7xl place-items-center overflow-hidden rounded-lg border border-border bg-card px-6 py-12 shadow-sm md:min-h-80 md:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-36 -left-28 size-64 rounded-full border-8 border-primary opacity-90 sm:size-72"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full border-8 border-secondary opacity-90 sm:size-72"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-heading text-4xl leading-tight font-medium text-foreground sm:text-5xl">
                Your Next Stay Begins Here
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground">
                Make room for a little more ease.
              </p>
              <Button
                variant="secondary"
                className="mt-6 h-11 rounded-md px-6 text-sm font-semibold"
                render={<a href="#availability" />}
              >
                Check Availability
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
