import { cn } from "cn";
import { format, startOfToday } from "date-fns";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  BrushCleaning,
  Calendar as CalendarIcon,
  Dumbbell,
  Flower2,
  Leaf,
  MapPin,
  Minus,
  Plane,
  Plus,
  ShieldCheck,
  Star,
  User,
  UserRound,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import CTAImage from "@/assets/cta_image.png";
import HeorImage from "@/assets/landing_hero.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { HoverText } from "@/features/public/components/hoverText";
import { ImageMotion } from "@/features/public/components/ImageMotion";
import { RoomCard } from "@/features/public/components/RoomCard";
import { rooms, testimonials } from "@/features/public/public.mock";

const sectionPaddingClassName = "py-16 md:py-24 lg:py-28";
export const sectionEyebrowClassName =
  "mb-4 block text-[10px] font-bold tracking-[0.2em] text-primary uppercase md:text-xs";
export const sectionHeadingClassName =
  "mb-6 font-heading text-3xl leading-[1.1] tracking-tight text-foreground md:text-4xl";

const heroImages = [
  HeorImage,
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=85",
];

function AnimatedHeroStat({ value }: { value: string }) {
  const valueRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(valueRef, { once: true, amount: 0.8 });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const numericValue = Number.parseFloat(value);
  const suffix = value.replace(/[\d.]/g, "");
  const decimalPlaces = value.includes(".") ? value.split(".")[1].length : 0;
  const displayValue = useTransform(
    count,
    (currentValue) => `${currentValue.toFixed(decimalPlaces)}${suffix}`
  );

  React.useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      count.set(numericValue);
      return;
    }

    const controls = animate(count, numericValue, {
      duration: 2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, isInView, numericValue, shouldReduceMotion]);

  return (
    <motion.span ref={valueRef} aria-label={value}>
      {displayValue}
    </motion.span>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [activeHeroImage, setActiveHeroImage] = React.useState(0);
  const [isHeroHovered, setIsHeroHovered] = React.useState(false);
  const today = startOfToday();
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [bookingError, setBookingError] = React.useState("");

  React.useEffect(() => {
    heroImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  React.useEffect(() => {
    if (shouldReduceMotion || isHeroHovered) return;

    const timerId = window.setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * (heroImages.length - 1));
      setActiveHeroImage(
        randomIndex >= activeHeroImage ? randomIndex + 1 : randomIndex
      );
    }, 5000);

    return () => window.clearTimeout(timerId);
  }, [activeHeroImage, isHeroHovered, shouldReduceMotion]);

  const handleSearchRooms = () => {
    if (!checkInDate || !checkOutDate) {
      setBookingError("Select both check-in and check-out dates.");
      return;
    }

    if (checkInDate < today || checkOutDate <= checkInDate) {
      setBookingError("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      checkInDate: format(checkInDate, "yyyy-MM-dd"),
      checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      page: "1",
    });
    navigate(`/rooms?${params.toString()}#availability`);
  };

  return (
    <section
      className="relative w-full bg-background pt-10 font-sans"
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
    >
      {/* Background Image & Blend Layer */}
      <div className="absolute top-0 right-0 z-0 h-150 w-full overflow-hidden md:h-175 md:w-full lg:h-[min(85vh,900px)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeHeroImage}
            src={heroImages[activeHeroImage]}
            alt=""
            aria-hidden="true"
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.04,
            }}
            animate={{
              opacity: 1,
              scale: shouldReduceMotion
                ? 1
                : activeHeroImage % 2 === 0
                  ? 1.1
                  : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: shouldReduceMotion ? 0 : 1.2 },
              scale: {
                duration: shouldReduceMotion ? 0 : 5.5,
                ease: "linear",
              },
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-black/10" />
      </div>

      {/* Left Content Area */}
      <div className="relative z-10 container mx-auto flex min-h-150 flex-col justify-center px-6 pb-10 md:px-12 lg:min-h-[min(85vh,900px)]">
        <div className="max-w-135">
          <span className="mb-2 block text-xs font-bold tracking-[0.15em] text-white/70 uppercase">
            A Luxury Stay Experience
          </span>

          <h1 className="mb-6 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]">
            <HoverText text="Your Escape to" staggerDelay={30} duration={400} />{" "}
            <HoverText text="Tranquility" staggerDelay={30} duration={400} />
          </h1>

          <p className="mb-6 max-w-105 text-base leading-relaxed font-light text-white/80 md:text-lg">
            Experience comfort, elegance and warm hospitality in the heart of
            breathtaking destinations.
          </p>

          <Button
            nativeButton={false}
            render={<Link to="/rooms" />}
            className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90"
          >
            Explore Rooms <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Stats Row */}
          <div className="mt-8 flex items-center gap-8 text-white">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold">
                <AnimatedHeroStat value="100+" />
              </span>
              <span className="mt-1 text-xs text-white/70">Luxury Rooms</span>
            </div>

            <Separator orientation="vertical" className="h-10 bg-border" />

            <div className="flex flex-col">
              <span className="flex items-center font-serif text-2xl font-semibold">
                <AnimatedHeroStat value="4.8" />{" "}
                <Star className="mb-1 ml-1 h-4 w-4 fill-primary text-primary" />
              </span>
              <span className="mt-1 text-xs text-white/70">Guest Rating</span>
            </div>

            <Separator orientation="vertical" className="h-10 bg-border" />

            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold">
                <AnimatedHeroStat value="10+" />
              </span>
              <span className="mt-1 text-xs text-white/70">Destinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Bar */}
      <div className="relative z-30 container mx-auto flex flex-col items-center px-4 pb-8 md:absolute md:-bottom-8 md:px-8">
        <div className="grid w-full max-w-200 grid-cols-1 items-center gap-2 rounded-3xl border border-border bg-card p-2 text-card-foreground shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:grid-cols-2 lg:flex lg:justify-between lg:gap-0 lg:rounded-[2.5rem] lg:p-3">
          {/* Check In */}
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-auto lg:px-6 lg:py-2"
                />
              }
            >
              <CalendarIcon className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-wider text-foreground/60 uppercase">
                  Check In
                </span>
                <span className="text-sm font-medium whitespace-nowrap text-foreground">
                  {checkInDate
                    ? format(checkInDate, "MMM dd, yyyy")
                    : "Select Date"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto rounded-2xl border-border p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={checkInDate}
                disabled={(date) => date < today}
                onSelect={(date) => {
                  setCheckInDate(date);
                  if (date && checkOutDate && checkOutDate <= date) {
                    setCheckOutDate(undefined);
                  }
                  setBookingError("");
                }}
              />
            </PopoverContent>
          </Popover>

          <Separator
            orientation="vertical"
            className="hidden h-14 bg-border lg:block"
          />

          {/* Check Out */}
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-auto lg:px-6 lg:py-2"
                />
              }
            >
              <CalendarIcon className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-wider text-foreground/60 uppercase">
                  Check Out
                </span>
                <span className="text-sm font-medium whitespace-nowrap text-foreground">
                  {checkOutDate
                    ? format(checkOutDate, "MMM dd, yyyy")
                    : "Select Date"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto rounded-2xl border-border p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={checkOutDate}
                disabled={(date) => date <= (checkInDate ?? today)}
                onSelect={(date) => {
                  setCheckOutDate(date);
                  setBookingError("");
                }}
              />
            </PopoverContent>
          </Popover>

          <Separator
            orientation="vertical"
            className="hidden h-14 bg-border lg:block"
          />

          {/* Guests */}
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-auto lg:px-6 lg:py-2"
                />
              }
            >
              <User className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-wider text-foreground/60 uppercase">
                  Guests
                </span>
                <span className="text-sm font-medium whitespace-nowrap text-foreground">
                  {adults} {adults === 1 ? "Adult" : "Adults"}, {children}{" "}
                  {children === 1 ? "Child" : "Children"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-72 rounded-2xl border-border p-4"
              align="start"
            >
              <div className="space-y-4">
                {[
                  {
                    label: "Adults",
                    count: adults,
                    setCount: setAdults,
                    min: 1,
                  },
                  {
                    label: "Children",
                    count: children,
                    setCount: setChildren,
                    min: 0,
                  },
                ].map(({ label, count, setCount, min }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {label}
                    </span>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        aria-label={`Decrease ${label.toLowerCase()}`}
                        disabled={count <= min}
                        onClick={() => setCount((current) => current - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-5 text-center text-sm tabular-nums">
                        {count}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        aria-label={`Increase ${label.toLowerCase()}`}
                        disabled={count >= 10}
                        onClick={() => setCount((current) => current + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Separator
            orientation="vertical"
            className="hidden h-14 bg-border lg:block"
          />

          {/* Search Button */}
          <div className="w-full shrink-0 px-2 pb-2 sm:col-span-2 lg:w-auto lg:pb-0">
            <Button
              type="button"
              onClick={handleSearchRooms}
              className="h-12 w-full rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:h-14 lg:w-auto"
            >
              Search Rooms <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {bookingError && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {bookingError}
          </p>
        )}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      className={cn("w-full bg-background font-sans", sectionPaddingClassName)}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Image & Floating Badge */}
          <div className="relative h-full min-h-100 w-full lg:min-h-125">
            {/* Main Resort Image */}
            <ImageMotion
              src="https://manasresort.in/_next/image?url=%2Fimages%2Frooms%2Frooms-view.jpg&w=1920&q=75"
              alt="Our resort pool"
              className="h-full w-full rounded-3xl object-cover shadow-sm lg:rounded-[2.5rem]"
              hoverScale={1.03}
            />
            <img />

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-card px-6 py-4 text-card-foreground shadow-lg md:bottom-8 md:left-8">
              <Leaf className="h-6 w-6 -scale-x-100 text-primary" />
              <p className="text-sm leading-tight font-medium">
                A Place to <br /> Relax & Reconnect
              </p>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <span className={sectionEyebrowClassName}>About Our Resort</span>

            {/* Heading */}
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                Where Comfort <br />
                Meets <span className="pr-2 text-primary italic">Elegance</span>
              </HoverText>
            </h2>

            {/* Paragraph */}
            <p className="mb-12 max-w-135 text-base leading-relaxed font-light text-foreground/70 md:text-lg">
              Our resort is more than just a place to stay. It's a perfect blend
              of modern luxury, natural beauty and heartfelt hospitality.
              Whether you're here for a vacation, business or a special
              celebration, we make every moment memorable.
            </p>

            {/* Features Row */}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              {/* Feature 1 */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
                  <Bed className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-foreground">
                    Premium Rooms
                  </span>
                  <span className="mt-0.5 text-2xs text-foreground/60">
                    Modern & Comfortable
                  </span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-foreground">
                    Exceptional Service
                  </span>
                  <span className="mt-0.5 text-2xs text-foreground/60">
                    Always at Your Care
                  </span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-foreground">
                    Scenic Locations
                  </span>
                  <span className="mt-0.5 text-2xs text-foreground/60">
                    Near Top Attractions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedRoomsSection() {
  return (
    <section
      className={cn("w-full bg-muted font-sans", sectionPaddingClassName)}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <span className={sectionEyebrowClassName}>Featured Rooms</span>

            {/* Heading */}
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                Handpicked Rooms for a{" "}
                <span className="pr-2 text-primary italic">Perfect Stay</span>
              </HoverText>
            </h2>
          </div>
          <Button
            nativeButton={false}
            render={<Link to="/rooms" />}
            className="h-11"
            variant="link"
          >
            View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const amenities = [
    { name: "Swimming Pool", icon: Waves },
    { name: "Fine Dining", icon: Utensils },
    { name: "Spa & Wellness", icon: Flower2 },
    { name: "Fitness Center", icon: Dumbbell },
    { name: "Free Wi-Fi", icon: Wifi },
    { name: "24/7 Reception", icon: UserRound },
    { name: "Airport Transfer", icon: Plane },
    { name: "Housekeeping", icon: BrushCleaning },
  ];
  return (
    <section
      className={cn(
        "w-full border-t border-border/40 bg-background font-sans",
        sectionPaddingClassName
      )}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Content Row */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Left: Eyebrow & Heading */}
          <div className="max-w-2xl">
            <span className={sectionEyebrowClassName}>Our Amenities</span>
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                Everything You Need for a{" "}
                <span className="text-primary italic">Relaxing Stay</span>
              </HoverText>
            </h2>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Icon Circle */}
                <div className="mb-5 flex h-22 w-22 items-center justify-center rounded-full bg-secondary transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-sm">
                  <Icon className="h-8 w-8 stroke-[1.5] text-foreground" />
                </div>

                {/* Label */}
                <span className="text-center text-[13px] font-semibold tracking-wide text-foreground">
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<-1 | 1>(1);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion || testimonials.length < 2) return;

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const visibleTestimonials = Array.from(
    { length: Math.min(3, testimonials.length) },
    (_, offset) => testimonials[(activeIndex + offset) % testimonials.length]
  );

  const navigateTestimonials = (nextDirection: -1 | 1) => {
    setDirection(nextDirection);
    setActiveIndex(
      (current) =>
        (current + nextDirection + testimonials.length) % testimonials.length
    );
  };

  interface TestimonialData {
    id: string;
    name: string;
    location: string;
    content: string;
    rating: number;
    avatarUrl: string;
  }

  interface TestimonialCardProps {
    testimonial: TestimonialData;
    className?: string;
  }

  function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
    return (
      // Wrapper to handle the absolute positioned corner accent
      <motion.div
        className={cn(
          "relative w-full max-w-105 pt-1.5 pl-1.5 font-sans",
          className
        )}
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        {/* Decorative top-left corner arc */}
        <div className="absolute top-0 left-0 z-0 h-10 w-10 rounded-tl-[28px] border-t-2 border-l-2 border-primary/70" />

        {/* Main Card */}
        <Card className="relative z-10 rounded-[24px] border-border/40 bg-card p-7 shadow-[0_4px_24px_rgb(0,0,0,0.04)] md:p-8">
          {/* Header: Quotes & Stars inline */}
          <div className="mb-5 flex items-center gap-4">
            {/* Custom Quote Icon matching the chunky, filled style */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-secondary"
            >
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
            </svg>

            {/* Dynamic Star Rating */}
            <div className="mt-1 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < testimonial.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <p className="mb-8 line-clamp-4 text-[15px] leading-relaxed text-foreground/80">
            {testimonial.content}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-border/60">
              <AvatarImage
                src={testimonial.avatarUrl}
                alt={testimonial.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-sm font-medium text-secondary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <span className="text-[15px] leading-tight font-semibold text-foreground">
                {testimonial.name}
              </span>
              <span className="mt-0.5 text-[13px] text-foreground/60">
                {testimonial.location}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <section
      className={cn(
        "w-full border-t border-border/40 bg-muted font-sans",
        sectionPaddingClassName
      )}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Top Content Row */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Left: Eyebrow & Heading */}
          <div className="max-w-2xl">
            <span className={sectionEyebrowClassName}>Guest Testimonials</span>
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                What our <span className="text-primary italic">Guest Say</span>
              </HoverText>
            </h2>
            <span className="text-muted-foreground">
              Real experiences from our happy guests.
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous testimonials"
              onClick={() => navigateTestimonials(-1)}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next testimonials"
              onClick={() => navigateTestimonials(1)}
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        <div
          role="region"
          aria-label="Guest testimonials"
          aria-roledescription="carousel"
          aria-live="polite"
          className="mt-8"
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : direction * 24,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : direction * -24,
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : { type: "spring", duration: 0.35, bounce: 0 }
              }
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  className={cn(
                    index > 0 && "hidden sm:block",
                    index > 1 && "hidden lg:block"
                  )}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqData = [
    {
      question: "What time is check-in and check-out?",
      answer:
        "Check-in begins at 3:00 PM, and check-out is at 11:00 AM. Early check-in and late check-out can be requested and are subject to availability.",
    },
    {
      question: "Do you offer airport pickup?",
      answer:
        "Yes, we provide luxury airport transfer services. Please contact our concierge desk at least 24 hours prior to your arrival to arrange your pickup.",
    },
    {
      question: "Is breakfast included in the room rate?",
      answer:
        "Breakfast inclusions depend on the room package selected during booking. Our Premium and Suite packages typically include a complimentary continental breakfast.",
    },
    {
      question: "Are pets allowed?",
      answer:
        "While we love animals, to ensure a tranquil and allergen-free environment for all our guests, pets are not permitted on the property.",
    },
  ];
  return (
    <section
      className={cn(
        "w-full border-t border-border/40 bg-background font-sans",
        sectionPaddingClassName
      )}
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-8 lg:px-12">
        {/* Header Section */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Left: Eyebrow & Heading */}
          <div className="max-w-2xl">
            <span className={sectionEyebrowClassName}>FAQ</span>
            <h2 className={sectionHeadingClassName}>
              <HoverText
                text="Frequently Asked Questions"
                staggerDelay={30}
                duration={400}
              />
            </h2>
          </div>
        </div>

        {/* Accordion List */}
        <Accordion className="mt-8 w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border-none bg-card px-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] md:px-8"
            >
              <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-foreground hover:no-underline md:py-6 md:text-base [&[data-state=open]>svg]:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pr-6 pb-6 text-[14px] leading-relaxed text-foreground/70 md:pr-12 md:text-[15px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <>
      {/* CTA Card Container */}
      <div className="relative flex min-h-105 w-full items-center overflow-hidden shadow-sm">
        {/* Background Image */}
        <img
          src={CTAImage}
          alt="Luxury resort sunset view from balcony"
          className="absolute inset-0 h-full w-full object-cover object-center"
          // Fallback Unsplash image if the local file isn't linked yet:
          // src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
        />

        <div className="absolute inset-0 w-full bg-linear-to-r from-[#7a5b3e] via-[#7a5b3e]/80 to-transparent md:w-[75%]" />

        {/* Content Area */}
        <div className="container mx-auto">
          <div className="relative z-10 flex max-w-150 flex-col items-start px-8 py-12 text-white md:px-16">
            {/* Heading */}
            <h2
              className={cn(
                sectionHeadingClassName,
                "text-white drop-shadow-sm"
              )}
            >
              <HoverText staggerDelay={30} duration={400}>
                Ready for a <br />
                Memorable Stay?
              </HoverText>
            </h2>

            {/* Description */}
            <p className="mb-10 max-w-95 font-sans text-[15px] leading-[1.6] font-light text-white/90 md:text-base">
              Book now and enjoy special rates,{" "}
              <br className="hidden sm:block" />
              exclusive offers and a luxury experience{" "}
              <br className="hidden sm:block" />
              like never before.
            </p>

            {/* Action Button */}
            <Button
              nativeButton={false}
              render={<Link to="/rooms" />}
              className="group h-11 rounded-full px-7 text-[14px] font-semibold shadow-md transition-all"
              variant="secondary"
            >
              Book Your Stay
              <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Landing() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedRoomsSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
