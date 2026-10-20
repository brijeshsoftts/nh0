import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { useNavigate } from "react-router-dom";

function localDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function DateField({
  id,
  label,
  value,
  min,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label
        htmlFor={id}
        className="mb-2 block text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase"
      >
        {label}
      </label>

      <div className="relative flex min-w-0 items-center gap-2">
        <CalendarDays className="size-4 shrink-0 text-gold" strokeWidth={1.5} />

        <input
          id={id}
          type="date"
          required
          min={min}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="block w-full min-w-0 appearance-none bg-transparent text-[13px] font-medium text-foreground scheme-light outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

function GuestCounter({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid size-8 place-items-center border border-border text-foreground transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="size-3.5" />
        </button>

        <span
          className="w-4 text-center text-sm tabular-nums"
          aria-live="polite"
        >
          {value}
        </span>

        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid size-8 place-items-center border border-border text-foreground transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function HeroSection() {
  const id = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const navigate = useNavigate();

  const today = localDateString(new Date());
  const tomorrow = localDateString(addDays(new Date(), 1));

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [error, setError] = useState("");

  const updateCheckIn = (value: string) => {
    setCheckIn(value);
    setError("");

    if (checkOut <= value) {
      setCheckOut(localDateString(addDays(new Date(`${value}T12:00:00`), 1)));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkIn < today) {
      setError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    navigate(
      `/rooms?check-in=${checkIn}&check-out=${checkOut}&adults=${adults}&children=${children}`
    );
  };

  return (
    <section className="relative isolate z-10 overflow-visible bg-primary text-primary-foreground">
      {/* Immersive hero photograph */}
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
            <span className="h-px w-10 bg-gold" />

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
            <span className="size-1.5 rounded-full bg-gold" />
            <span>Considered comfort. Unforgettable stays.</span>
          </div>
        </motion.div>

        {/* Booking form */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.15,
          }}
          className="mt-12 w-full max-w-280 sm:mt-14"
        >
          <form
            onSubmit={handleSubmit}
            className="border border-primary-foreground/20 bg-background p-4 text-foreground shadow-2xl sm:p-6 lg:p-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.95fr_auto] lg:items-end lg:gap-0">
              {/* Check-in */}
              <div className="min-w-0 border-b border-border pb-4 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
                <DateField
                  id={`${id}-checkin`}
                  label="Check-in"
                  value={checkIn}
                  min={today}
                  onChange={updateCheckIn}
                />
              </div>

              {/* Check-out */}
              <div className="min-w-0 border-b border-border pb-4 sm:px-5 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
                <DateField
                  id={`${id}-checkout`}
                  label="Check-out"
                  value={checkOut}
                  min={localDateString(
                    addDays(new Date(`${checkIn}T12:00:00`), 1)
                  )}
                  onChange={(value) => {
                    setCheckOut(value);
                    setError("");
                  }}
                />
              </div>

              {/* Guests dropdown */}
              <div className="relative min-w-0 border-b border-border pb-4 sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:pr-5 lg:pb-0 lg:pl-5">
                <p className="mb-2 text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Guests
                </p>

                <button
                  type="button"
                  aria-expanded={guestsOpen}
                  aria-controls={`${id}-guest-panel`}
                  onClick={() => setGuestsOpen((value) => !value)}
                  className="flex w-full items-center justify-between gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Users
                      className="size-4 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <span className="truncate text-[13px] font-medium">
                      {adults + children} guests
                    </span>
                  </span>

                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${guestsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {guestsOpen ? (
                    <motion.div
                      id={`${id}-guest-panel`}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: reduceMotion ? 0 : 0.18 }}
                      className="absolute inset-x-0 top-full z-30 mt-4 border border-border bg-popover p-4 text-popover-foreground shadow-xl sm:inset-x-auto sm:right-0 sm:w-75 sm:p-5"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-serif text-lg">Guests</p>
                        <button
                          type="button"
                          onClick={() => setGuestsOpen(false)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Close guest selector"
                        >
                          <span className="text-xs">Done</span>
                        </button>
                      </div>

                      <div className="divide-y divide-border">
                        <GuestCounter
                          label="Adults"
                          description="Ages 13 or above"
                          value={adults}
                          min={1}
                          max={10}
                          onChange={setAdults}
                        />

                        <GuestCounter
                          label="Children"
                          description="Ages 0–12"
                          value={children}
                          min={0}
                          max={10}
                          onChange={setChildren}
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Availability button */}
              <div className="sm:col-span-2 lg:col-span-1 lg:pl-5">
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-3 bg-primary px-5 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-13 lg:min-w-47.5"
                >
                  Check availability
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            {error ? (
              <p role="alert" className="mt-4 text-xs text-error">
                {error}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
