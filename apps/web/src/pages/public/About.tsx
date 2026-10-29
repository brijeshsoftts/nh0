import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  AMENITIES,
  HERO_IMAGE,
  MOCK_ROOMS,
  TESTIMONIALS,
} from "@/features/public/public.mock";

const values = [
  {
    title: "Premium hospitality",
    description: "Personal service and an easy welcome, from arrival onwards.",
    icon: ShieldCheck,
  },
  {
    title: "Thoughtful places",
    description: "Rooms and details chosen to make time away feel simple.",
    icon: Leaf,
  },
  {
    title: "Your comfort first",
    description: "Restful spaces with the essentials close at hand.",
    icon: Heart,
  },
  {
    title: "Memorable moments",
    description: "Small details that make a stay feel personal.",
    icon: Sparkles,
  },
];

const storyDetails = AMENITIES.slice(2, 6);
const serviceDetails = AMENITIES.slice(0, 3);
const guestStory = TESTIMONIALS[0];

export default function AboutPage() {
  return (
    <div className="min-w-0 bg-background text-foreground">
      <div>
        <section
          aria-labelledby="about-hero-title"
          className="relative isolate flex min-h-112 items-center bg-foreground text-background sm:min-h-128 dark:bg-background dark:text-foreground"
        >
          <img
            alt=""
            className="absolute inset-0 -z-20 size-full object-cover object-center"
            fetchPriority="high"
            src={HERO_IMAGE}
          />
          <div className="absolute inset-0 -z-10 bg-foreground/70 dark:bg-background/70" />
          <div className="container mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold tracking-widest text-background uppercase dark:text-foreground">
                About Nivara
              </p>
              <h1
                className="font-heading text-5xl leading-[1.05] font-medium text-background sm:text-6xl dark:text-foreground"
                id="about-hero-title"
              >
                Our Story
                <br />
                Our Promise
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background sm:text-lg dark:text-foreground">
                A comfortable room, a warm welcome, and the space to enjoy your
                time away.
              </p>
              <Button
                className="mt-7 h-11 rounded-md px-5 text-sm font-semibold"
                nativeButton={false}
                render={<a href="#our-story" />}
                variant="secondary"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="home-away-title"
          className="container mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-20"
        >
          <div>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              About Nivara
            </p>
            <h2
              className="mt-3 max-w-md font-heading text-4xl leading-tight font-medium text-foreground md:text-5xl"
              id="home-away-title"
            >
              A Home Away From Home
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              We believe a good stay is more than a place to sleep. It is a
              comfortable room, thoughtful service, and the freedom to settle
              into your own pace.
            </p>
            <Button
              className="mt-5 h-10 rounded-md px-4 text-sm"
              nativeButton={false}
              render={<Link to="/rooms" />}
              variant="outline"
            >
              Explore Rooms
            </Button>
          </div>

          <img
            alt={MOCK_ROOMS[0].image.altText}
            className="aspect-[1.25] w-full rounded-md object-cover"
            loading="lazy"
            src={MOCK_ROOMS[0].image.url}
          />

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {AMENITIES.slice(0, 3).map(({ title, description, icon: Icon }) => (
              <article className="flex items-start gap-4" key={title}>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
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

        <section
          aria-labelledby="our-story-title"
          className="bg-foreground text-background dark:bg-background dark:text-foreground"
          id="our-story"
        >
          <div className="container mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1fr_1fr_1.1fr] lg:items-center lg:gap-10 lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-semibold tracking-widest text-background uppercase dark:text-foreground">
                Our story
              </p>
              <h2
                className="mt-3 font-heading text-3xl leading-tight font-medium text-background md:text-4xl dark:text-foreground"
                id="our-story-title"
              >
                Creating Unforgettable Experiences
              </h2>
              <p className="mt-4 text-base leading-relaxed text-background dark:text-foreground">
                Nivara began with a simple idea: travel feels better when you
                can rest well, find help easily, and feel welcome in a new
                place.
              </p>
              <p className="mt-3 text-base leading-relaxed text-background dark:text-foreground">
                That idea still guides the way we prepare our rooms and care for
                guests throughout their stay.
              </p>
              <Button
                className="mt-5 h-10 rounded-md px-4 text-sm font-semibold"
                nativeButton={false}
                render={<Link to="/rooms" />}
                variant="secondary"
              >
                Explore Our Rooms
              </Button>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-md border border-background/20 dark:border-foreground/20">
              {storyDetails.map(({ title, icon: Icon }) => (
                <div
                  className="flex min-h-32 flex-col items-center justify-center border-r border-b border-background/20 p-4 text-center last:border-r-0 odd:border-r dark:border-foreground/20"
                  key={title}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-7 text-secondary"
                    strokeWidth={1.75}
                  />
                  <p className="mt-3 text-sm font-medium text-background dark:text-foreground">
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <img
              alt={MOCK_ROOMS[2].image.altText}
              className="aspect-[1.25] h-full min-h-64 w-full rounded-md object-cover"
              loading="lazy"
              src={MOCK_ROOMS[2].image.url}
            />
          </div>
        </section>

        <section aria-labelledby="values-title" className="bg-muted">
          <div className="container mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-10 lg:px-8 lg:py-20">
            <div>
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                Our values
              </p>
              <h2
                className="mt-3 font-heading text-3xl leading-tight font-medium text-foreground md:text-4xl"
                id="values-title"
              >
                What Makes Nivara Special
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">
                The little things matter: a thoughtful welcome, a restful room,
                and help whenever you need it.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {values.map(({ title, description, icon: Icon }) => (
                  <article
                    className="rounded-md border border-border bg-card p-4 text-card-foreground"
                    key={title}
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-card-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-card-foreground">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <img
              alt={MOCK_ROOMS[1].image.altText}
              className="aspect-[1.1] w-full rounded-md object-cover lg:aspect-[0.9]"
              loading="lazy"
              src={MOCK_ROOMS[1].image.url}
            />
          </div>
        </section>

        <section
          aria-labelledby="service-title"
          className="container mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8 lg:py-20"
        >
          <div>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
              The Nivara way
            </p>
            <h2
              className="mt-3 max-w-xl font-heading text-3xl leading-tight font-medium text-foreground md:text-4xl"
              id="service-title"
            >
              The People Behind a Good Stay
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">
              From a smooth arrival to a comfortable room, our guest services
              are shaped around what makes a stay easier.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {serviceDetails.map(({ title, description, icon: Icon }) => (
                <article
                  className="rounded-md border border-border bg-card p-4 text-card-foreground"
                  key={title}
                >
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold text-card-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-card-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <figure className="flex flex-col justify-center rounded-md border border-border bg-muted p-6 sm:p-8">
            <span
              className="font-heading text-5xl leading-none text-primary"
              aria-hidden="true"
            >
              “
            </span>
            <blockquote className="font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
              {guestStory.quote}
            </blockquote>
            <figcaption className="mt-5 border-l border-primary pl-4">
              <p className="text-base font-semibold text-foreground">
                {guestStory.guestName}
              </p>
              <p className="mt-1 text-sm text-foreground">
                {guestStory.stay} · {guestStory.guestLocation}
              </p>
            </figcaption>
          </figure>
        </section>

        <section className="relative isolate flex min-h-72 items-center bg-foreground text-background md:min-h-80 dark:bg-background dark:text-foreground">
          <img
            alt=""
            className="absolute inset-0 -z-20 size-full object-cover object-center"
            loading="lazy"
            src={HERO_IMAGE}
          />
          <div className="absolute inset-0 -z-10 bg-foreground/75 dark:bg-background/75" />
          <div className="container mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-widest text-background uppercase dark:text-foreground">
                Discover Nivara
              </p>
              <h2 className="mt-2 font-heading text-3xl leading-tight font-medium text-background sm:text-4xl dark:text-foreground">
                Ready to plan your stay?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-background dark:text-foreground">
                Find a room that feels right for your time away.
              </p>
            </div>
            <Button
              className="h-11 shrink-0 rounded-md px-5 text-sm font-semibold"
              nativeButton={false}
              render={<Link to="/rooms" />}
              variant="secondary"
            >
              Explore Our Rooms
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
