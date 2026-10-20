import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

import { TESTIMONIALS } from "@/features/public/public.mock";
import type { Testimonial } from "@/features/public/public.types";

type FeaturedTestimonial = Testimonial & {
  avatar: string;
};

const featuredTestimonials: FeaturedTestimonial[] = [
  {
    ...TESTIMONIALS[0],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    ...TESTIMONIALS[1],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    ...TESTIMONIALS[2],
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80",
  },
];

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-secondary/35 text-foreground"
    >
      <div className="mx-auto max-w-360 px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 grid gap-5 md:mb-10 md:grid-cols-[1fr_0.8fr] md:items-end lg:mb-12"
        >
          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
              Sample guest stories
            </p>
            <h2
              id="testimonials-heading"
              className="max-w-2xl font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-4xl lg:text-[44px]"
            >
              The moments that make a stay.
            </h2>
            <p className="mt-3 font-heading text-lg leading-snug text-muted-foreground sm:text-xl">
              A warm welcome stays with you.
            </p>
          </div>

          <p className="max-w-lg text-sm leading-6 text-muted-foreground md:justify-self-end md:text-right md:text-[15px] md:leading-7">
            From a smooth late check-in to a room that feels just right, it’s
            the thoughtful details that help guests settle in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex min-w-0 flex-col border border-border/80 bg-background/75 p-5 transition-colors duration-300 hover:border-gold/50 sm:p-6 lg:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <div
                  role="img"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                  className="flex items-center gap-1 text-gold"
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`size-3.5 ${starIndex < testimonial.rating ? "fill-current" : "fill-transparent"}`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-5 flex-1 font-heading text-[16px] leading-7 text-foreground sm:text-[17px]">
                “{testimonial.quote}”
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-border/80 pt-5">
                <img
                  src={testimonial.avatar}
                  alt={`Portrait of fictional sample guest ${testimonial.guestName}`}
                  loading="lazy"
                  decoding="async"
                  className="size-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-foreground">
                    {testimonial.guestName}
                  </h3>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {testimonial.guestLocation} · {testimonial.stay}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
