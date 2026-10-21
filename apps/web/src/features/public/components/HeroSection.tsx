import { motion, useReducedMotion } from "framer-motion";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative isolate z-10 overflow-visible bg-primary text-primary-foreground">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2400&q=90"
          alt=""
          fetchPriority="high"
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-foreground/85 via-foreground/50 to-foreground/15" />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/65 via-transparent to-foreground/20" />
      </div>

      <div className="mx-auto flex min-h-162.5 max-w-[1600px] flex-col justify-center px-5 pt-24 pb-16 sm:min-h-175 sm:px-8 sm:pb-20 lg:min-h-185 lg:px-14 lg:pb-28 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-[0.28em] text-gold uppercase sm:text-xs">
              Welcome to Nivara
            </span>
          </div>

          <h1 className="max-w-3xl font-serif text-[48px] leading-[1.04] font-normal tracking-[-0.035em] text-primary-foreground sm:text-6xl lg:text-[76px] xl:text-[88px]">
            A stay beyond
            <br />
            <span className="text-gold italic">the ordinary.</span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/75 sm:text-base sm:leading-8">
            Discover thoughtfully designed spaces, quiet luxury and exceptional
            comfort. Your next memorable stay begins here.
          </p>

          <div className="mt-7 flex items-center gap-3 text-[10px] tracking-[0.16em] text-primary-foreground/75 uppercase">
            <span
              className="size-1.5 rounded-full bg-gold"
              aria-hidden="true"
            />
            <span>Considered comfort. Unforgettable stays.</span>
          </div>
        </motion.div>

        <div className="mt-12 w-full max-w-280 sm:mt-14">
          <AvailabilitySearch />
        </div>
      </div>
    </section>
  );
}
