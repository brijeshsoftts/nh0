import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BedDouble, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const comforts = [
  {
    title: "Comfortable stays",
    description: "Thoughtfully prepared rooms for a restful night.",
    icon: BedDouble,
  },
  {
    title: "Thoughtful hospitality",
    description: "A welcoming team, ready to make things easier.",
    icon: HeartHandshake,
  },
  {
    title: "Room to unwind",
    description: "Peaceful spaces that make it easy to slow down.",
    icon: Sparkles,
  },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="about-heading"
      className="overflow-hidden bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-360 grid-cols-1 items-center gap-9 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-[1fr_1.05fr_0.82fr] lg:gap-12 lg:px-14 lg:py-20 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-w-0 md:pr-2 lg:pr-0"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <p className="text-[10px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
              About Nivara
            </p>
          </div>

          <h2
            id="about-heading"
            className="max-w-md font-heading text-[38px] leading-[1.12] font-normal tracking-[-0.035em] sm:text-[44px] lg:text-[48px]"
          >
            A home away
            <br className="hidden sm:block" /> from home.
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-7">
            At Nivara, a good stay is made of the little things—comfortable
            rooms, thoughtful service and a calm space to return to. We’re here
            to make every visit feel easy, warm and truly yours.
          </p>

          <Link
            to="/rooms"
            className="group mt-7 inline-flex min-h-11 items-center gap-3 bg-primary px-5 text-[10px] font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Explore our rooms
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative min-w-0 md:col-start-2 md:row-start-1"
        >
          <div className="absolute -bottom-2 -left-2 -z-10 h-[42%] w-[42%] border-b border-l border-gold/60 sm:-bottom-3 sm:-left-3" />
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85"
            alt="A welcoming hotel beside a calm outdoor pool"
            loading="lazy"
            decoding="async"
            className="aspect-[1.18] w-full object-cover object-center sm:aspect-[1.3] md:aspect-[0.92] lg:aspect-[1.08]"
          />
          <figcaption className="mt-3 flex items-center justify-between gap-4 text-[9px] font-medium tracking-[0.17em] text-muted-foreground uppercase">
            <span>A quieter kind of welcome</span>
            <span className="h-px w-9 shrink-0 bg-border" aria-hidden="true" />
          </figcaption>
        </motion.figure>

        <div className="grid min-w-0 gap-5 border-t border-border pt-6 md:col-span-2 md:grid-cols-3 md:gap-6 lg:col-span-1 lg:grid-cols-1 lg:gap-6 lg:border-t-0 lg:pt-0">
          {comforts.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex min-w-0 items-start gap-3.5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-gold sm:size-11">
                <Icon
                  className="size-4.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="font-heading text-[16px] leading-snug font-medium sm:text-[17px]">
                  {title}
                </h3>
                <p className="mt-1 max-w-76 text-xs leading-5 text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
