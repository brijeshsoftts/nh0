import {
  addDays,
  differenceInCalendarDays,
  format,
  startOfToday,
} from "date-fns";
import {
  Baby,
  CalendarDays,
  type LucideIcon,
  Minus,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { type FormEvent,useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { goldButton, goldHairline, goldIcon } from "@/lib/ui";
import { cn } from "@/lib/utils";

const MAX_ADULTS = 8;
const MAX_CHILDREN = 6;

/* ----------------------------- Date field ----------------------------- */

type DateFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
  isDisabled: (date: Date) => boolean;
};

function DateField({
  id,
  label,
  placeholder,
  value,
  onChange,
  isDisabled,
}: DateFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            id={id}
            type="button"
            variant="outline"
            className={cn(
              "h-12 w-full justify-start gap-3 rounded-xl px-3 font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarDays className={cn("size-4 shrink-0", goldIcon)} />
            <span className="truncate">
              {value ? format(value, "EEE, d MMM yyyy") : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            disabled={isDisabled}
            onSelect={(date) => {
              if (!date) return;
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* ---------------------------- Guest stepper ---------------------------- */

type GuestStepperProps = {
  label: string;
  hint: string;
  icon: LucideIcon;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function GuestStepper({
  label,
  hint,
  icon: Icon,
  value,
  min,
  max,
  onChange,
}: GuestStepperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex h-12 items-center justify-between gap-2 rounded-xl border bg-background pr-1.5 pl-3 shadow-xs">
        <span className="flex min-w-0 items-center gap-2 text-sm">
          <Icon className={cn("size-4 shrink-0", goldIcon)} />
          <span className="font-medium tabular-nums" aria-live="polite">
            {value}
          </span>
          <span className="truncate text-muted-foreground">{hint}</span>
        </span>
        <span className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            aria-label={`Decrease ${label.toLowerCase()}`}
            disabled={value <= min}
            onClick={() => onChange(value - 1)}
          >
            <Minus className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            aria-label={`Increase ${label.toLowerCase()}`}
            disabled={value >= max}
            onClick={() => onChange(value + 1)}
          >
            <Plus className="size-3.5" />
          </Button>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------- Search ------------------------------- */

export function AvailabilitySearch() {
  const navigate = useNavigate();
  const today = startOfToday();

  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const nights =
    checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;

  const handleCheckIn = (date: Date) => {
    setCheckIn(date);
    setError(null);
    // Keep check-out valid: at least one night after check-in.
    if (!checkOut || differenceInCalendarDays(checkOut, date) < 1) {
      setCheckOut(addDays(date, 1));
    }
  };

  const handleCheckOut = (date: Date) => {
    setCheckOut(date);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkIn || !checkOut) {
      setError("Choose your check-in and check-out dates.");
      return;
    }
    if (nights < 1) {
      setError("Check-out must be at least one night after check-in.");
      return;
    }

    const params = new URLSearchParams({
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
    });
    navigate({ pathname: "/rooms", search: `?${params.toString()}` });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="availability-title"
      className="relative rounded-3xl border bg-card/90 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7"
    >
      <div
        aria-hidden
        className={cn("absolute inset-x-10 top-0 h-px", goldHairline)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.85fr_0.85fr_auto] lg:items-end">
        <DateField
          id="check-in"
          label="Check-in"
          placeholder="Select date"
          value={checkIn}
          onChange={handleCheckIn}
          isDisabled={(date) => date < today}
        />
        <DateField
          id="check-out"
          label="Check-out"
          placeholder="Select date"
          value={checkOut}
          onChange={handleCheckOut}
          isDisabled={(date) =>
            differenceInCalendarDays(date, checkIn ?? today) < 1
          }
        />
        <GuestStepper
          label="Adults"
          hint="Age 13+"
          icon={Users}
          value={adults}
          min={1}
          max={MAX_ADULTS}
          onChange={setAdults}
        />
        <GuestStepper
          label="Children"
          hint="Age 0 to 12"
          icon={Baby}
          value={children}
          min={0}
          max={MAX_CHILDREN}
          onChange={setChildren}
        />
        <Button
          type="submit"
          size="lg"
          className={cn(
            "h-12 w-full rounded-xl px-8 text-base sm:col-span-2 lg:col-span-1 lg:w-auto",
            goldButton
          )}
        >
          <Search className="size-4" />
          Check availability
        </Button>
      </div>

      <p
        role={error ? "alert" : "status"}
        className={cn(
          "mt-4 min-h-5 text-sm",
          error ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {error ??
          (nights > 0
            ? `${nights} ${nights === 1 ? "night" : "nights"} selected`
            : "")}
      </p>
    </form>
  );
}
