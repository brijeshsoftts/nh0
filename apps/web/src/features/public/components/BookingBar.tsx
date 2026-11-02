import { format, isValid, parseISO, startOfToday } from "date-fns";
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

function parseQueryDate(value: string | null) {
  if (!value) return undefined;
  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}

function parseGuestCount(value: string | null, fallback: number, min: number) {
  if (value === null || value.trim() === "") return fallback;
  const count = Number(value);
  return Number.isInteger(count)
    ? Math.max(min, Math.min(10, count))
    : fallback;
}

export function BookingBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = startOfToday();
  const initialCheckInDate = parseQueryDate(searchParams.get("checkInDate"));
  const initialCheckOutDate = parseQueryDate(searchParams.get("checkOutDate"));
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
  const [adults, setAdults] = React.useState(() =>
    parseGuestCount(searchParams.get("adults"), 2, 1)
  );
  const [children, setChildren] = React.useState(() =>
    parseGuestCount(searchParams.get("children"), 0, 0)
  );
  const [bookingError, setBookingError] = React.useState("");

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
      className="relative z-30 container mx-auto flex flex-col items-center px-4 pb-8 md:absolute md:-bottom-8 md:left-1/2 md:w-full md:-translate-x-1/2 md:px-8"
      id="availability"
    >
      <div className="grid w-full max-w-200 grid-cols-1 items-center gap-2 rounded-3xl border border-border bg-card p-2 text-card-foreground shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:grid-cols-2 lg:flex lg:justify-between lg:gap-0 lg:rounded-[2.5rem] lg:p-3">
        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-auto lg:px-6 lg:py-2"
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
                if (date && checkOutDate && checkOutDate <= date) {
                  setCheckOutDate(undefined);
                }
                setBookingError("");
              }}
            />
          </PopoverContent>
        </Popover>

        <Separator
          orientation="vertical"
          className="hidden h-14 bg-border lg:block"
        />

        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-auto lg:px-6 lg:py-2"
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
                setBookingError("");
              }}
            />
          </PopoverContent>
        </Popover>

        <Separator
          orientation="vertical"
          className="hidden h-14 bg-border lg:block"
        />

        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex w-full flex-1 items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-auto lg:px-6 lg:py-2"
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
                      onClick={() => setCount((current) => current - 1)}
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
                      onClick={() => setCount((current) => current + 1)}
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
          className="hidden h-14 bg-border lg:block"
        />

        <div className="w-full shrink-0 px-2 pb-2 sm:col-span-2 lg:w-auto lg:pb-0">
          <Button
            className="h-12 w-full rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:h-14 lg:w-auto"
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
