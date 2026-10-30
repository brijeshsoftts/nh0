import { addDays, format, isValid, parseISO, startOfToday } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  ChevronDown,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function validQueryDate(value: string | null, fallback: Date) {
  if (!value) return fallback;

  const date = parseISO(value);
  return isValid(date) && date >= startOfToday() ? date : fallback;
}

function DatePickerField({
  id,
  label,
  date,
  disabled,
  onSelect,
}: {
  id: string;
  label: string;
  date: Date;
  disabled: { before: Date };
  onSelect: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-0">
      <label
        className="mb-2 block text-sm font-semibold text-foreground"
        htmlFor={id}
      >
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type="button"
              variant="outline"
              className="h-12 w-full justify-start gap-2 rounded-md border-input bg-background px-3 text-left text-sm font-normal text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${label}: ${format(date, "dd MMM yyyy")}`}
            />
          }
        >
          <CalendarDays
            className="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          {format(date, "dd MMM yyyy")}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 rounded-md p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              onSelect(selectedDate);
              if (selectedDate) setOpen(false);
            }}
            disabled={disabled}
            classNames={{
              weekday: "text-sm text-foreground",
              outside: "text-foreground",
              disabled: "text-muted-foreground",
            }}
          />
        </PopoverContent>
      </Popover>
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
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="size-3.5" aria-hidden="true" />
        </Button>

        <span
          className="w-4 text-center text-sm tabular-nums"
          aria-live="polite"
        >
          {value}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

type RoomTypeOption = { value: string; label: string };

export function AvailabilitySearch({
  className = "",
  roomTypeOptions,
  submitLabel = "Check availability",
}: {
  className?: string;
  roomTypeOptions?: RoomTypeOption[];
  submitLabel?: string;
}) {
  const id = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = startOfToday();
  const initialCheckIn = validQueryDate(
    searchParams.get("checkInDate") ??
      searchParams.get("checkIn") ??
      searchParams.get("check-in"),
    today
  );
  const initialCheckOut = validQueryDate(
    searchParams.get("checkOutDate") ??
      searchParams.get("checkOut") ??
      searchParams.get("check-out"),
    addDays(initialCheckIn, 1)
  );
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(
    initialCheckOut > initialCheckIn
      ? initialCheckOut
      : addDays(initialCheckIn, 1)
  );
  const [adults, setAdults] = useState(
    Math.min(10, Math.max(1, Number(searchParams.get("adults")) || 2))
  );
  const [children, setChildren] = useState(
    Math.min(10, Math.max(0, Number(searchParams.get("children")) || 0))
  );
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [error, setError] = useState("");
  const [roomType, setRoomType] = useState(
    searchParams.get("roomType") ?? "all"
  );
  const guestSummary = `${adults} adult${adults === 1 ? "" : "s"}, ${children} child${children === 1 ? "" : "ren"}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkIn < today) {
      setError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn || adults < 1 || children < 0) {
      setError("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      checkInDate: format(checkIn, "yyyy-MM-dd"),
      checkOutDate: format(checkOut, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      page: "1",
    });
    if (roomType !== "all") params.set("roomType", roomType);
    navigate(`/rooms?${params.toString()}`);
  };

  const gridColumns = roomTypeOptions
    ? "lg:grid-cols-[1.05fr_1.1fr_1.1fr_1.1fr_1fr]"
    : "lg:grid-cols-[1.1fr_1.1fr_1.1fr_1fr]";

  return (
    <motion.form
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className={`grid grid-cols-1 gap-4 rounded-lg border border-border bg-background p-4 text-foreground shadow-lg sm:grid-cols-2 sm:p-5 ${gridColumns} lg:items-end lg:gap-4 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`} className="sr-only">
        Check room availability
      </h2>

      {roomTypeOptions ? (
        <div className="min-w-0">
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor={`${id}-room-type`}
          >
            Room type
          </label>
          <div className="relative">
            <BedDouble
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary"
            />
            <select
              className="h-12 w-full appearance-none rounded-md border border-input bg-background py-2 pr-9 pl-10 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
              id={`${id}-room-type`}
              onChange={(event) => setRoomType(event.target.value)}
              value={roomType}
            >
              <option value="all">All room types</option>
              {roomType !== "all" &&
              !roomTypeOptions.some((option) => option.value === roomType) ? (
                <option value={roomType}>Selected room type</option>
              ) : null}
              {roomTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>
      ) : null}

      <DatePickerField
        id={`${id}-checkin`}
        label="Check-in"
        date={checkIn}
        disabled={{ before: today }}
        onSelect={(date) => {
          if (!date) return;
          setCheckIn(date);
          setError("");
          if (checkOut <= date) setCheckOut(addDays(date, 1));
        }}
      />
      <DatePickerField
        id={`${id}-checkout`}
        label="Check-out"
        date={checkOut}
        disabled={{ before: addDays(checkIn, 1) }}
        onSelect={(date) => {
          if (!date) return;
          setCheckOut(date);
          setError("");
        }}
      />
      <div className="relative min-w-0">
        <p className="mb-2 text-sm font-semibold text-foreground">Guests</p>
        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full justify-between gap-2 rounded-md border-input bg-background px-3 text-left text-sm font-normal text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                aria-expanded={guestsOpen}
                aria-label={`Guests: ${guestSummary}`}
              />
            }
          >
            <span className="flex min-w-0 items-center gap-2">
              <Users
                className="size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="truncate">{guestSummary}</span>
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform ${guestsOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 rounded-md p-4 sm:w-80">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-heading text-lg font-medium text-popover-foreground">
                Guests
              </p>
              <Button
                type="button"
                variant="ghost"
                className="h-10 rounded-md px-3 text-sm"
                onClick={() => setGuestsOpen(false)}
              >
                Done
              </Button>
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
          </PopoverContent>
        </Popover>
      </div>
      <div className="min-w-0 sm:col-span-2 lg:col-span-1">
        <Button
          type="submit"
          variant="secondary"
          className="h-12 w-full rounded-md px-4 text-sm font-semibold"
        >
          {submitLabel}
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </div>

      {error ? (
        <p
          role="alert"
          className="text-sm text-destructive sm:col-span-2 lg:col-span-4"
        >
          {error}
        </p>
      ) : null}
    </motion.form>
  );
}
