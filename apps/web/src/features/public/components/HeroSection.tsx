import { BadgeCheck, ConciergeBell, ShieldCheck } from "lucide-react";

import { AvailabilitySearch } from "@/components/common/AvailabilitySearch";

import { HERO_IMAGE } from "../public.mock";

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "Instant booking confirmation" },
  { icon: ShieldCheck, label: "Secure online payment" },
  { icon: ConciergeBell, label: "24-hour front desk" },
];

export function HeroSection() {
  return (
    <>
      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-32 pb-44 text-white">
        <img
          src={HERO_IMAGE}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-30 size-full object-cover"
        />
        {/* Overlays are hardcoded: the hero always sits on a photo, in either theme. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-linear-to-r from-black/85 via-black/55 to-black/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-linear-to-t from-black/70 via-transparent to-black/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_100%,rgba(245,158,11,0.22),transparent)]"
        />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
              A century of Awadhi welcome, in rooms made for rest.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Quiet, beautifully kept rooms and a team that treats every guest
              like family. Pick your dates and book in minutes.
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-amber-400" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-32 w-full max-w-6xl px-4 sm:px-6">
        <AvailabilitySearch />
      </div>
    </>
  );
}
