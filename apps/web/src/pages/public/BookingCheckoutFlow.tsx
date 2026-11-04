import { zodResolver } from "@hookform/resolvers/zod";
import {
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Info,
  LoaderCircle,
  LockKeyhole,
  type LucideIcon,
  MessageSquare,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";

import CheckoutHeroImage from "@/assets/landing_hero.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { CreatePublicBookingResult } from "@/features/bookings/bookings.types";
import { useAvailableBookingRooms } from "@/features/bookings/hooks/useAvailableBookingRooms";
import { useCreatePublicBooking } from "@/features/bookings/hooks/useCreatePublicBooking";
import { createPublicCheckoutSchema } from "@/features/bookings/schemas/public-checkout.schema";
import { useRazorpayPayment } from "@/features/payments/hooks/useRazorpayPayment";
import type { PublicPaymentStatus } from "@/features/payments/payments.types";
import { useAvailableRoom } from "@/features/public/useAvailableRooms";
import { getBookingPreferences } from "@/features/public/bookingPreferences";
import { formatPrice, formatString } from "@/lib/format";
import { notifyError } from "@/lib/notification";

const CHECKOUT_FORM_ID = "public-booking-checkout-form";

type StayDetails = {
  checkIn: Date;
  checkOut: Date;
  checkInDate: string;
  checkOutDate: string;
};

type CheckoutSchema = ReturnType<typeof createPublicCheckoutSchema>;
type CheckoutFormInput = z.input<CheckoutSchema>;
type CheckoutFormData = z.output<CheckoutSchema>;

function getStayDetails(
  checkInDate: string | null,
  checkOutDate: string | null
): StayDetails | null {
  if (
    !checkInDate ||
    !checkOutDate ||
    !/^\d{4}-\d{2}-\d{2}$/.test(checkInDate) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(checkOutDate)
  ) {
    return null;
  }
  const checkIn = parseISO(checkInDate);
  const checkOut = parseISO(checkOutDate);
  if (
    !isValid(checkIn) ||
    !isValid(checkOut) ||
    checkIn < startOfToday() ||
    checkOut <= checkIn
  ) {
    return null;
  }
  return { checkIn, checkOut, checkInDate, checkOutDate };
}

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return formatPrice(amount);
  }
}

function getPhotoAlt(altText: string | null, roomName: string) {
  if (
    !altText ||
    /^(pasted image|image)(?:\s*\(\d+\))?(?:\.[a-z0-9]+)?$/i.test(
      altText.trim()
    )
  ) {
    return `${roomName} room photo`;
  }
  return altText.trim();
}

function handleRoomImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  if (!event.currentTarget.src.endsWith("/landing_hero.png")) {
    event.currentTarget.src = CheckoutHeroImage;
  }
}

function ProgressSteps({ currentStep }: { currentStep: number }) {
  const steps = ["Guest details", "Payment", "Confirmation"];
  return (
    <ol
      aria-label="Booking progress"
      className="mx-auto mb-7 flex max-w-2xl items-center"
    >
      {steps.map((step, index) => {
        const number = index + 1;
        const completed = number < currentStep;
        const active = number === currentStep;
        return (
          <React.Fragment key={step}>
            {index > 0 && (
              <li aria-hidden="true" className="h-px flex-1 bg-border" />
            )}
            <li
              aria-current={active ? "step" : undefined}
              className="flex min-w-0 flex-col items-center gap-2"
            >
              <span
                className={`grid size-8 place-items-center rounded-full text-sm font-semibold ${
                  completed || active
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground"
                }`}
              >
                {completed ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  number
                )}
              </span>
              <span
                className={`text-xs whitespace-nowrap ${
                  active || completed
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </li>
          </React.Fragment>
        );
      })}
    </ol>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div>
        <h2 className="font-heading text-xl font-medium text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-xs text-destructive" role="alert">
      {children}
    </p>
  );
}

function CheckoutSkeleton() {
  return (
    <main className="min-w-0 bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-7 h-9 max-w-2xl" />
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-5">
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-44 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
          <Skeleton className="h-136 w-full" />
        </div>
      </div>
    </main>
  );
}

function CheckoutError({
  title,
  description,
  onRetry,
  backTo,
}: {
  title: string;
  description: string;
  onRetry?: () => void;
  backTo: string;
}) {
  return (
    <main className="min-w-0 bg-background px-4 py-12 text-foreground sm:py-16">
      <div className="mx-auto max-w-2xl border-y border-border py-10 text-center">
        <h1 className="font-heading text-3xl font-medium">{title}</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <Button onClick={onRetry} type="button" variant="outline">
              Try again
            </Button>
          )}
          <Button nativeButton={false} render={<Link to={backTo} />}>
            Back to room
          </Button>
        </div>
      </div>
    </main>
  );
}

function BookingConfirmation({
  booking,
  payment,
  roomName,
  stay,
  adults,
  children,
}: {
  booking: CreatePublicBookingResult;
  payment: PublicPaymentStatus;
  roomName: string;
  stay: StayDetails;
  adults: number;
  children: number;
}) {
  return (
    <main className="min-w-0 bg-background px-4 py-10 text-foreground sm:py-16">
      <section
        aria-labelledby="booking-confirmed-title"
        className="mx-auto max-w-3xl"
      >
        <div className="grid size-12 place-items-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 aria-hidden="true" className="size-6" />
        </div>
        <p className="mt-5 text-sm font-semibold text-success">
          Payment confirmed
        </p>
        <h1
          className="mt-2 font-heading text-3xl font-medium sm:text-4xl"
          id="booking-confirmed-title"
        >
          Your stay is booked
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Booking reference{" "}
          <span className="font-semibold text-foreground">
            {booking.bookingReference}
          </span>
        </p>
        <dl className="mt-8 grid gap-x-8 border-y border-border sm:grid-cols-2">
          <div className="border-b border-border py-4 sm:col-span-2">
            <dt className="text-xs text-muted-foreground">Room</dt>
            <dd className="mt-1 font-heading text-xl font-medium">
              {roomName}
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="text-xs text-muted-foreground">Check-in</dt>
            <dd className="mt-1 text-sm font-medium">
              {format(stay.checkIn, "EEE, dd MMM yyyy")}
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="text-xs text-muted-foreground">Check-out</dt>
            <dd className="mt-1 text-sm font-medium">
              {format(stay.checkOut, "EEE, dd MMM yyyy")}
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="text-xs text-muted-foreground">Guests</dt>
            <dd className="mt-1 text-sm font-medium">
              {adults} adult{adults === 1 ? "" : "s"}
              {children > 0 &&
                `, ${children} ${children === 1 ? "child" : "children"}`}
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="text-xs text-muted-foreground">Payment</dt>
            <dd className="mt-1 text-sm font-medium text-success">
              {payment.paymentStatus} · {payment.bookingStatus}
            </dd>
          </div>
          <div className="py-4 sm:col-span-2">
            <dt className="text-xs text-muted-foreground">Amount paid</dt>
            <dd className="mt-1 font-heading text-2xl font-semibold">
              {formatPrice(payment.paidAmount)}
            </dd>
          </div>
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button nativeButton={false} render={<Link to="/rooms" />}>
            Browse more rooms
          </Button>
          <Button
            nativeButton={false}
            render={<Link to="/" />}
            variant="outline"
          >
            Return home
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function BookingCheckoutFlow() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const preferences = getBookingPreferences(searchParams);
  const { checkInDate, checkOutDate, adults, children } = preferences;
  const stay = getStayDetails(checkInDate, checkOutDate);
  const roomBackHref = slug ? `/rooms/${slug}` : "/rooms";
  const roomBackSearch = new URLSearchParams();
  if (checkInDate) roomBackSearch.set("checkInDate", checkInDate);
  if (checkOutDate) roomBackSearch.set("checkOutDate", checkOutDate);
  roomBackSearch.set("adults", String(adults));
  roomBackSearch.set("children", String(children));
  const roomBackTo = `${roomBackHref}?${roomBackSearch.toString()}`;
  const {
    room,
    isLoading: isRoomLoading,
    isError: isRoomError,
    refetch,
  } = useAvailableRoom(slug ?? null, stay?.checkInDate, stay?.checkOutDate);
  const availabilityParams = stay
    ? {
        checkInDate: stay.checkInDate,
        checkOutDate: stay.checkOutDate,
        adults,
        children,
      }
    : undefined;
  const {
    rooms: availableRooms,
    isLoading: isAvailabilityLoading,
    isError: isAvailabilityError,
    refetch: refetchAvailability,
  } = useAvailableBookingRooms(availabilityParams);
  const createBooking = useCreatePublicBooking();
  const {
    startPayment,
    isPending: isPaymentPending,
    isCheckoutOpen,
  } = useRazorpayPayment();
  const [checkoutToken] = React.useState(() => globalThis.crypto.randomUUID());
  const [booking, setBooking] =
    React.useState<CreatePublicBookingResult | null>(null);
  const [payment, setPayment] = React.useState<PublicPaymentStatus | null>(
    null
  );
  const [paymentMessage, setPaymentMessage] = React.useState("");
  const [specialRequest, setSpecialRequest] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [termsAttempted, setTermsAttempted] = React.useState(false);
  const schema = createPublicCheckoutSchema(adults, children);
  const form = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companions: Array.from(
        { length: Math.max(adults + children - 1, 0) },
        () => ({ fullName: "" })
      ),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "companions",
  });

  const availableRoom = room
    ? availableRooms.find((item) => item.roomType.id === room.id)
    : undefined;
  const nights = stay
    ? differenceInCalendarDays(stay.checkOut, stay.checkIn)
    : 0;
  const roomSubtotal = room ? room.basePrice * nights : 0;
  const taxAmount = booking
    ? Math.max(booking.totalAmount - roomSubtotal, 0)
    : null;
  const confirmed = Boolean(
    booking &&
    payment?.paymentStatus === "COMPLETED" &&
    payment.bookingStatus === "CONFIRMED"
  );
  const currentStep = confirmed ? 3 : booking ? 2 : 1;

  const launchPayment = (reservation: CreatePublicBookingResult) => {
    setPaymentMessage("");
    void startPayment(reservation.id, reservation.bookingReference, {
      checkoutToken: reservation.checkoutToken,
      onStatus: (status) => {
        if ("bookingStatus" in status) {
          setPayment(status);
          if (
            status.paymentStatus === "COMPLETED" &&
            status.bookingStatus !== "CONFIRMED"
          ) {
            setPaymentMessage(
              "Payment received. Your booking is being confirmed; please do not pay again."
            );
          } else {
            setPaymentMessage("");
          }
        }
      },
      onCancelled: () =>
        setPaymentMessage(
          "Payment was cancelled. Your reservation is pending; you can retry securely below."
        ),
      onFailed: () =>
        setPaymentMessage(
          "Payment did not complete. Your reservation is pending; please retry or use another payment method."
        ),
      onVerificationFailed: () =>
        setPaymentMessage(
          "We could not verify the payment yet. Do not retry if your account was charged; contact support."
        ),
    });
  };

  const onSubmit = async (values: CheckoutFormData) => {
    setTermsAttempted(true);
    if (!acceptedTerms) return;
    if (!stay || !room || !availableRoom) return;

    if (booking) {
      launchPayment(booking);
      return;
    }

    try {
      const createdBooking = await createBooking.mutateAsync({
        checkoutToken,
        guestName: values.fullName,
        guestEmail: values.email,
        guestPhone: values.phone,
        roomId: availableRoom.id,
        checkInDate: stay.checkInDate,
        checkOutDate: stay.checkOutDate,
        adults,
        children,
        guests: [
          { fullName: values.fullName },
          ...values.companions.map((guest) => ({ fullName: guest.fullName })),
        ],
        ...(specialRequest.trim() && { specialRequest: specialRequest.trim() }),
        paymentMethod: "ONLINE",
      });
      setBooking(createdBooking);
      launchPayment(createdBooking);
    } catch (error) {
      notifyError(error);
      setPaymentMessage(
        "We could not prepare your reservation. Check room availability and try again."
      );
    }
  };

  if (isRoomLoading) return <CheckoutSkeleton />;

  if (isRoomError || !room) {
    return (
      <CheckoutError
        backTo="/rooms"
        description="This room may no longer be available. Return to the room list and choose another room."
        onRetry={() => void refetch()}
        title="Room details could not be loaded"
      />
    );
  }

  if (!stay) {
    return (
      <CheckoutError
        backTo={roomBackHref}
        description="Choose valid check-in and check-out dates before continuing to checkout."
        title="Your stay dates are missing or invalid"
      />
    );
  }

  if (confirmed && booking && payment) {
    return (
      <BookingConfirmation
        adults={adults}
        booking={booking}
        children={children}
        payment={payment}
        roomName={room.name}
        stay={stay}
      />
    );
  }

  const submitDisabled =
    createBooking.isPending ||
    isPaymentPending ||
    isCheckoutOpen ||
    isAvailabilityLoading ||
    isAvailabilityError ||
    !availableRoom ||
    (payment?.paymentStatus === "COMPLETED" &&
      payment.bookingStatus !== "CONFIRMED");

  return (
    <main className="min-w-0 bg-background text-foreground">
      <section className="relative isolate flex min-h-44 items-center overflow-hidden sm:min-h-52">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          src={CheckoutHeroImage}
        />
        <div className="absolute inset-0 -z-10 bg-foreground/65" />
        <div className="container mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-background/80 sm:text-sm"
          >
            <Link className="hover:text-background" to="/">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <Link className="hover:text-background" to="/rooms">
              Rooms
            </Link>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <Link
              className="max-w-40 truncate hover:text-background"
              to={roomBackTo}
            >
              {room.name}
            </Link>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <span aria-current="page" className="text-background">
              Checkout
            </span>
          </nav>
          <h1 className="mt-4 font-heading text-3xl font-medium text-background sm:text-4xl">
            Complete your booking
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-background/85 sm:text-base">
            Confirm your stay details and continue to secure online payment.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <ProgressSteps currentStep={currentStep} />
        <form
          className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_23rem] xl:gap-7"
          id={CHECKOUT_FORM_ID}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="min-w-0 space-y-4">
            <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <SectionHeading
                description="We’ll use these details for your reservation."
                icon={UserRound}
                title="Guest information"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="guest-full-name">Full name *</Label>
                  <Input
                    autoComplete="name"
                    className="mt-2 h-10 bg-background"
                    disabled={Boolean(booking)}
                    id="guest-full-name"
                    placeholder="Your full name"
                    {...form.register("fullName")}
                  />
                  <FieldError>
                    {form.formState.errors.fullName?.message}
                  </FieldError>
                </div>
                <div>
                  <Label htmlFor="guest-email">Email address *</Label>
                  <Input
                    autoComplete="email"
                    className="mt-2 h-10 bg-background"
                    disabled={Boolean(booking)}
                    id="guest-email"
                    placeholder="name@example.com"
                    type="email"
                    {...form.register("email")}
                  />
                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </div>
                <div>
                  <Label htmlFor="guest-phone">Mobile number *</Label>
                  <div className="relative mt-2">
                    <Phone
                      aria-hidden="true"
                      className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      autoComplete="tel-national"
                      className="h-10 bg-background pl-9"
                      disabled={Boolean(booking)}
                      id="guest-phone"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      type="tel"
                      {...form.register("phone")}
                    />
                  </div>
                  <FieldError>
                    {form.formState.errors.phone?.message}
                  </FieldError>
                </div>
              </div>

              {fields.length > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Users aria-hidden="true" className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Other guests
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.map((field, index) => {
                      const error =
                        form.formState.errors.companions?.[index]?.fullName
                          ?.message;
                      return (
                        <div key={field.id}>
                          <Label htmlFor={`companion-${index}`}>
                            Guest {index + 2} full name *
                          </Label>
                          <Input
                            autoComplete="off"
                            className="mt-2 h-10 bg-background"
                            disabled={Boolean(booking)}
                            id={`companion-${index}`}
                            placeholder="Guest full name"
                            {...form.register(`companions.${index}.fullName`)}
                          />
                          <FieldError>{error}</FieldError>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <SectionHeading
                description="Review the dates and guests selected for this room."
                icon={CalendarDays}
                title="Stay details"
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Check-in</p>
                  <p className="mt-1 text-sm font-semibold">
                    {format(stay.checkIn, "EEE, dd MMM yyyy")}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-background p-3">
                  <p className="text-xs text-muted-foreground">Check-out</p>
                  <p className="mt-1 text-sm font-semibold">
                    {format(stay.checkOut, "EEE, dd MMM yyyy")}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-background p-3">
                  <p className="text-xs text-muted-foreground">
                    Duration and guests
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {nights} {nights === 1 ? "night" : "nights"} · {adults}{" "}
                    adult{adults === 1 ? "" : "s"}
                    {children > 0 &&
                      ` · ${children} ${children === 1 ? "child" : "children"}`}
                  </p>
                </div>
              </div>
              <Link
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                to={roomBackTo}
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Edit stay
              </Link>
            </section>

            <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <SectionHeading
                description="Optional details for the hotel team."
                icon={MessageSquare}
                title="Special requests"
              />
              <Label htmlFor="special-request" className="sr-only">
                Special requests
              </Label>
              <Textarea
                className="min-h-24 resize-y bg-background"
                disabled={Boolean(booking)}
                id="special-request"
                maxLength={500}
                onChange={(event) => setSpecialRequest(event.target.value)}
                placeholder="Let us know about arrival time, accessibility needs, or other requests."
                value={specialRequest}
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {specialRequest.length}/500
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Secure online payment
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    Card, UPI, and other supported methods are handled in
                    Razorpay checkout.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex items-start gap-3 px-1">
              <Checkbox
                checked={acceptedTerms}
                disabled={Boolean(booking)}
                id="accept-terms"
                onCheckedChange={(checked) => {
                  setAcceptedTerms(checked === true);
                  setTermsAttempted(false);
                }}
              />
              <div>
                <Label
                  className="cursor-pointer text-sm leading-5 font-normal"
                  htmlFor="accept-terms"
                >
                  I agree to the booking and cancellation terms. *
                </Label>
                {termsAttempted && !acceptedTerms && (
                  <FieldError>Please accept the terms to continue.</FieldError>
                )}
              </div>
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-5">
            <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="aspect-video overflow-hidden bg-muted">
                {room.images[0] ? (
                  <img
                    alt={getPhotoAlt(room.images[0].altText, room.name)}
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    onError={handleRoomImageError}
                    src={
                      room.images.find((image) => image.isPrimary)?.url ??
                      room.images[0].url
                    }
                  />
                ) : (
                  <img
                    alt={`${room.name} room photo`}
                    className="h-full w-full object-cover"
                    src={CheckoutHeroImage}
                  />
                )}
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-heading text-xl font-medium text-foreground">
                      {room.name}
                    </h2>
                    {room.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                        {room.description}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-right text-sm font-semibold text-foreground">
                    {formatCurrency(room.basePrice, room.currency)}
                    <span className="block text-xs font-normal text-muted-foreground">
                      per night
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-b border-border pb-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {formatString(room.bedType)} · {room.bedCount}{" "}
                    {room.bedCount === 1 ? "bed" : "beds"}
                  </span>
                  {room.sizeSqFt !== null && <span>{room.sizeSqFt} sq ft</span>}
                  <span className="inline-flex items-center gap-1.5">
                    <Users aria-hidden="true" className="size-4 text-primary" />
                    {adults + children} guests
                  </span>
                </div>

                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">
                      {formatCurrency(room.basePrice, room.currency)} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </dt>
                    <dd className="font-medium text-foreground">
                      {formatCurrency(roomSubtotal, room.currency)}
                    </dd>
                  </div>
                  {booking && taxAmount !== null && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Taxes and fees</dt>
                      <dd className="font-medium text-foreground">
                        {formatCurrency(taxAmount, room.currency)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3 border-t border-border pt-3 font-semibold">
                    <dt>Total due</dt>
                    <dd className="text-right">
                      {booking
                        ? formatCurrency(booking.totalAmount, room.currency)
                        : "Confirmed before payment"}
                    </dd>
                  </div>
                </dl>

                {isAvailabilityLoading && (
                  <p
                    className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
                    role="status"
                  >
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                    Checking room availability
                  </p>
                )}
                {isAvailabilityError && (
                  <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3">
                    <p
                      className="text-xs leading-5 text-destructive"
                      role="alert"
                    >
                      Availability could not be checked. Retry before paying.
                    </p>
                    <Button
                      className="mt-2 h-8 px-2 text-xs"
                      onClick={() => void refetchAvailability()}
                      type="button"
                      variant="outline"
                    >
                      Retry availability
                    </Button>
                  </div>
                )}
                {!isAvailabilityLoading &&
                  !isAvailabilityError &&
                  !availableRoom && (
                    <p
                      className="mt-4 text-xs leading-5 text-destructive"
                      role="status"
                    >
                      This room is no longer available for the selected stay.
                    </p>
                  )}
                {paymentMessage && (
                  <p
                    className="mt-4 rounded-md border border-border bg-background p-3 text-xs leading-5 text-muted-foreground"
                    role="status"
                  >
                    {paymentMessage}
                  </p>
                )}

                <Button
                  className="mt-5 h-11 w-full"
                  disabled={submitDisabled}
                  form={CHECKOUT_FORM_ID}
                  type="submit"
                >
                  {createBooking.isPending || isPaymentPending ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  ) : (
                    <LockKeyhole aria-hidden="true" className="size-4" />
                  )}
                  {createBooking.isPending
                    ? "Preparing reservation"
                    : isPaymentPending
                      ? "Opening secure payment"
                      : booking
                        ? `Retry payment · ${formatCurrency(booking.totalAmount, room.currency)}`
                        : "Continue to secure payment"}
                </Button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <CreditCard aria-hidden="true" className="size-3.5" />
                  Payment details are entered securely with Razorpay.
                </p>
              </div>
            </section>
            <div className="mt-3 flex items-start gap-2 px-1 text-xs leading-5 text-muted-foreground">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Your booking is confirmed only after payment verification
              succeeds.
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
