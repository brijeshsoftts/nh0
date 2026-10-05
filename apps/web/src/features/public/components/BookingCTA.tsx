import { CalendarCheck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { goldButton } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function BookingCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      {/* Deliberately dark in both themes: it is the closing statement of the page. */}
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-linear-to-br from-neutral-950 via-neutral-900 to-amber-950 px-6 py-16 text-center text-white sm:px-12 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(245,158,11,0.28),transparent)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-amber-400/80 to-transparent"
        />

        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="font-display text-4xl leading-tight font-medium text-balance sm:text-6xl">
            Your room is waiting.
          </h2>
          <p className="text-lg leading-relaxed text-white/75">
            Pick your dates and book in under two minutes. We confirm instantly,
            and the front desk is always a call away.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
            <Link to="/rooms">
              <Button
                size="lg"
                className={cn("w-full rounded-full px-8 sm:w-auto", goldButton)}
              >
                <CalendarCheck className="size-4" />
                Check availability
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white/30 bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white sm:w-auto"
              >
                <MessageCircle className="size-4" />
                Talk to us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
