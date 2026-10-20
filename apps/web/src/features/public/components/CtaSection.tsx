import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { HERO_IMAGE } from "@/features/public/public.mock";

export function CtaSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="stay-cta-heading"
      className="overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="mx-auto grid max-w-360 grid-cols-1 items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:py-16 lg:gap-16 lg:px-14 lg:py-20 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-w-0"
        >
          <p className="mb-4 flex items-center gap-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Your time at Nivara
          </p>

          <h2
            id="stay-cta-heading"
            className="max-w-2xl font-heading text-3xl leading-[1.12] font-normal tracking-[-0.03em] sm:text-4xl lg:text-[48px]"
          >
            Make room for a little more ease.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/75 sm:text-[15px]">
            Find a room that feels right for your stay. We’ll be glad to welcome
            you.
          </p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-flex"
            >
              <Link
                to="/rooms"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-background px-5 text-[10px] font-medium tracking-[0.14em] text-foreground uppercase transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:px-6"
              >
                Explore Our Rooms
                <ArrowRight
                  className="size-4 text-gold transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative min-w-0 overflow-hidden"
        >
          <img
            src={HERO_IMAGE}
            alt="A hotel exterior beside a calm outdoor pool"
            loading="lazy"
            decoding="async"
            className="aspect-[2.1] w-full object-cover object-center sm:aspect-[2.4] md:aspect-[1.2] lg:aspect-[1.35]"
          />
          <div
            className="pointer-events-none absolute inset-0 border border-primary-foreground/15"
            aria-hidden="true"
          />
        </motion.figure>
      </div>
    </section>
  );
}
