import { addDays, format, isValid, parseISO, startOfToday } from "date-fns";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Minus,
  Plus,
  User,
} from "lucide-react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  getBookingPreferences,
  saveBookingPreferences,
} from "@/features/public/bookingPreferences";

function parseQueryDate(value: string | null) {
  if (!value) return undefined;
  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}

export function BookingBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = startOfToday();
  const preferences = getBookingPreferences(searchParams);
  const initialCheckInDate = parseQueryDate(preferences.checkInDate);
  const initialCheckOutDate = parseQueryDate(preferences.checkOutDate);
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>(
    initialCheckInDate && initialCheckInDate >= today
      ? initialCheckInDate
      : undefined
  );
  const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>(
    initialCheckOutDate &&
      initialCheckOutDate >= today &&
      (!initialCheckInDate || initialCheckOutDate > initialCheckInDate)
      ? initialCheckOutDate
      : undefined
  );
  const [adults, setAdults] = React.useState(preferences.adults);
  const [children, setChildren] = React.useState(preferences.children);
  const [bookingError, setBookingError] = React.useState("");

  const persistPreferences = (
    nextCheckInDate = checkInDate,
    nextCheckOutDate = checkOutDate,
    nextAdults = adults,
    nextChildren = children
  ) => {
    const nextCheckIn = nextCheckInDate ?? today;
    const nextCheckOut =
      nextCheckOutDate && nextCheckOutDate > nextCheckIn
        ? nextCheckOutDate
        : addDays(nextCheckIn, 1);
    saveBookingPreferences({
      checkInDate: format(nextCheckIn, "yyyy-MM-dd"),
      checkOutDate: format(nextCheckOut, "yyyy-MM-dd"),
      adults: nextAdults,
      children: nextChildren,
    });
  };

  const handleSearchRooms = () => {
    if (!checkInDate || !checkOutDate) {
      setBookingError("Select both check-in and check-out dates.");
      return;
    }

    if (checkInDate < today || checkOutDate <= checkInDate) {
      setBookingError("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      checkInDate: format(checkInDate, "yyyy-MM-dd"),
      checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      page: "1",
    });
    const roomType = searchParams.get("roomType");
    if (roomType) params.set("roomType", roomType);
    navigate(`/rooms?${params.toString()}#availability`);
  };

  return (
    <div
      className="relative z-30 container mx-auto flex flex-col items-center px-4 pb-8 lg:absolute lg:-bottom-8 lg:left-1/2 lg:w-full lg:-translate-x-1/2 lg:px-8"
      id="availability"
    >
      <div className="grid w-full max-w-200 grid-cols-1 items-center gap-2 rounded-3xl border border-border bg-card p-2 text-card-foreground shadow-[0_8px_30px_rgb(0,0,0,0.06)] min-[900px]:flex min-[900px]:justify-between min-[900px]:gap-0 min-[900px]:rounded-[2.5rem] min-[900px]:p-3 sm:grid-cols-2 lg:flex lg:justify-between lg:gap-0 lg:rounded-[2.5rem] lg:p-3">
        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:w-auto min-[900px]:px-6 min-[900px]:py-2 lg:w-auto lg:px-6 lg:py-2"
              />
            }
          >
            <CalendarIcon className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider text-foreground/60 uppercase">
                Check In
              </span>
              <span className="text-sm font-medium whitespace-nowrap text-foreground">
                {checkInDate
                  ? format(checkInDate, "MMM dd, yyyy")
                  : "Select Date"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto rounded-2xl border-border p-0"
          >
            <Calendar
              mode="single"
              selected={checkInDate}
              disabled={(date) => date < today}
              onSelect={(date) => {
                setCheckInDate(date);
                const nextCheckOutDate =
                  date && checkOutDate && checkOutDate > date
                    ? checkOutDate
                    : undefined;
                if (date && !nextCheckOutDate) {
                  setCheckOutDate(undefined);
                }
                persistPreferences(date, nextCheckOutDate);
                setBookingError("");
              }}
            />
          </PopoverContent>
        </Popover>

        <Separator
          orientation="vertical"
          className="hidden h-14 bg-border min-[900px]:block lg:block"
        />

        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:w-auto min-[900px]:px-6 min-[900px]:py-2 lg:w-auto lg:px-6 lg:py-2"
              />
            }
          >
            <CalendarIcon className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider text-foreground/60 uppercase">
                Check Out
              </span>
              <span className="text-sm font-medium whitespace-nowrap text-foreground">
                {checkOutDate
                  ? format(checkOutDate, "MMM dd, yyyy")
                  : "Select Date"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto rounded-2xl border-border p-0"
          >
            <Calendar
              mode="single"
              selected={checkOutDate}
              disabled={(date) => date <= (checkInDate ?? today)}
              onSelect={(date) => {
                setCheckOutDate(date);
                persistPreferences(checkInDate, date);
                setBookingError("");
              }}
            />
          </PopoverContent>
        </Popover>

        <Separator
          orientation="vertical"
          className="hidden h-14 bg-border min-[900px]:block lg:block"
        />

        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:w-auto min-[900px]:px-6 min-[900px]:py-2 lg:w-auto lg:px-6 lg:py-2"
              />
            }
          >
            <User className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider text-foreground/60 uppercase">
                Guests
              </span>
              <span className="text-sm font-medium whitespace-nowrap text-foreground">
                {adults} {adults === 1 ? "Adult" : "Adults"}, {children}{" "}
                {children === 1 ? "Child" : "Children"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-72 rounded-2xl border-border p-4"
          >
            <div className="space-y-4">
              {[
                { label: "Adults", count: adults, setCount: setAdults, min: 1 },
                {
                  label: "Children",
                  count: children,
                  setCount: setChildren,
                  min: 0,
                },
              ].map(({ label, count, setCount, min }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <div className="flex items-center gap-3">
                    <Button
                      aria-label={`Decrease ${label.toLowerCase()}`}
                      className="h-8 w-8"
                      disabled={count <= min}
                      onClick={() => {
                        const nextCount = count - 1;
                        setCount(nextCount);
                        persistPreferences(
                          checkInDate,
                          checkOutDate,
                          label === "Adults" ? nextCount : adults,
                          label === "Children" ? nextCount : children
                        );
                      }}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-5 text-center text-sm tabular-nums">
                      {count}
                    </span>
                    <Button
                      aria-label={`Increase ${label.toLowerCase()}`}
                      className="h-8 w-8"
                      disabled={count >= 10}
                      onClick={() => {
                        const nextCount = count + 1;
                        setCount(nextCount);
                        persistPreferences(
                          checkInDate,
                          checkOutDate,
                          label === "Adults" ? nextCount : adults,
                          label === "Children" ? nextCount : children
                        );
                      }}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Separator
          orientation="vertical"
          className="hidden h-14 bg-border min-[900px]:block lg:block"
        />

        <div className="w-full shrink-0 px-2 pb-2 min-[900px]:w-auto min-[900px]:pb-0 sm:col-span-2 lg:w-auto lg:pb-0">
          <Button
            className="h-12 w-full rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-[900px]:h-14 min-[900px]:w-auto lg:h-14 lg:w-auto"
            onClick={handleSearchRooms}
            type="button"
          >
            Search Rooms <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      {bookingError && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {bookingError}
        </p>
      )}
    </div>
  );
}
