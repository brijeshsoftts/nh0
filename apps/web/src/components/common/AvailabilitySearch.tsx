import { addDays, format, parseISO, startOfToday } from "date-fns";
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
import { useNavigate, useSearchParams } from "react-router-dom";

function validQueryDate(value: string | null) {
  if (!value) return undefined;

  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? undefined : format(date, "yyyy-MM-dd");
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
          className="grid size-8 place-items-center border border-border text-foreground transition hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="size-3.5" aria-hidden="true" />
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
          className="grid size-8 place-items-center border border-border text-foreground transition hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function AvailabilitySearch() {
  const id = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = startOfToday();
  const todayString = format(today, "yyyy-MM-dd");
  const tomorrowString = format(addDays(today, 1), "yyyy-MM-dd");

  const [checkIn, setCheckIn] = useState(
    validQueryDate(
      searchParams.get("checkIn") ?? searchParams.get("check-in")
    ) ?? todayString
  );
  const [checkOut, setCheckOut] = useState(
    validQueryDate(
      searchParams.get("checkOut") ?? searchParams.get("check-out")
    ) ?? tomorrowString
  );
  const [adults, setAdults] = useState(
    Math.max(1, Number(searchParams.get("adults")) || 2)
  );
  const [children, setChildren] = useState(
    Math.max(0, Number(searchParams.get("children")) || 0)
  );
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [error, setError] = useState("");

  const checkInDate = parseISO(checkIn);
  const minCheckOut = format(addDays(checkInDate, 1), "yyyy-MM-dd");

  const updateCheckIn = (value: string) => {
    setCheckIn(value);
    setError("");

    if (checkOut <= value) {
      setCheckOut(format(addDays(parseISO(value), 1), "yyyy-MM-dd"));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkIn < todayString) {
      setError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      "check-in": checkIn,
      "check-out": checkOut,
      adults: String(adults),
      children: String(children),
      page: "1",
    });
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <motion.form
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="border border-primary-foreground/20 bg-background p-4 text-foreground shadow-2xl sm:p-6 lg:p-7"
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`} className="sr-only">
        Check room availability
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.95fr_auto] lg:items-end lg:gap-0">
        <div className="min-w-0 border-b border-border pb-4 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
          <label
            htmlFor={`${id}-checkin`}
            className="mb-2 block text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase"
          >
            Check-in
          </label>
          <div className="relative flex min-w-0 items-center gap-2">
            <CalendarDays
              className="size-4 shrink-0 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              id={`${id}-checkin`}
              type="date"
              required
              min={todayString}
              value={checkIn}
              onChange={(event) => updateCheckIn(event.target.value)}
              className="block w-full min-w-0 appearance-none bg-transparent text-[13px] font-medium text-foreground scheme-light outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="min-w-0 border-b border-border pb-4 sm:px-5 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
          <label
            htmlFor={`${id}-checkout`}
            className="mb-2 block text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase"
          >
            Check-out
          </label>
          <div className="relative flex min-w-0 items-center gap-2">
            <CalendarDays
              className="size-4 shrink-0 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              id={`${id}-checkout`}
              type="date"
              required
              min={minCheckOut}
              value={checkOut}
              onChange={(event) => {
                setCheckOut(event.target.value);
                setError("");
              }}
              className="block w-full min-w-0 appearance-none bg-transparent text-[13px] font-medium text-foreground scheme-light outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

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
                aria-hidden="true"
              />
              <span className="truncate text-[13px] font-medium">
                {adults + children} guests
              </span>
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform ${guestsOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
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
                    className="inline-flex min-h-10 items-center px-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    aria-label="Close guest selector"
                  >
                    Done
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

        <div className="sm:col-span-2 lg:col-span-1 lg:pl-5">
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-3 bg-primary px-5 text-[11px] font-medium tracking-widest text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-13 lg:min-w-47.5"
          >
            Check availability
            <ArrowRight
              className="size-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-xs text-error">
          {error}
        </p>
      ) : null}
    </motion.form>
  );
}
