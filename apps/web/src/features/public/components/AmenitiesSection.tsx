import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { AMENITIES } from "@/features/public/public.mock";

const featuredAmenities = AMENITIES.slice(0, 6);

export function AmenitiesSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="amenities-heading"
      className="bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-360 gap-10 px-5 py-14 sm:px-8 sm:py-16 md:gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-16 lg:px-14 lg:py-20 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-md"
        >
          <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
            The comforts of Nivara
          </p>
          <h2
            id="amenities-heading"
            className="font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl"
          >
            The little things, taken care of.
          </h2>
          <p className="mt-3 font-heading text-lg leading-snug text-muted-foreground sm:text-xl">
            Comfort comes naturally here.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            Settle in with the thoughtful essentials that make a stay feel easy,
            from a restful room to a warm welcome at any hour.
          </p>
          <Link
            to="/rooms"
            className="group mt-6 inline-flex min-h-10 items-center gap-2 border-b border-gold/60 pb-1 text-[10px] font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Explore our rooms
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-9">
          {featuredAmenities.map(
            ({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex min-w-0 flex-col items-center px-1 text-center"
              >
                <span className="mb-3 grid size-11 place-items-center rounded-full bg-secondary text-gold sm:size-12">
                  <Icon
                    className="size-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-heading text-sm leading-snug font-medium sm:text-base">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-52 text-xs leading-5 text-muted-foreground">
                  {description}
                </p>
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
