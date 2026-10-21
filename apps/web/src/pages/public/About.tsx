import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { HERO_IMAGE } from "@/features/public/public.mock";

export default function AboutPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <section
        aria-labelledby="about-page-heading"
        className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src={HERO_IMAGE}
            alt="A quiet hotel courtyard framed by greenery"
            fetchPriority="high"
            className="size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>

        <div className="mx-auto flex min-h-64 max-w-360 items-center px-5 py-14 sm:min-h-72 sm:px-8 sm:py-16 lg:min-h-80 lg:px-14 xl:px-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl"
          >
            <p className="mb-4 flex items-center gap-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              About Nivara
            </p>
            <h1
              id="about-page-heading"
              className="font-heading text-[38px] leading-[1.1] font-normal tracking-[-0.035em] sm:text-5xl lg:text-[54px]"
            >
              A warm welcome,
              <br className="hidden sm:block" /> a little room to breathe.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base sm:leading-7">
              Thoughtful hospitality and comfortable spaces, shaped around the
              way you like to stay.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="our-approach-heading"
        className="bg-background text-foreground"
      >
        <div className="mx-auto grid max-w-360 gap-9 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-12 lg:gap-20 lg:px-14 lg:py-20 xl:px-20">
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-w-0"
          >
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85"
              alt="A calm, thoughtfully prepared hotel room"
              loading="lazy"
              decoding="async"
              className="aspect-[1.15] w-full object-cover object-center sm:aspect-[1.35] md:aspect-[0.9]"
            />
            <figcaption className="mt-3 flex items-center gap-3 text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              <span className="h-px w-7 bg-gold" aria-hidden="true" />A place to
              settle in
            </figcaption>
          </motion.figure>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-xl"
          >
            <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
              The Nivara feeling
            </p>
            <h2
              id="our-approach-heading"
              className="font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl lg:text-[42px]"
            >
              Comfort in the details.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
              We believe a pleasant stay is built from simple things done with
              care: a comfortable room, a thoughtful welcome and a team ready to
              help when you need it.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
              Whether you are here for a short visit or a few slower days, we
              want you to feel at ease from the moment you arrive.
            </p>

            <Link
              to="/rooms"
              className="group mt-7 inline-flex min-h-11 items-center gap-3 border-b border-gold/60 pb-1 text-[10px] font-medium tracking-[0.14em] text-foreground uppercase transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Find your room
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
