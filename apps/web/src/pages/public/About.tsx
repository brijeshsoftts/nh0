// import { ChevronRight } from "lucide-react";

import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  Gem,
  Heart,
  Leaf,
  MapPin,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import HeroImage from "@/assets/cta_image.png";
import { Button } from "@/components/ui/button";
import { HoverText } from "@/features/public/components/hoverText";
import { ImageMotion } from "@/features/public/components/ImageMotion";
import {
  sectionEyebrowClassName,
  sectionHeadingClassName,
} from "@/features/public/components/sectionStyles";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

function HeroSection() {
  return (
    <section className="relative flex h-[60vh] max-h-150 min-h-112.5 w-full items-center overflow-hidden font-sans">
      {/* Background Image */}
      {/* Referencing the exact image file provided */}
      <img
        src={HeroImage}
        alt="Sahara Sands resort pool at sunset"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Gradient Overlay for Text Readability */}
      {/* Uses the semantic foreground token (Deep Warm Brown) to blend naturally with the brand palette */}
      <div className="absolute inset-0 w-[90%] bg-linear-to-r from-background via-background/95 to-background/50 sm:w-[00%] sm:to-transparent" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto flex h-full flex-col items-start justify-center px-6 pt-12 md:px-12">
        <div className="max-w-140">
          <span className="mb-2 block text-xs font-bold tracking-[0.15em] text-white/70 uppercase">
            About Us
          </span>

          <h1 className="mb-6 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]">
            More Than <br /> Just a Stay
          </h1>

          <p className="mb-6 max-w-105 text-base leading-relaxed font-light text-white/80 md:text-lg">
            At Sahara Sands, we believe travel is not just about reaching a
            destination, but about creating memories that last a lifetime.
          </p>

          {/* Breadcrumb Navigation */}
          {/* <Breadcrumb>
            <BreadcrumbList className="text-white/70 sm:gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-[13px] text-white/70 transition-colors hover:text-white md:text-[14px]"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50">
                <ChevronRight className="h-3.5 w-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[13px] font-medium text-white md:text-[14px]">
                  About Us
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="w-full overflow-hidden bg-background py-16 font-sans md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Content */}
          <div className="flex max-w-135 flex-col justify-center">
            {/* Eyebrow */}
            <span className={sectionEyebrowClassName}>Our Story</span>

            {/* Heading */}
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                A Journey Inspired <br />
                by{" "}
                <span className="text-primary italic">
                  Nature & Hospitality
                </span>
              </HoverText>
            </h2>

            {/* Paragraph 1 */}
            <p className="mb-4 text-base leading-relaxed font-light text-foreground/70 md:text-[15px]">
              Sahara Sands was born from a simple idea – to create a place where
              luxury meets the beauty of nature. Nestled along pristine beaches,
              our resort offers a perfect blend of modern comfort, traditional
              warmth and world-class hospitality.
            </p>

            {/* Paragraph 2 */}
            <p className="mb-10 text-base leading-relaxed font-light text-foreground/70 md:text-[15px]">
              From elegant rooms to personalized services, every{" "}
              <strong className="font-medium text-foreground">detail</strong> is
              thoughtfully designed to make your stay unforgettable.
            </p>

            <div>
              <Button
                nativeButton={false}
                render={<Link to="/rooms" />}
                className="h-11 rounded-full px-8 text-sm font-medium shadow-md transition-all"
              >
                Explore Rooms <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Image & Floating Badge */}
          <div className="relative mt-8 h-100 w-full md:h-120 lg:mt-0 lg:h-130">
            {/* Main Image */}
            <ImageMotion
              src={HeroImage}
              alt="Sahara Sands resort exterior at dusk"
              className="h-full w-full rounded-3xl object-cover shadow-sm"
              hoverScale={1.03}
            />

            {/* Floating Badge */}
            <div className="absolute right-4 -bottom-6 z-10 flex max-w-50 items-center gap-4 rounded-2xl border border-border/40 bg-card p-5 text-card-foreground shadow-xl md:-right-6 lg:-right-8">
              <div className="shrink-0">
                <Leaf
                  className="h-7 w-7 -scale-x-100 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-[13px] leading-tight font-medium">
                A Place to <br /> Relax, Reconnect <br /> and Belong
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStatValue({ value }: { value: string }) {
  const valueRef = useRef<HTMLSpanElement>(null);
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

  useEffect(() => {
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

function StatsSection() {
  const stats = [
    {
      icon: BedDouble,
      value: "100+",
      label: "Luxury Rooms",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Guests",
    },
    {
      icon: MapPin,
      value: "10+",
      label: "Popular Destinations",
    },
    {
      icon: Trophy,
      value: "4.8",
      label: "Guest Rating",
      hasStar: true,
    },
  ];

  return (
    <section className="flex w-full justify-center bg-muted px-4 py-12 font-sans md:px-8 md:py-16">
      {/* Stats Card Container */}
      <div className="w-full max-w-275 rounded-2xl border border-border/60 bg-card px-6 py-8 shadow-[0_4px_24px_rgb(0,0,0,0.02)] md:rounded-[24px] md:px-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative flex items-center justify-start gap-5 px-4 lg:justify-center lg:px-6"
              >
                {/* Icon */}
                <div className="shrink-0 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-2xl leading-none font-bold tracking-tight text-foreground md:text-[28px]">
                      <AnimatedStatValue value={stat.value} />
                    </span>
                    {stat.hasStar && (
                      <Star className="mb-0.5 h-5 w-5 fill-primary text-primary" />
                    )}
                  </div>
                  <span className="mt-1.5 text-[13px] font-medium text-foreground/70 md:text-sm">
                    {stat.label}
                  </span>
                </div>

                {/* Vertical Separator for Desktop */}
                {index !== stats.length - 1 && (
                  <div className="absolute top-1/2 right-0 hidden h-12 w-px -translate-y-1/2 bg-border/80 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: Gem,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do.",
    },
    {
      icon: Heart,
      title: "Hospitality",
      description: "Every guest is treated like family with warmth and care.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We respect nature and work towards a greener, cleaner future.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We support local communities and celebrate our culture.",
    },
  ];
  return (
    <section className="w-full border-t border-border/40 py-20 font-sans md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:gap-12">
          {/* Left Column: Header & Intro */}
          <div className="flex shrink-0 flex-col lg:max-w-[320px]">
            {/* Eyebrow */}
            <span className={sectionEyebrowClassName}>Our Values</span>

            {/* Heading */}
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                What <br />
                <span className="text-primary">Drives Us</span>
              </HoverText>
            </h2>

            {/* Paragraph */}
            <p className="mb-8 max-w-100 text-[14px] leading-relaxed font-light text-foreground/70 md:text-[15px]">
              We are committed to delivering exceptional experiences through our
              values and dedication.
            </p>

            {/* Action Button */}
            <div>
              <Link to="/#amenities">
                <Button
                  className="h-11 rounded-full px-8 text-sm font-medium shadow-md transition-all"
                  variant={"secondary"}
                >
                  Our Amenities <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-12 pt-2 sm:grid-cols-2 lg:grid-cols-4 lg:pt-0">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group flex flex-col items-center">
                  {/* Icon Circle */}
                  <div className="mb-6 flex h-22.5 w-22.5 items-center justify-center rounded-full bg-secondary transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-sm">
                    <Icon className="h-8 w-8 stroke-[1.5] text-primary" />
                  </div>

                  {/* Value Title */}
                  <h3 className="mb-3 font-serif text-[22px] font-semibold tracking-tight text-foreground">
                    {value.title}
                  </h3>

                  {/* Value Description */}
                  <p className="max-w-55 text-center text-[13px] leading-relaxed text-foreground/70 md:text-[14px]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="w-full overflow-hidden bg-muted py-16 font-sans md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Image & Floating Badge */}
          <div className="relative h-100 w-full md:h-125 lg:h-135">
            {/* Main Image */}
            <ImageMotion
              src={HeroImage}
              alt="Sahara Sands luxury ocean view room"
              className="h-full w-full rounded-3xl object-cover shadow-sm"
              hoverScale={1.03}
            />

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4 rounded-[16px] border border-border/40 bg-card px-6 py-4 text-card-foreground shadow-lg md:bottom-8 md:left-8">
              <div className="shrink-0">
                <BedDouble className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-[13px] leading-snug font-semibold tracking-wide md:text-sm">
                Designed for Your <br /> Comfort
              </p>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex max-w-140 flex-col justify-center">
            {/* Eyebrow */}
            <span className={sectionEyebrowClassName}>Our Experience</span>

            {/* Heading */}
            <h2 className={sectionHeadingClassName}>
              <HoverText staggerDelay={30} duration={400}>
                Creating Memorable <br />
                Stays <span className="text-primary">Since 2015</span>
              </HoverText>
            </h2>

            {/* Description */}
            <p className="mb-10 text-base leading-relaxed font-light text-foreground/70 md:text-[15px]">
              With years of experience in the hospitality industry, Sahara Sands
              has welcomed thousands of guests from around the world. Our team
              is dedicated to providing personalized service, world-class
              facilities and unforgettable experiences.
            </p>

            {/* Action Button */}
            {/* <div>
              <Button
                className="h-11 rounded-full px-8 text-sm font-medium shadow-md transition-all"
                variant={"outline"}
              >
                Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryStripSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidth = useRef(0);
  const isPaused = useRef(false);
  const position = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const galleryImages = [
    {
      id: 1,
      alt: "Infinity pool at sunset",
      src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      alt: "Luxury room dining experience",
      src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      alt: "Romantic sunset beach dinner",
      src: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      alt: "Resort patio and pool area at dusk",
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
    },
  ];

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || isPaused.current || !trackRef.current) return;

    const width = trackRef.current.scrollWidth / 2;
    if (width <= 0) return;

    if (loopWidth.current !== width) {
      loopWidth.current = width;
      position.set(0);
      return;
    }

    const nextPosition = position.get() - delta * 0.035;
    position.set(nextPosition <= -width ? nextPosition + width : nextPosition);
  });

  return (
    <section className="w-full py-10 md:py-16">
      <div className="mx-auto">
        <div className="overflow-hidden pb-4">
          <motion.div
            ref={trackRef}
            className="flex w-max"
            style={{ x: position }}
          >
            {[0, ...(shouldReduceMotion ? [] : [1])].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6"
              >
                {galleryImages.map((img) => (
                  <motion.div
                    key={img.id}
                    onHoverStart={() => {
                      isPaused.current = true;
                    }}
                    onHoverEnd={() => {
                      isPaused.current = false;
                    }}
                    whileHover={
                      shouldReduceMotion ? { opacity: 0.85 } : { scale: 1.035 }
                    }
                    whileTap={
                      shouldReduceMotion ? { opacity: 0.8 } : { scale: 0.96 }
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative h-35 w-70 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-sm sm:h-40 sm:w-[320px] md:h-45 md:w-95 md:rounded-[20px] lg:h-50 lg:w-105 xl:w-115"
                  >
                    <ImageMotion
                      src={img.src}
                      alt={copy === 0 ? img.alt : ""}
                      className="h-full w-full object-cover"

                      hoverScale={1.03}
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <StatsSection />
      <ValuesSection />
      <ExperienceSection />
      <GalleryStripSection />
    </>
  );
}
