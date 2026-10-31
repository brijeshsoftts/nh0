import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  CreatePublicBookingInput,
  CreatePublicBookingResult,
} from "@/features/bookings/bookings.types";
import { useAvailableBookingRooms } from "@/features/bookings/hooks/useAvailableBookingRooms";
import { useCreatePublicBooking } from "@/features/bookings/hooks/useCreatePublicBooking";
import { createPublicCheckoutSchema } from "@/features/bookings/schemas/public-checkout.schema";
import { useRazorpayPayment } from "@/features/payments/hooks/useRazorpayPayment";
import type {
  PaymentItem,
  PublicPaymentStatus,
} from "@/features/payments/payments.types";
import type { AvailableRoomDetails } from "@/features/public/public.types";
import { useAvailableRoom } from "@/features/public/useAvailableRooms";
import { formatBed, formatPrice } from "@/lib/format";

type StayDates = {
  checkInDate: string;
  checkOutDate: string;
  checkIn: Date;
  checkOut: Date;
};

type CheckoutSchema = ReturnType<typeof createPublicCheckoutSchema>;
type CheckoutFormInput = z.input<CheckoutSchema>;
type CheckoutFormData = z.output<CheckoutSchema>;

const CHECKOUT_FORM_ID = "nivara-public-checkout-form";

function parseCount(value: string | null, min: number, max: number) {
  if (value === null || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max
    ? parsed
    : null;
}

function getValidStay(searchParams: URLSearchParams): StayDates | null {
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
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

  return { checkInDate, checkOutDate, checkIn, checkOut };
}

function getEditSearchHref(stay: StayDates, adults: number, children: number) {
  const params = new URLSearchParams({
    checkInDate: stay.checkInDate,
    checkOutDate: stay.checkOutDate,
    adults: String(adults),
    children: String(children),
  });
  return `/rooms?${params.toString()}#availability`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: unknown } | undefined;
    if (typeof data?.message === "string") return data.message;
  }
  return "We couldn't reserve this room. Check availability and try again.";
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

function CheckoutProgress({
  currentStep,
  complete = false,
}: {
  currentStep: number;
  complete?: boolean;
}) {
  const steps = ["Room selected", "Guest details", "Payment", "Confirmation"];

  return (
    <ol
      aria-label="Booking progress"
      className="grid grid-cols-2 gap-x-3 gap-y-4 border-y border-border py-4 sm:grid-cols-4"
    >
      {steps.map((label, index) => {
        const step = index + 1;
        const isComplete = step < currentStep || complete;
        const isCurrent = step === currentStep && !complete;
        return (
          <li
            aria-current={isCurrent ? "step" : undefined}
            className="flex min-w-0 items-center gap-2"
            key={label}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                isComplete
                  ? "bg-primary text-primary-foreground"
                  : isCurrent
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {isComplete ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                step
              )}
            </span>
            <span
              className={`truncate text-xs sm:text-sm ${
                isCurrent || isComplete
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function CheckoutNotice({
  title,
  children,
  to = "/rooms#availability",
}: {
  title: string;
  children: string;
  to?: string;
}) {
  return (
    <div className="border-y border-border py-12 sm:py-16">
      <p className="text-sm font-medium text-muted-foreground">
        Reservation checkout
      </p>
      <h2 className="mt-2 font-heading text-2xl font-medium text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        {children}
      </p>
      <Button
        className="mt-6 h-12"
        nativeButton={false}
        render={<Link to={to} />}
        variant="outline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Return to rooms
      </Button>
    </div>
  );
}

function BookingSummary({
  room,
  stay,
  adults,
  children,
  reservation,
}: {
  room: AvailableRoomDetails;
  stay: StayDates;
  adults: number;
  children: number;
  reservation: CreatePublicBookingResult | null;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const primaryImage =
    room.images.find((image) => image.isPrimary) ?? room.images[0] ?? null;
  const nights = differenceInCalendarDays(stay.checkOut, stay.checkIn);

  return (
    <aside
      aria-labelledby="booking-summary-title"
      className="h-fit border border-border bg-card text-card-foreground shadow-sm"
    >
      <div className="p-4 sm:p-5">
        <h2
          className="font-heading text-xl font-medium text-foreground"
          id="booking-summary-title"
        >
          Booking Summary
        </h2>
        <div className="mt-4 grid grid-cols-[7rem_minmax(0,1fr)] gap-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
          <div className="aspect-4/3 overflow-hidden bg-muted">
            {primaryImage && !imageFailed ? (
              <img
                alt={getPhotoAlt(primaryImage.altText, room.name)}
                className="size-full object-cover"
                height={240}
                loading="eager"
                onError={() => setImageFailed(true)}
                src={primaryImage.url}
                width={320}
              />
            ) : (
              <div className="grid size-full place-items-center text-muted-foreground">
                <BedDouble aria-hidden="true" className="size-8" />
              </div>
            )}
          </div>
          <div className="min-w-0 self-center">
            <h3 className="line-clamp-2 font-heading text-lg font-medium text-foreground">
              {room.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
              {room.description ||
                "Room details are provided by Nivara Hotels."}
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <BedDouble aria-hidden="true" className="size-3.5 text-primary" />
            {formatBed(room.bedType, room.bedCount)}
          </li>
          {room.sizeSqFt ? <li>{room.sizeSqFt} sq ft</li> : null}
          <li className="inline-flex items-center gap-1.5">
            <Users aria-hidden="true" className="size-3.5 text-primary" />
            Up to {room.maxGuests}
          </li>
        </ul>

        <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Check-in</dt>
            <dd className="text-right font-medium text-foreground">
              {format(stay.checkIn, "EEE, dd MMM yyyy")}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Check-out</dt>
            <dd className="text-right font-medium text-foreground">
              {format(stay.checkOut, "EEE, dd MMM yyyy")}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Length of stay</dt>
            <dd className="text-right font-medium text-foreground">
              {nights} night{nights === 1 ? "" : "s"}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Guests</dt>
            <dd className="text-right font-medium text-foreground">
              {adults} adult{adults === 1 ? "" : "s"}
              {children
                ? `, ${children} ${children === 1 ? "child" : "children"}`
                : ""}
            </dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Room rate</span>
            <span className="font-medium text-foreground">
              {formatPrice(room.basePrice)} / night
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="font-semibold text-foreground">Total payable</span>
            {reservation ? (
              <span className="font-heading text-2xl font-semibold text-foreground">
                {formatPrice(reservation.totalAmount)}
              </span>
            ) : (
              <span className="max-w-40 text-right text-xs leading-5 text-muted-foreground">
                Shown before payment
              </span>
            )}
          </div>
          {!reservation ? (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              The booking service confirms your total before payment.
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

function CheckoutAction({
  reservation,
  isFormValid,
  isCreating,
  isPaying,
  isCheckoutOpen,
  isExpired,
  paymentStatus,
  onPay,
}: {
  reservation: CreatePublicBookingResult | null;
  isFormValid: boolean;
  isCreating: boolean;
  isPaying: boolean;
  isCheckoutOpen: boolean;
  isExpired: boolean;
  paymentStatus: PublicPaymentStatus | null;
  onPay: () => void;
}) {
  if (!reservation) {
    return (
      <Button
        className="h-12 w-full font-semibold"
        disabled={!isFormValid || isCreating}
        form={CHECKOUT_FORM_ID}
        type="submit"
        variant="default"
      >
        {isCreating ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            Holding room
          </>
        ) : (
          <>
            Continue to payment
            <ArrowRight aria-hidden="true" className="size-4" />
          </>
        )}
      </Button>
    );
  }

  const isPaymentComplete = paymentStatus?.paymentStatus === "COMPLETED";
  const isBusy = isPaying || isCheckoutOpen;
  const buttonLabel = isExpired
    ? "Reservation hold expired"
    : isBusy
      ? "Processing payment"
      : isPaymentComplete
        ? "Payment received"
        : paymentStatus?.paymentStatus === "FAILED"
          ? "Retry payment"
          : "Pay Now";

  return (
    <Button
      className="h-12 w-full font-semibold"
      disabled={isExpired || isBusy || isPaymentComplete}
      onClick={onPay}
      type="button"
      variant="default"
    >
      {isBusy ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      ) : (
        <CreditCard aria-hidden="true" className="size-4" />
      )}
      {buttonLabel}
    </Button>
  );
}

function ReservationConfirmation({
  room,
  stay,
  adults,
  children,
  reservation,
  payment,
  guestName,
  guestEmail,
  guestPhone,
}: {
  room: AvailableRoomDetails;
  stay: StayDates;
  adults: number;
  children: number;
  reservation: CreatePublicBookingResult;
  payment: PublicPaymentStatus;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}) {
  return (
    <section
      aria-labelledby="reservation-confirmed-title"
      className="mx-auto max-w-3xl border-y border-border py-10 sm:py-14"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-success text-success-foreground">
        <Check aria-hidden="true" className="size-6" />
      </div>
      <p className="mt-5 text-sm font-medium text-success">Payment confirmed</p>
      <h2
        className="mt-2 font-heading text-3xl font-medium text-foreground sm:text-4xl"
        id="reservation-confirmed-title"
      >
        Your reservation is confirmed
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
        Booking reference {payment.bookingReference}
      </p>

      <dl className="mt-8 grid gap-x-8 border-y border-border sm:grid-cols-2">
        <div className="border-b border-border py-4 sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Room</dt>
          <dd className="mt-1 font-heading text-xl font-medium text-foreground">
            {room.name}
          </dd>
        </div>
        <div className="border-b border-border py-4">
          <dt className="text-xs text-muted-foreground">Check-in</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {format(stay.checkIn, "EEE, dd MMM yyyy")}
          </dd>
        </div>
        <div className="border-b border-border py-4">
          <dt className="text-xs text-muted-foreground">Check-out</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {format(stay.checkOut, "EEE, dd MMM yyyy")}
          </dd>
        </div>
        <div className="border-b border-border py-4">
          <dt className="text-xs text-muted-foreground">Guests</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {adults} adult{adults === 1 ? "" : "s"}
            {children
              ? `, ${children} ${children === 1 ? "child" : "children"}`
              : ""}
          </dd>
        </div>
        <div className="border-b border-border py-4">
          <dt className="text-xs text-muted-foreground">Payment status</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {payment.paymentStatus}
          </dd>
        </div>
        <div className="border-b border-border py-4 sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Lead guest</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {guestName}
          </dd>
          <dd className="text-sm text-muted-foreground">{guestEmail}</dd>
          <dd className="text-sm text-muted-foreground">{guestPhone}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-4 sm:col-span-2">
          <dt className="font-semibold text-foreground">Amount paid</dt>
          <dd className="font-heading text-2xl font-semibold text-foreground">
            {formatPrice(payment.paidAmount || reservation.totalAmount)}
          </dd>
        </div>
      </dl>

      <Button
        className="mt-7 h-12"
        nativeButton={false}
        render={<Link to="/rooms" />}
        variant="outline"
      >
        Explore rooms
        <ArrowRight aria-hidden="true" className="size-4" />
      </Button>
    </section>
  );
}

function CheckoutFlow({
  room,
  stay,
  adults,
  children,
  inventoryRoomId,
  editHref,
  onReservationCreated,
  onPaymentConfirmed,
}: {
  room: AvailableRoomDetails;
  stay: StayDates;
  adults: number;
  children: number;
  inventoryRoomId: string;
  editHref: string;
  onReservationCreated: () => void;
  onPaymentConfirmed: () => void;
}) {
  const schema = createPublicCheckoutSchema(adults, children);
  const form = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companions: Array.from({ length: adults + children - 1 }, () => ({
        fullName: "",
      })),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "companions",
  });
  const createPublicBooking = useCreatePublicBooking();
  const {
    startPayment,
    isPending: isPaymentPending,
    isCheckoutOpen,
  } = useRazorpayPayment();
  const [checkoutToken] = useState(() => globalThis.crypto.randomUUID());
  const [reservation, setReservation] =
    useState<CreatePublicBookingResult | null>(null);
  const [paymentStatus, setPaymentStatus] =
    useState<PublicPaymentStatus | null>(null);
  const [paymentNotice, setPaymentNotice] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [checkoutExpired, setCheckoutExpired] = useState(false);
  const isLocked = Boolean(reservation) || createPublicBooking.isPending;
  const isExpired = checkoutExpired;
  const nights = differenceInCalendarDays(stay.checkOut, stay.checkIn);

  const onCreateReservation = async (data: CheckoutFormData) => {
    setBookingError("");
    const guests: CreatePublicBookingInput["guests"] = [
      {
        fullName: data.fullName,
      },
      ...data.companions.map((guest) => ({
        fullName: guest.fullName,
      })),
    ];
    const request: CreatePublicBookingInput = {
      checkoutToken,
      guestName: data.fullName,
      guestEmail: data.email,
      guestPhone: `+91${data.phone}`,
      roomId: inventoryRoomId,
      checkInDate: stay.checkInDate,
      checkOutDate: stay.checkOutDate,
      adults,
      children,
      guests,
      paymentMethod: "ONLINE",
    };

    try {
      setReservation(await createPublicBooking.mutateAsync(request));
      onReservationCreated();
    } catch (error) {
      setBookingError(getErrorMessage(error));
    }
  };

  const onPaymentStatus = (status: PaymentItem | PublicPaymentStatus) => {
    if ("bookingStatus" in status) {
      setPaymentStatus(status);
      if (
        status.paymentStatus === "COMPLETED" &&
        status.bookingStatus === "CONFIRMED"
      ) {
        onPaymentConfirmed();
      }
    }
  };

  const onPay = () => {
    if (!reservation) return;
    setPaymentNotice("");
    if (
      reservation.checkoutExpiresAt &&
      Date.parse(reservation.checkoutExpiresAt) <= Date.now()
    ) {
      setCheckoutExpired(true);
      return;
    }
    void startPayment(reservation.id, reservation.bookingReference, {
      checkoutToken: reservation.checkoutToken,
      onStatus: onPaymentStatus,
      onCancelled: () =>
        setPaymentNotice("Payment Cancelled. No booking has been confirmed."),
      onFailed: () =>
        setPaymentNotice(
          "Payment Failed. Your payment could not be completed. Please try again."
        ),
      onVerificationFailed: () =>
        setPaymentNotice(
          "Payment Verification Failed. We couldn't verify your payment. Please contact support if money was deducted."
        ),
    });
  };

  const confirmed =
    paymentStatus?.paymentStatus === "COMPLETED" &&
    paymentStatus.bookingStatus === "CONFIRMED";
  const formValues = form.getValues();

  if (confirmed && reservation && paymentStatus) {
    return (
      <ReservationConfirmation
        adults={adults}
        children={children}
        guestEmail={formValues.email}
        guestName={formValues.fullName}
        guestPhone={`+91${formValues.phone}`}
        payment={paymentStatus}
        reservation={reservation}
        room={room}
        stay={stay}
      />
    );
  }

  const isFormValid = form.formState.isValid;
  const isPaymentComplete = paymentStatus?.paymentStatus === "COMPLETED";
  const hasPaymentProblem =
    isExpired ||
    Boolean(paymentNotice) ||
    paymentStatus?.paymentStatus === "FAILED";
  const paymentMessage = isExpired
    ? "This 15-minute reservation hold has expired. Return to availability to choose this room again."
    : paymentNotice ||
      (paymentStatus?.paymentStatus === "FAILED"
        ? "Payment Failed. Your payment could not be completed. Please try again."
        : isPaymentComplete
          ? "Payment has been received. Reservation confirmation is still pending."
          : paymentStatus?.paymentStatus === "PENDING"
            ? "Payment is not confirmed yet. You can retry or wait for the status to update."
            : "Online payment is processed through Razorpay.");

  return (
    <form
      className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.8fr)] lg:gap-7"
      id={CHECKOUT_FORM_ID}
      onSubmit={form.handleSubmit(onCreateReservation)}
    >
      <div className="order-2 min-w-0 space-y-7 lg:order-1">
        <section aria-labelledby="guest-information-title">
          <div className="mb-5">
            <p className="text-sm text-muted-foreground">Reservation contact</p>
            <h2
              className="mt-1 font-heading text-2xl font-medium text-foreground"
              id="guest-information-title"
            >
              Guest Details
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter the details of the person making this reservation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              autoComplete="name"
              className="h-12 rounded-md"
              disabled={isLocked}
              error={form.formState.errors.fullName?.message}
              label="Full name"
              placeholder="As shown on your ID"
              required
              {...form.register("fullName")}
            />
            <InputField
              autoComplete="email"
              className="h-12 rounded-md"
              disabled={isLocked}
              error={form.formState.errors.email?.message}
              label="Email address"
              placeholder="name@example.com"
              required
              type="email"
              {...form.register("email")}
            />
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="guest-phone">Mobile number</Label>
              <div className="flex h-12 items-center border border-input bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-disabled:bg-muted">
                <span
                  aria-hidden="true"
                  className="border-r border-border px-3 text-sm font-medium text-muted-foreground"
                >
                  +91
                </span>
                <Input
                  autoComplete="tel-national"
                  className="h-full rounded-none border-0 bg-transparent px-3 text-sm focus-visible:ring-0"
                  disabled={isLocked}
                  id="guest-phone"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  type="tel"
                  aria-invalid={Boolean(form.formState.errors.phone)}
                  aria-describedby={
                    form.formState.errors.phone
                      ? "guest-phone-error"
                      : undefined
                  }
                  {...form.register("phone")}
                />
              </div>
              {form.formState.errors.phone?.message ? (
                <p className="text-xs text-destructive" id="guest-phone-error">
                  {form.formState.errors.phone.message}
                </p>
              ) : null}
            </div>
          </div>

          {fields.length ? (
            <div className="mt-6 border-t border-border pt-5">
              <div className="mt-5 divide-y divide-border border-y border-border">
                {fields.map((field, index) => {
                  const isAdult = index < adults - 1;
                  const guestNumber = index + 2;
                  const guestErrors = form.formState.errors.companions?.[index];

                  return (
                    <fieldset
                      className="grid gap-4 py-5 sm:grid-cols-2"
                      disabled={isLocked}
                      key={field.id}
                    >
                      <legend className="mb-3 text-sm font-medium text-foreground">
                        {isAdult ? "Adult" : "Child"} guest {guestNumber}
                      </legend>
                      <InputField
                        autoComplete="off"
                        className="h-12 rounded-md"
                        error={guestErrors?.fullName?.message}
                        label="Full name"
                        placeholder="Guest name"
                        required
                        {...form.register(
                          `companions.${index}.fullName` as const
                        )}
                      />
                    </fieldset>
                  );
                })}
              </div>
            </div>
          ) : null}

          {bookingError ? (
            <p
              className="mt-5 border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {bookingError}
            </p>
          ) : null}
        </section>

        <section
          aria-labelledby="your-stay-title"
          className="border-t border-border pt-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Dates and guests</p>
              <h2
                className="mt-1 font-heading text-2xl font-medium text-foreground"
                id="your-stay-title"
              >
                Your Stay
              </h2>
            </div>
            {!reservation ? (
              <Link
                className="inline-flex min-h-10 shrink-0 items-center text-sm font-medium text-foreground underline decoration-primary underline-offset-4 hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                to={editHref}
              >
                Edit
              </Link>
            ) : null}
          </div>
          <dl className="mt-4 grid gap-x-6 border-y border-border sm:grid-cols-2">
            <div className="flex items-center gap-3 border-b border-border py-4">
              <CalendarDays
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              <div>
                <dt className="text-xs text-muted-foreground">Check-in</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {format(stay.checkIn, "EEE, dd MMM yyyy")}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 border-b border-border py-4">
              <CalendarDays
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              <div>
                <dt className="text-xs text-muted-foreground">Check-out</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {format(stay.checkOut, "EEE, dd MMM yyyy")}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 py-4">
              <Users
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              <div>
                <dt className="text-xs text-muted-foreground">Party</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {adults} adult{adults === 1 ? "" : "s"}
                  {children
                    ? `, ${children} ${children === 1 ? "child" : "children"}`
                    : ""}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 py-4">
              <CalendarDays
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              <div>
                <dt className="text-xs text-muted-foreground">
                  Length of stay
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {nights} night{nights === 1 ? "" : "s"}
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="payment-title"
          className="border-t border-border pt-6"
        >
          <p className="text-sm text-muted-foreground">
            Complete your reservation
          </p>
          <h2
            className="mt-1 font-heading text-2xl font-medium text-foreground"
            id="payment-title"
          >
            Choose Payment Method
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Choose how you would like to complete your reservation.
          </p>

          <div className="mt-4 flex items-start gap-3 border-y border-border py-4">
            <span className="grid size-10 shrink-0 place-items-center bg-secondary text-secondary-foreground">
              <CreditCard aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Online payment
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Continue through Razorpay. Cash and pay-at-hotel options are not
                available in this checkout.
              </p>
            </div>
          </div>

          {reservation ? (
            <div
              aria-live="polite"
              className={`mt-4 border-l-2 px-4 py-3 text-sm ${
                hasPaymentProblem
                  ? "border-destructive bg-destructive/5 text-destructive"
                  : paymentStatus?.paymentStatus === "COMPLETED"
                    ? "border-success bg-success/5 text-success"
                    : "border-primary bg-secondary/50 text-foreground"
              }`}
              role={hasPaymentProblem ? "alert" : "status"}
            >
              {paymentMessage}
            </div>
          ) : null}

          <div className="mt-5 hidden lg:block">
            <p className="text-xs leading-5 text-muted-foreground">
              Review your reservation details before proceeding with payment.
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-5 lg:hidden">
            <p className="text-xs text-muted-foreground">Total payable</p>
            <p
              className={`mt-1 text-foreground ${
                reservation
                  ? "font-heading text-2xl font-semibold"
                  : "text-sm font-medium"
              }`}
            >
              {reservation
                ? formatPrice(reservation.totalAmount)
                : "Shown before payment"}
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Review your reservation details before proceeding with payment.
            </p>
            <div className="mt-4">
              <CheckoutAction
                isCheckoutOpen={isCheckoutOpen}
                isCreating={createPublicBooking.isPending}
                isExpired={isExpired}
                isFormValid={isFormValid}
                isPaying={isPaymentPending}
                onPay={onPay}
                paymentStatus={paymentStatus}
                reservation={reservation}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="order-1 min-w-0 lg:sticky lg:top-24 lg:order-2">
        <BookingSummary
          adults={adults}
          children={children}
          reservation={reservation}
          room={room}
          stay={stay}
        />
        <div className="mt-4 hidden lg:block">
          <CheckoutAction
            isCheckoutOpen={isCheckoutOpen}
            isCreating={createPublicBooking.isPending}
            isExpired={isExpired}
            isFormValid={isFormValid}
            isPaying={isPaymentPending}
            onPay={onPay}
            paymentStatus={paymentStatus}
            reservation={reservation}
          />
          <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
            {reservation
              ? "Your total is provided by the booking service."
              : "Review your reservation details before proceeding with payment."}
          </p>
        </div>
      </div>
    </form>
  );
}

function CheckoutSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading checkout"
      className="mt-8 grid gap-7 lg:grid-cols-[1.3fr_0.8fr]"
    >
      <div className="space-y-6">
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export default function BookingCheckoutPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion() ?? false;
  const [currentStep, setCurrentStep] = useState(2);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const stay = getValidStay(searchParams);
  const adults = parseCount(searchParams.get("adults"), 1, 10);
  const children = parseCount(searchParams.get("children"), 0, 10);
  const availabilityParams =
    stay && adults !== null && children !== null
      ? {
          checkInDate: stay.checkInDate,
          checkOutDate: stay.checkOutDate,
          adults,
          children,
        }
      : undefined;
  const {
    room,
    isLoading: isLoadingRoom,
    isError: isRoomError,
    refetch: refetchRoom,
  } = useAvailableRoom(slug ?? null, stay?.checkInDate, stay?.checkOutDate);
  const {
    rooms: availableRooms,
    isLoading: isLoadingAvailability,
    isError: isAvailabilityError,
    refetch: refetchAvailability,
  } = useAvailableBookingRooms(availabilityParams);
  const editHref =
    stay && adults !== null && children !== null
      ? getEditSearchHref(stay, adults, children)
      : "/rooms#availability";

  return (
    <div className="min-w-0 bg-background text-foreground">
      <div className="container mx-auto w-full max-w-295 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <Link className="transition-colors hover:text-foreground" to="/rooms">
            Rooms
          </Link>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <span aria-current="page" className="text-foreground">
            Checkout
          </span>
        </div>

        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
        >
          <h1 className="font-heading text-3xl font-medium text-foreground sm:text-4xl">
            Complete Your Booking
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            Just a few details before your stay with us.
          </p>
          <div className="mt-5">
            <CheckoutProgress
              complete={checkoutComplete}
              currentStep={currentStep}
            />
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <LockKeyhole aria-hidden="true" className="size-4 text-primary" />
            Secure booking · Online payment through Razorpay
          </p>
        </motion.header>

        {!slug ? (
          <CheckoutNotice title="Choose a room to continue">
            Select a room and stay dates before starting checkout.
          </CheckoutNotice>
        ) : !stay || adults === null || children === null ? (
          <CheckoutNotice title="Your stay details are incomplete">
            Return to availability search and choose valid dates and guest
            counts before checkout.
          </CheckoutNotice>
        ) : isLoadingRoom || isLoadingAvailability ? (
          <CheckoutSkeleton />
        ) : isRoomError || !room ? (
          <CheckoutNotice title="Room details are unavailable">
            This room could not be loaded. Return to the room list and choose an
            available room again.
          </CheckoutNotice>
        ) : adults + children > room.maxGuests ? (
          <CheckoutNotice title="This room cannot fit your party" to={editHref}>
            This room accommodates up to {room.maxGuests} guests. Update your
            search to choose a suitable room.
          </CheckoutNotice>
        ) : isAvailabilityError ? (
          <div className="mt-8 border-y border-border py-10" role="alert">
            <h2 className="font-heading text-2xl font-medium text-foreground">
              Availability could not be checked
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Check the dates again before reserving this room.
            </p>
            <Button
              className="mt-5 h-11"
              onClick={() => {
                void refetchAvailability();
                void refetchRoom();
              }}
              variant="outline"
            >
              Try again
            </Button>
          </div>
        ) : (
          (() => {
            const availableRoom = availableRooms.find(
              (candidate) => candidate.roomType.id === room.id
            );
            return availableRoom ? (
              <CheckoutFlow
                adults={adults}
                inventoryRoomId={availableRoom.id}
                children={children}
                editHref={editHref}
                key={`${room.id}:${stay.checkInDate}:${stay.checkOutDate}:${adults}:${children}`}
                onPaymentConfirmed={() => setCheckoutComplete(true)}
                onReservationCreated={() => setCurrentStep(3)}
                room={room}
                stay={stay}
              />
            ) : (
              <CheckoutNotice
                title="This room is no longer available"
                to={editHref}
              >
                The room is not bookable for the selected dates and guest count.
                Return to availability to choose another option.
              </CheckoutNotice>
            );
          })()
        )}
        <footer className="mt-12 flex flex-col gap-2 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nivara Hotels</p>
          <p>Reservation support: contact Nivara Hotels for assistance.</p>
        </footer>
      </div>
    </div>
  );
}
