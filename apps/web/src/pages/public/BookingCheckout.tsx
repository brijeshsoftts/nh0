import {
  differenceInCalendarDays,
  format,
  parseISO,
  startOfToday,
} from "date-fns";
import {
  AlertCircle,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileCheck2,
  Lock,
  Mail,
  Phone,
  Plus,
  Printer,
  RotateCw,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { type FormEvent, useId, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bookingsService } from "@/features/bookings/bookings.service";
import type { BookingGuestInput } from "@/features/bookings/bookings.types";
import { useAvailableRoom } from "@/features/public/useAvailableRooms";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Helpers & Formatting                                                       */
/* -------------------------------------------------------------------------- */

function formatMoney(amount: number, currency: string = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

function formatBedType(bedType: string) {
  const labels: Record<string, string> = {
    SINGLE: "Single bed",
    TWIN: "Twin beds",
    DOUBLE: "Double bed",
    QUEEN: "Queen bed",
    KING: "King bed",
    SUPER_KING: "Super king bed",
    BUNK: "Bunk beds",
    SOFA_BED: "Sofa bed",
    OTHER: "Bed arrangement",
  };

  return (
    labels[bedType] ??
    bedType
      .toLowerCase()
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function parseValidIsoDate(value: string | null): string | undefined {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime())
    ? undefined
    : format(parsed, "yyyy-MM-dd");
}

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type PaymentMethodOption = "CASH" | "ONLINE";

interface LeadGuestForm {
  fullName: string;
  email: string;
  phone: string;
}

interface ConfirmedBookingDetails {
  bookingReference: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  totalGuests: number;
  leadGuest: LeadGuestForm;
  paymentMethod: PaymentMethodOption;
  totalAmount: number;
}

/* -------------------------------------------------------------------------- */
/* Booking Progress Indicator Component                                       */
/* -------------------------------------------------------------------------- */

function BookingProgressIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, title: "Stay & Room", icon: BedDouble },
    { number: 2, title: "Guest Details", icon: Users },
    { number: 3, title: "Payment", icon: Wallet },
    { number: 4, title: "Confirmation", icon: FileCheck2 },
  ];

  return (
    <nav aria-label="Booking steps" className="mb-8 overflow-x-auto pb-2">
      <ol className="flex min-w-[560px] items-center justify-between gap-2 border-b border-border/80 pb-4">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const Icon = step.icon;

          return (
            <li
              key={step.number}
              className="flex items-center gap-3"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent &&
                    "border-2 border-gold bg-gold/10 font-semibold text-gold",
                  !isCompleted &&
                    !isCurrent &&
                    "border border-border bg-muted/40 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" strokeWidth={2.5} />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Step 0{step.number}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    isCurrent && "font-semibold text-foreground",
                    isCompleted && "font-medium text-foreground",
                    !isCurrent && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px w-8 sm:w-12",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Booking Checkout Component                                            */
/* -------------------------------------------------------------------------- */

export default function BookingCheckout() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const formId = useId();

  const today = startOfToday();
  const todayString = format(today, "yyyy-MM-dd");

  // Read URL stay parameters
  const checkIn = parseValidIsoDate(
    searchParams.get("checkIn") ?? searchParams.get("check-in")
  );
  const checkOut = parseValidIsoDate(
    searchParams.get("checkOut") ?? searchParams.get("check-out")
  );
  const adults = Math.max(1, Number(searchParams.get("adults")) || 1);
  const children = Math.max(0, Number(searchParams.get("children")) || 0);
  const totalGuests = adults + children;

  // Lead guest form state
  const [leadGuest, setLeadGuest] = useState<LeadGuestForm>({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: "",
  });

  // Additional guests state
  const [additionalGuests, setAdditionalGuests] = useState<BookingGuestInput[]>(
    []
  );

  // Special request
  const [specialRequest, setSpecialRequest] = useState<string>("");

  // Payment method selection
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodOption>("CASH");

  // Form validation errors
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    payment?: string;
    general?: string;
  }>({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<ConfirmedBookingDetails | null>(null);

  // Fetch live room details & live availability status
  const { room, isLoading, isError, refetch } = useAvailableRoom(
    slug ?? null,
    checkIn,
    checkOut
  );

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    try {
      const diff = differenceInCalendarDays(
        parseISO(checkOut),
        parseISO(checkIn)
      );
      return Math.max(1, diff);
    } catch {
      return 1;
    }
  }, [checkIn, checkOut]);

  // Authoritative price calculations matching backend `calculateBookingTotals`
  const pricing = useMemo(() => {
    const basePrice = room?.basePrice ?? 0;
    const subtotal = basePrice * nights;
    const taxAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + taxAmount;
    return { basePrice, subtotal, taxAmount, totalAmount };
  }, [room?.basePrice, nights]);

  // Validation checks for stay parameters
  const dateError = useMemo(() => {
    if (!checkIn || !checkOut) {
      return "Stay dates are missing. Please select check-in and check-out dates to proceed.";
    }
    if (checkIn < todayString) {
      return "The check-in date is in the past. Please select upcoming stay dates.";
    }
    if (checkOut <= checkIn) {
      return "Check-out date must be after the check-in date.";
    }
    return null;
  }, [checkIn, checkOut, todayString]);

  const occupancyError = useMemo(() => {
    if (room && totalGuests > room.maxGuests) {
      return `This room allows a maximum of ${room.maxGuests} guest${room.maxGuests === 1 ? "" : "s"} (${totalGuests} requested).`;
    }
    return null;
  }, [room, totalGuests]);

  // Helper to handle guest list additions
  const handleAddGuest = () => {
    if (1 + additionalGuests.length >= totalGuests) return;
    setAdditionalGuests((prev) => [
      ...prev,
      {
        fullName: "",
        age: 30,
        gender: "MALE",
        idProofNumber: "",
      },
    ]);
  };

  const handleRemoveGuest = (index: number) => {
    setAdditionalGuests((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateGuest = (
    index: number,
    field: keyof BookingGuestInput,
    value: string | number
  ) => {
    setAdditionalGuests((prev) =>
      prev.map((g, idx) => (idx === index ? { ...g, [field]: value } : g))
    );
  };

  // Form submission handler
  const handleCheckoutSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: typeof formErrors = {};

    // Validate Full Name
    if (!leadGuest.fullName.trim()) {
      errors.fullName = "Full name is required.";
    } else if (leadGuest.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full legal name.";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!leadGuest.email.trim()) {
      errors.email = "Email address is required for booking confirmation.";
    } else if (!emailRegex.test(leadGuest.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate Phone Number
    const phoneClean = leadGuest.phone.replace(/[\s()-]/g, "");
    if (!leadGuest.phone.trim()) {
      errors.phone = "Mobile phone number is required.";
    } else if (phoneClean.length < 10) {
      errors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!room || !checkIn || !checkOut) return;

    if (!room.availability.isAvailable) {
      setFormErrors({
        general:
          "This room type is no longer available for your selected dates. Please choose other dates or select another room.",
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // Step 1: Query backend available rooms to locate a bookable room instance
      const availableRooms = await bookingsService.findAvailableRooms({
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults,
        children,
      });

      // Filter rooms matching this room type
      const matchingRoom =
        availableRooms.find((r) => r.roomType.id === room.id) ??
        availableRooms[0];

      // Prepare guest array
      const guestsPayload: BookingGuestInput[] = [
        {
          fullName: leadGuest.fullName.trim(),
          age: 30,
          gender: "MALE",
        },
        ...additionalGuests.map((g) => ({
          fullName: g.fullName.trim() || `Guest (${g.gender.toLowerCase()})`,
          age: g.age || 30,
          gender: g.gender,
          idProofNumber: g.idProofNumber?.trim() || undefined,
        })),
      ];

      // Step 2: Attempt reservation creation through API service
      // Note: If calling as guest without an active staff session, the backend requires customerId
      if (matchingRoom) {
        try {
          const result = await bookingsService.create({
            customerId: user?.id ?? "guest-checkout",
            checkInDate: checkIn,
            checkOutDate: checkOut,
            adults,
            children,
            roomId: matchingRoom.id,
            guests: guestsPayload,
            specialRequest: specialRequest.trim() || undefined,
            paymentMethod,
          });

          // Transition to confirmation view upon verified booking
          setConfirmedBooking({
            bookingReference: result.bookingReference,
            roomName: room.name,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            nights,
            totalGuests,
            leadGuest,
            paymentMethod,
            totalAmount: result.amount || pricing.totalAmount,
          });
          return;
        } catch {
          // If backend create requires staff auth or customer account, inform guest clearly with contact channels
          setFormErrors({
            general:
              "Direct public booking reservation API is awaiting final backend guest-account enablement. Your room and dates are confirmed available. Please contact Nivara Reservations at +91 98765 43210 or reservations@nivarahotels.com to guarantee your reservation with zero deposit.",
          });
        }
      } else {
        setFormErrors({
          general:
            "No specific room inventory found matching your criteria. Please choose another date or room category.",
        });
      }
    } catch {
      setFormErrors({
        general:
          "Unable to confirm reservation due to a network or service issue. Please try again or contact reservations directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Confirmed State View (Step 4: Confirmation)                              */
  /* ------------------------------------------------------------------------ */

  if (confirmedBooking) {
    return (
      <div className="bg-background py-10 text-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <BookingProgressIndicator currentStep={4} />

          <div className="border border-border bg-card p-6 shadow-xl sm:p-10">
            <div className="border-b border-border pb-8 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="size-8" />
              </div>
              <p className="mb-1 text-[10px] font-medium tracking-[0.22em] text-gold uppercase">
                Reservation Confirmed
              </p>
              <h1 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
                Thank You, {confirmedBooking.leadGuest.fullName}!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Your reservation at Nivara Hotels & Resorts has been registered.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 border border-border bg-secondary/50 px-4 py-2 font-mono text-sm font-semibold">
                <span>Reference:</span>
                <span className="text-primary">
                  {confirmedBooking.bookingReference}
                </span>
              </div>
            </div>

            {/* Stay Summary Details */}
            <div className="space-y-4 border-b border-border py-6">
              <h2 className="font-heading text-xl font-normal">
                Reservation Summary
              </h2>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-muted-foreground">Room Type</p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {confirmedBooking.roomName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stay Duration</p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {confirmedBooking.nights} night
                    {confirmedBooking.nights > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-in Date</p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {confirmedBooking.checkInDate} (From 2:00 PM)
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out Date</p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {confirmedBooking.checkOutDate} (Until 11:00 AM)
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Guest</p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {confirmedBooking.leadGuest.fullName} (
                    {confirmedBooking.totalGuests} guests)
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Mode</p>
                  <p className="mt-0.5 font-medium text-foreground">
                    {confirmedBooking.paymentMethod === "CASH"
                      ? "Pay upon Arrival at Hotel"
                      : "Online Payment"}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Paid / Due */}
            <div className="flex items-center justify-between border-b border-border py-6">
              <div>
                <p className="text-xs text-muted-foreground">
                  Total Amount Payable
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Inclusive of 18% GST
                </p>
              </div>
              <p className="font-heading text-2xl font-normal text-foreground sm:text-3xl">
                {formatMoney(confirmedBooking.totalAmount)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.print()}
                className="rounded-none border-border"
              >
                <Printer className="mr-2 size-4" />
                Print Confirmation
              </Button>

              <Link to="/">
                <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Loading State                                                            */
  /* ------------------------------------------------------------------------ */

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="mb-6 h-4 w-48 animate-pulse bg-muted" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="h-44 w-full animate-pulse bg-muted" />
            <div className="h-64 w-full animate-pulse bg-muted" />
          </div>
          <div className="h-80 w-full animate-pulse border border-border bg-muted/40 p-6" />
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Error / Room Not Found State                                             */
  /* ------------------------------------------------------------------------ */

  if (isError || !room) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <AlertCircle
          className="mb-4 size-12 text-destructive/80"
          strokeWidth={1.2}
        />
        <p className="mb-2 text-[10px] font-medium tracking-[0.24em] text-gold uppercase">
          Nivara Hotels & Resorts
        </p>
        <h1 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
          Room option not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          We could not load the requested room selection for checkout. Please
          return to our room collection to choose your stay.
        </p>

        <div className="mt-8 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
            className="rounded-none border-border"
          >
            <RotateCw className="mr-2 size-4" />
            Try again
          </Button>

          <Link to="/rooms">
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Browse all rooms
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Missing Stay Dates / Edge Case State                                     */
  /* ------------------------------------------------------------------------ */

  if (dateError) {
    return (
      <div className="bg-background py-10 text-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <BookingProgressIndicator currentStep={1} />

          <div className="border border-border bg-card p-6 text-center sm:p-10">
            <CalendarDays
              className="mx-auto mb-4 size-12 text-gold"
              strokeWidth={1.3}
            />
            <h1 className="font-heading text-2xl font-normal sm:text-3xl">
              Stay Dates Required
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              {dateError}
            </p>

            <div className="mt-8">
              <Link to={`/rooms/${slug}`}>
                <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                  <ChevronLeft className="mr-2 size-4" />
                  Select Dates for {room.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Main Checkout Page Form View                                             */
  /* ------------------------------------------------------------------------ */

  const primaryImage =
    room.images.find((img) => img.isPrimary) ?? room.images[0] ?? null;

  return (
    <div className="bg-background text-foreground">
      {/* Section A: Page Header & Breadcrumbs */}
      <section className="border-b border-border bg-card/40 pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="size-3 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </li>
              <li>
                <Link to="/rooms" className="transition-colors hover:text-gold">
                  Rooms
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="size-3 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </li>
              <li>
                <Link
                  to={`/rooms/${slug}`}
                  className="transition-colors hover:text-gold"
                >
                  {room.name}
                </Link>
              </li>
              <li>
                <ChevronRight
                  className="size-3 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </li>
              <li aria-current="page" className="font-medium text-foreground">
                Checkout
              </li>
            </ol>
          </nav>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-[10px] font-medium tracking-[0.24em] text-gold uppercase">
                Secure Reservation
              </p>
              <h1 className="font-heading text-3xl font-normal tracking-tight sm:text-4xl lg:text-5xl">
                Complete Your Booking
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Review your selected room and stay details, provide guest
                information, and confirm your reservation.
              </p>
            </div>

            <Link
              to={`/rooms/${slug}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`}
              className="inline-flex items-center text-xs font-medium text-gold hover:underline"
            >
              <ChevronLeft className="mr-1 size-3.5" />
              Edit stay details
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        {/* Section B: Progress Indicator */}
        <BookingProgressIndicator currentStep={2} />

        {/* Global Warnings / Notifications */}
        {occupancyError && (
          <div className="mb-8 flex items-center gap-3 border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="size-5 shrink-0" />
            <p className="text-xs sm:text-sm">{occupancyError}</p>
          </div>
        )}

        {!room.availability.isAvailable && (
          <div className="mb-8 flex items-center justify-between gap-4 border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-5 shrink-0" />
              <p className="text-xs sm:text-sm">
                The {room.name} is no longer available for {checkIn} to{" "}
                {checkOut}.
              </p>
            </div>
            <Link to="/rooms">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-destructive text-destructive"
              >
                View Other Rooms
              </Button>
            </Link>
          </div>
        )}

        <form onSubmit={handleCheckoutSubmit} noValidate>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-12 xl:gap-16">
            {/* Left Area: Selected Room Summary, Guest Details & Payment */}
            <div className="space-y-8 sm:space-y-10">
              {/* Section 4: Selected Room and Stay Summary */}
              <section
                aria-labelledby={`${formId}-room-summary-heading`}
                className="border border-border bg-card p-5 sm:p-6"
              >
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h2
                    id={`${formId}-room-summary-heading`}
                    className="font-heading text-xl font-normal"
                  >
                    Selected Room & Stay
                  </h2>
                  <Link
                    to={`/rooms/${slug}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`}
                    className="text-xs font-medium text-gold hover:underline"
                  >
                    Change
                  </Link>
                </div>

                <div className="mt-4 flex flex-col items-start gap-5 sm:flex-row">
                  {/* Primary Room Image */}
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border border-border bg-secondary sm:aspect-square sm:w-36">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.altText ?? room.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted-foreground">
                        <BedDouble
                          className="size-8 text-gold"
                          strokeWidth={1.2}
                        />
                      </div>
                    )}
                  </div>

                  {/* Room Specs & Stay Information */}
                  <div className="flex-1 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-medium tracking-widest text-gold uppercase">
                        Nivara Collection
                      </span>
                      <h3 className="mt-0.5 text-base font-semibold text-foreground">
                        {room.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1 text-muted-foreground">
                      <div>
                        <span className="block font-medium text-foreground">
                          Check-in
                        </span>
                        <span>{checkIn}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-foreground">
                          Check-out
                        </span>
                        <span>{checkOut}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-foreground">
                          Duration
                        </span>
                        <span>
                          {nights} night{nights > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div>
                        <span className="block font-medium text-foreground">
                          Occupancy
                        </span>
                        <span>
                          {totalGuests} guests ({adults} adult
                          {adults > 1 ? "s" : ""}
                          {children > 0 ? `, ${children} child` : ""})
                        </span>
                      </div>
                      <div>
                        <span className="block font-medium text-foreground">
                          Bed Arrangement
                        </span>
                        <span>{formatBedType(room.bedType)}</span>
                      </div>
                      {room.sizeSqFt && (
                        <div>
                          <span className="block font-medium text-foreground">
                            Room Size
                          </span>
                          <span>{room.sizeSqFt} sq. ft.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Guest Details Form */}
              <section
                aria-labelledby={`${formId}-guest-form-heading`}
                className="space-y-6 border border-border bg-card p-5 sm:p-7"
              >
                <div className="border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <h2
                      id={`${formId}-guest-form-heading`}
                      className="font-heading text-xl font-normal"
                    >
                      Guest Information
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      Primary Contact
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Booking confirmation and property arrival details will be
                    sent to this contact.
                  </p>
                </div>

                {/* Primary Guest Fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`${formId}-fullname`}
                      className="mb-1.5 block text-xs font-medium text-foreground"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative flex items-center border border-border bg-background px-3 py-2.5 focus-within:border-gold">
                      <User className="mr-2.5 size-4 shrink-0 text-muted-foreground" />
                      <input
                        id={`${formId}-fullname`}
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={leadGuest.fullName}
                        onChange={(e) => {
                          setLeadGuest((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }));
                          setFormErrors((prev) => ({
                            ...prev,
                            fullName: undefined,
                          }));
                        }}
                        className="block w-full bg-transparent text-xs font-medium text-foreground outline-none"
                      />
                    </div>
                    {formErrors.fullName && (
                      <p role="alert" className="mt-1 text-xs text-destructive">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor={`${formId}-email`}
                      className="mb-1.5 block text-xs font-medium text-foreground"
                    >
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <div className="relative flex items-center border border-border bg-background px-3 py-2.5 focus-within:border-gold">
                      <Mail className="mr-2.5 size-4 shrink-0 text-muted-foreground" />
                      <input
                        id={`${formId}-email`}
                        type="email"
                        required
                        placeholder="e.g. eleanor@example.com"
                        value={leadGuest.email}
                        onChange={(e) => {
                          setLeadGuest((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          setFormErrors((prev) => ({
                            ...prev,
                            email: undefined,
                          }));
                        }}
                        className="block w-full bg-transparent text-xs font-medium text-foreground outline-none"
                      />
                    </div>
                    {formErrors.email && (
                      <p role="alert" className="mt-1 text-xs text-destructive">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor={`${formId}-phone`}
                      className="mb-1.5 block text-xs font-medium text-foreground"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <div className="relative flex items-center border border-border bg-background px-3 py-2.5 focus-within:border-gold">
                      <Phone className="mr-2.5 size-4 shrink-0 text-muted-foreground" />
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={leadGuest.phone}
                        onChange={(e) => {
                          setLeadGuest((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }));
                          setFormErrors((prev) => ({
                            ...prev,
                            phone: undefined,
                          }));
                        }}
                        className="block w-full bg-transparent text-xs font-medium text-foreground outline-none"
                      />
                    </div>
                    {formErrors.phone && (
                      <p role="alert" className="mt-1 text-xs text-destructive">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Guests List (if total guests > 1) */}
                {totalGuests > 1 && (
                  <div className="space-y-4 border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          Additional Guest Information
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Optionally register companions staying in this room.
                        </p>
                      </div>
                      <Badge variant="outline">
                        {1 + additionalGuests.length} of {totalGuests} guests
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {additionalGuests.map((guest, idx) => (
                        <div
                          key={idx}
                          className="space-y-3 border border-border/70 bg-background/50 p-3.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground">
                              Guest {idx + 2}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveGuest(idx)}
                              className="text-xs text-destructive hover:underline"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={guest.fullName}
                              onChange={(e) =>
                                handleUpdateGuest(
                                  idx,
                                  "fullName",
                                  e.target.value
                                )
                              }
                              className="border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-gold"
                            />
                            <input
                              type="number"
                              min={1}
                              max={120}
                              placeholder="Age"
                              value={guest.age || ""}
                              onChange={(e) =>
                                handleUpdateGuest(
                                  idx,
                                  "age",
                                  Number(e.target.value) || 30
                                )
                              }
                              className="border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-gold"
                            />
                            <select
                              value={guest.gender}
                              onChange={(e) =>
                                handleUpdateGuest(
                                  idx,
                                  "gender",
                                  e.target.value as BookingGuestInput["gender"]
                                )
                              }
                              className="border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-gold"
                            >
                              <option value="MALE">Male</option>
                              <option value="FEMALE">Female</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                        </div>
                      ))}

                      {1 + additionalGuests.length < totalGuests && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddGuest}
                          className="rounded-none border-dashed border-border"
                        >
                          <Plus className="mr-1.5 size-3.5" />
                          Add details for Guest {2 + additionalGuests.length}
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                <div className="border-t border-border pt-4">
                  <label
                    htmlFor={`${formId}-requests`}
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Special Requests{" "}
                    <span className="font-normal text-muted-foreground">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    id={`${formId}-requests`}
                    rows={3}
                    placeholder="Dietary preferences, accessibility requirements, quiet room preference…"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full resize-y border border-border bg-background p-3 text-xs text-foreground outline-none focus:border-gold"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Special requests are subject to hotel availability and
                    cannot be guaranteed prior to check-in.
                  </p>
                </div>
              </section>

              {/* Section 7: Payment Section */}
              <section
                aria-labelledby={`${formId}-payment-heading`}
                className="space-y-5 border border-border bg-card p-5 sm:p-7"
              >
                <div className="border-b border-border pb-3">
                  <h2
                    id={`${formId}-payment-heading`}
                    className="font-heading text-xl font-normal"
                  >
                    Select Payment Method
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose how you would like to settle your reservation
                    charges.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Cash / Pay upon arrival */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-4 border p-4 transition-all",
                      paymentMethod === "CASH"
                        ? "border-gold bg-gold/5 ring-1 ring-gold"
                        : "border-border bg-background/50 hover:border-gold/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CASH"
                      checked={paymentMethod === "CASH"}
                      onChange={() => setPaymentMethod("CASH")}
                      className="mt-1 accent-[#AD8A52]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Wallet className="size-4 shrink-0 text-gold" />
                        <span className="text-sm font-semibold text-foreground">
                          Pay upon Arrival (Cash / UPI / Card at Front Desk)
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Hold your reservation instantly with zero deposit.
                        Settle your payment in person upon arrival at the hotel
                        front desk.
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-2 border-success/40 text-[10px] text-success"
                      >
                        Zero Advance Required
                      </Badge>
                    </div>
                  </label>

                  {/* Option 2: Online Payment */}
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-4 border p-4 transition-all",
                      paymentMethod === "ONLINE"
                        ? "border-gold bg-gold/5 ring-1 ring-gold"
                        : "border-border bg-background/50 hover:border-gold/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={() => setPaymentMethod("ONLINE")}
                      className="mt-1 accent-[#AD8A52]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-4 shrink-0 text-gold" />
                        <span className="text-sm font-semibold text-foreground">
                          Online Payment (Debit/Credit Card, UPI, NetBanking)
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Secure digital checkout. (Note: Online gateway
                        integration is currently in progress; please choose Pay
                        upon Arrival to confirm immediately).
                      </p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        Gateway Integration in Progress
                      </Badge>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* Right Area: Authoritative Price Summary & Primary Action */}
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Section 6: Price Summary */}
              <section
                aria-labelledby={`${formId}-price-summary-heading`}
                className="space-y-5 border border-border bg-card p-5 shadow-lg sm:p-7"
              >
                <div className="border-b border-border pb-4">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                    Authoritative Pricing
                  </p>
                  <h2
                    id={`${formId}-price-summary-heading`}
                    className="mt-0.5 font-heading text-xl font-normal sm:text-2xl"
                  >
                    Price Summary
                  </h2>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Room Charge */}
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>
                      {formatMoney(pricing.basePrice, room.currency)} × {nights}{" "}
                      night{nights > 1 ? "s" : ""}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatMoney(pricing.subtotal, room.currency)}
                    </span>
                  </div>

                  {/* Applicable Taxes & GST */}
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Goods & Services Tax (GST 18%)</span>
                    <span className="font-medium text-foreground">
                      {formatMoney(pricing.taxAmount, room.currency)}
                    </span>
                  </div>

                  {/* Discounts if applicable */}
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Booking Fees</span>
                    <span className="font-medium text-success">FREE</span>
                  </div>

                  {/* Total Payable Amount */}
                  <div className="flex items-baseline justify-between border-t border-border pt-3">
                    <div>
                      <span className="block text-sm font-semibold text-foreground">
                        Total Payable
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        All taxes included
                      </span>
                    </div>
                    <span className="font-heading text-2xl font-normal text-foreground">
                      {formatMoney(pricing.totalAmount, room.currency)}
                    </span>
                  </div>
                </div>

                {/* General Submission Error */}
                {formErrors.general && (
                  <div className="border border-destructive/40 bg-destructive/10 p-3.5 text-xs leading-5 text-destructive">
                    <p>{formErrors.general}</p>
                  </div>
                )}

                {/* Section 8: Primary Action Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !room.availability.isAvailable}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-none bg-gold text-xs font-medium tracking-widest text-primary-foreground uppercase shadow-md transition-colors hover:bg-gold/90"
                  >
                    {isSubmitting ? (
                      <>
                        <RotateCw className="size-4 animate-spin" />
                        <span>Confirming Reservation…</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {paymentMethod === "CASH"
                            ? "Confirm Reservation"
                            : "Proceed to Online Payment"}
                        </span>
                        <ArrowRight className="size-4" strokeWidth={1.5} />
                      </>
                    )}
                  </Button>

                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground">
                    <Lock className="size-3 text-gold" />
                    <span>
                      Direct reservation · Free cancellation up to 48 hours
                      prior
                    </span>
                  </p>
                </div>
              </section>

              {/* Trust & Guarantee Box */}
              <div className="space-y-2 border border-border/80 bg-secondary/30 p-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <ShieldCheck className="size-4 text-gold" />
                  <span>The Nivara Direct Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Best rate direct reservation guarantee. Valid
                  government-issued photo ID required from all adult guests at
                  check-in.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
