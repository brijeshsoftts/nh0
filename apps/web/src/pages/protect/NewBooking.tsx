import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleUserRound,
  CreditCard,
  FileCheck2,
  Loader2,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AvailableBookingRoom } from "@/features/bookings/bookings.types";
import { useAvailableBookingRooms } from "@/features/bookings/hooks/useAvailableBookingRooms";
import { useCreateBooking } from "@/features/bookings/hooks/useCreateBooking";
import { CreateCustomerDialog } from "@/features/customers/components/CreateCustomerDialog";
import { SearchCustomer } from "@/features/customers/components/SearchCustomer";
import type { SearchCustomer as CustomerSearchResult } from "@/features/customers/customers.types";

const TOTAL_STEPS = 5;
const stepLabels = [
  { title: "Customer", detail: "Guest account", icon: CircleUserRound },
  { title: "Stay & room", detail: "Dates and room", icon: BedDouble },
  { title: "Guest details", detail: "Guest information", icon: Users },
  { title: "Payment", detail: "Payment method", icon: Wallet },
  { title: "Review", detail: "Confirm booking", icon: FileCheck2 },
];

const defaultGuest = () => ({
  fullName: "",
  age: 30,
  gender: "MALE" as const,
  idProofNumber: "",
});

const buildPrimaryGuest = (customer?: CustomerSearchResult | null) => ({
  fullName: customer?.fullName ?? "",
  age: 30,
  gender: "MALE" as const,
  idProofNumber: "",
});

type BookingFormState = {
  customerId: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  roomId: string;
  guests: Array<{
    fullName: string;
    age: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    idProofNumber?: string;
  }>;
  specialRequest?: string;
  paymentMethod: "CASH" | "ONLINE";
};

const initialBookingState: BookingFormState = {
  customerId: "",
  checkInDate: "",
  checkOutDate: "",
  adults: 2,
  children: 1,
  roomId: "",
  guests: [],
  specialRequest: "",
  paymentMethod: "CASH",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getNights(checkInDate: string, checkOutDate: string) {
  if (!checkInDate || !checkOutDate) return 0;
  const diffMs =
    new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
  return diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 space-y-1.5">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-medium text-foreground">{children}</span>
  );
}

export default function NewBookingPage() {
  const [step, setStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerSearchResult | null>(null);
  const [booking, setBooking] = useState<BookingFormState>(initialBookingState);
  const [roomSearch, setRoomSearch] = useState<{
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
  } | null>(null);

  const { mutate: createBooking, isPending: isCreatingBooking } =
    useCreateBooking();
  const { rooms, isLoading: isLoadingRooms } = useAvailableBookingRooms(
    roomSearch ?? undefined
  );

  const totalGuests = booking.adults + booking.children;
  const nights = getNights(booking.checkInDate, booking.checkOutDate);
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === booking.roomId) ?? null,
    [booking.roomId, rooms]
  );
  const roomPrice = selectedRoom?.roomType.basePrice ?? 0;
  const subtotal = roomPrice * nights;
  const taxAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + taxAmount;

  const canGoNext =
    step === 1
      ? Boolean(booking.customerId)
      : step === 2
        ? Boolean(booking.roomId && roomSearch)
        : step === 3
          ? booking.guests.length === totalGuests &&
            booking.guests.every(
              (guest) => guest.fullName.trim() && guest.age > 0 && guest.gender
            )
          : step === 4
            ? Boolean(booking.paymentMethod)
            : true;

  const goToNextStep = () => {
    if (!canGoNext) return;
    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  };

  const goToPreviousStep = () => setStep((current) => Math.max(current - 1, 1));

  const handleCustomerChange = (customer: CustomerSearchResult) => {
    setSelectedCustomer(customer);
    setBooking((current) => {
      const primaryGuest = buildPrimaryGuest(customer);
      const guests = current.guests.length
        ? [
            {
              ...current.guests[0],
              fullName:
                current.guests[0]?.fullName?.trim() || primaryGuest.fullName,
              age: current.guests[0]?.age || primaryGuest.age,
              gender: current.guests[0]?.gender || primaryGuest.gender,
              idProofNumber:
                current.guests[0]?.idProofNumber || primaryGuest.idProofNumber,
            },
            ...current.guests.slice(1),
          ]
        : [primaryGuest];
      return { ...current, customerId: customer.id, guests };
    });
  };

  const addGuest = () => {
    setBooking((current) => {
      if (
        current.guests.length >= Math.max(1, current.adults + current.children)
      ) {
        return current;
      }
      return { ...current, guests: [...current.guests, defaultGuest()] };
    });
  };

  const handleRoomSearch = () => {
    if (!booking.checkInDate || !booking.checkOutDate) {
      window.alert("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(booking.checkOutDate) <= new Date(booking.checkInDate)) {
      window.alert("Check-out date must be after the check-in date.");
      return;
    }
    setBooking((current) => ({ ...current, roomId: "" }));
    setRoomSearch({
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      adults: booking.adults,
      children: booking.children,
    });
  };

  const handleGuestChange = (
    index: number,
    field: keyof BookingFormState["guests"][number],
    value: string | number
  ) => {
    setBooking((current) => ({
      ...current,
      guests: current.guests.map((guest, guestIndex) =>
        guestIndex === index ? { ...guest, [field]: value } : guest
      ),
    }));
  };

  const handleCreateBooking = () => {
    if (!booking.customerId || !booking.roomId) {
      window.alert(
        "Please select a customer and room before confirming the booking."
      );
      return;
    }
    if (booking.guests.length !== totalGuests) {
      window.alert(
        "Guest count must match the requested adults + children count."
      );
      return;
    }
    if (
      booking.guests.some(
        (guest) => !guest.fullName.trim() || guest.age <= 0 || !guest.gender
      )
    ) {
      window.alert(
        "Please complete every guest detail before confirming the booking."
      );
      return;
    }
    createBooking(
      {
        customerId: booking.customerId,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        adults: booking.adults,
        children: booking.children,
        roomId: booking.roomId,
        guests: booking.guests.map((guest) => ({
          fullName: guest.fullName.trim(),
          age: guest.age,
          gender: guest.gender,
          idProofNumber: guest.idProofNumber?.trim() || undefined,
        })),
        specialRequest: booking.specialRequest?.trim() || undefined,
        paymentMethod: booking.paymentMethod,
      },
      { onSuccess: () => setStep(TOTAL_STEPS) }
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Step 01 · Customer"
              title="Who is this booking for?"
              description="Find an existing customer or create a new customer profile before arranging their stay."
            />
            <div className="rounded-2xl rounded-none border bg-muted/20 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <CircleUserRound className="h-4 w-4 text-primary" />
                <FieldLabel>Search customer</FieldLabel>
              </div>
              <SearchCustomer
                value={selectedCustomer}
                onChange={handleCustomerChange}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Search by customer name or contact details.
              </p>
            </div>
            {selectedCustomer ? (
              <div className="relative overflow-hidden rounded-2xl rounded-none border border-primary/25 bg-primary/[0.045] p-5">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/[0.06]" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none rounded-xl bg-primary/10 text-primary">
                    <CircleUserRound className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">
                        {selectedCustomer.fullName}
                      </h3>
                      <Badge className="gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Selected
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedCustomer.email || "No email provided"}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {selectedCustomer.phone || "No phone provided"}
                    </p>
                  </div>
                  <CheckCircle2 className="hidden h-5 w-5 text-primary sm:block" />
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-none rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Choose a customer to prefill the primary guest details in the
                  next step.
                </p>
              </div>
            )}
            <div className="flex flex-col justify-between gap-3 rounded-2xl rounded-none border p-4 sm:flex-row sm:items-center sm:px-5">
              <div>
                <p className="font-medium">New to Nivara?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create a customer profile to continue.
                </p>
              </div>
              <CreateCustomerDialog>
                <Button type="button" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" /> Create customer
                </Button>
              </CreateCustomerDialog>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Step 02 · Stay & room"
              title="Plan the guest's stay"
              description="Choose the dates and occupancy first, then search rooms available for the complete stay."
            />
            <div className="rounded-2xl rounded-none border p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Stay details</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2">
                  <FieldLabel>Check-in date</FieldLabel>
                  <Input
                    type="date"
                    value={booking.checkInDate}
                    onChange={(event) => {
                      setRoomSearch(null);
                      setBooking((current) => ({
                        ...current,
                        checkInDate: event.target.value,
                        roomId: "",
                      }));
                    }}
                  />
                </label>
                <label className="space-y-2">
                  <FieldLabel>Check-out date</FieldLabel>
                  <Input
                    type="date"
                    min={booking.checkInDate || undefined}
                    value={booking.checkOutDate}
                    onChange={(event) => {
                      setRoomSearch(null);
                      setBooking((current) => ({
                        ...current,
                        checkOutDate: event.target.value,
                        roomId: "",
                      }));
                    }}
                  />
                </label>
                <label className="space-y-2">
                  <FieldLabel>Adults</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={booking.adults}
                    onChange={(event) => {
                      const adults = Math.max(
                        1,
                        Number(event.target.value || 1)
                      );
                      setRoomSearch(null);
                      setBooking((current) => ({
                        ...current,
                        adults,
                        guests: current.guests.slice(
                          0,
                          Math.max(1, adults + current.children)
                        ),
                        roomId: "",
                      }));
                    }}
                  />
                </label>
                <label className="space-y-2">
                  <FieldLabel>Children</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    max={20}
                    value={booking.children}
                    onChange={(event) => {
                      const children = Math.max(
                        0,
                        Number(event.target.value || 0)
                      );
                      setRoomSearch(null);
                      setBooking((current) => ({
                        ...current,
                        children,
                        guests: current.guests.slice(
                          0,
                          Math.max(1, current.adults + children)
                        ),
                        roomId: "",
                      }));
                    }}
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-col gap-3 rounded-none rounded-xl bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-none rounded-xl bg-background">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{totalGuests} guests</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.adults} adults · {booking.children} children ·{" "}
                      {nights} {nights === 1 ? "night" : "nights"}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleRoomSearch}
                  className="gap-2"
                >
                  <CalendarDays className="h-4 w-4" /> Search available rooms
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                    Room inventory
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Choose your room
                  </h3>
                </div>
                {roomSearch && (
                  <Badge variant="secondary">
                    {rooms.length} {rooms.length === 1 ? "option" : "options"}{" "}
                    found
                  </Badge>
                )}
              </div>
              {!roomSearch ? (
                <div className="rounded-2xl rounded-none border border-dashed px-5 py-10 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl rounded-none bg-muted">
                    <BedDouble className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="font-medium">
                    Your room options will appear here
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select your dates and search availability to get started.
                  </p>
                </div>
              ) : isLoadingRooms ? (
                <div className="flex items-center justify-center gap-3 rounded-2xl rounded-none border p-10 text-sm text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />{" "}
                  Checking room availability…
                </div>
              ) : rooms.length === 0 ? (
                <div className="rounded-2xl rounded-none border border-dashed px-5 py-10 text-center">
                  <BedDouble className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
                  <p className="font-medium">
                    No rooms available for these dates
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try different dates or adjust the guest count.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {rooms.map((room: AvailableBookingRoom) => {
                    const isSelected = booking.roomId === room.id;
                    return (
                      <Card
                        key={room.id}
                        className={`group overflow-hidden rounded-2xl rounded-none p-0 transition-all duration-200 ${isSelected ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40 hover:shadow-md"}`}
                      >
                        <div className="relative h-44 overflow-hidden bg-muted sm:h-48">
                          {room.roomType.image?.url ? (
                            <img
                              src={room.roomType.image.url}
                              alt={
                                room.roomType.image.altText ??
                                room.roomType.name
                              }
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                              <BedDouble className="h-10 w-10 text-muted-foreground/50" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                          <div className="absolute right-4 bottom-3 left-4 flex items-end justify-between gap-3 text-white">
                            <div>
                              <p className="text-xs font-medium tracking-[0.16em] text-white/80 uppercase">
                                Room {room.roomNumber}
                              </p>
                              <p className="mt-1 text-lg font-semibold">
                                {room.roomType.name}
                              </p>
                            </div>
                            {isSelected && (
                              <Badge className="border-white/20 bg-white text-primary">
                                <Check className="mr-1 h-3 w-3" /> Selected
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4 p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">
                                Up to {room.roomType.maxGuests} guests
                              </Badge>
                              <Badge variant="secondary">
                                {room.roomType.bedCount}{" "}
                                {room.roomType.bedCount === 1 ? "bed" : "beds"}
                              </Badge>
                              {room.roomType.sizeSqFt ? (
                                <Badge variant="secondary">
                                  {room.roomType.sizeSqFt} sq ft
                                </Badge>
                              ) : null}
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-lg font-semibold tracking-tight">
                                {formatCurrency(room.roomType.basePrice)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                per night
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {room.roomType.amenities
                              .slice(0, 4)
                              .map((amenity) => (
                                <span
                                  key={amenity.id}
                                  className="rounded-full rounded-none border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                                >
                                  {amenity.name}
                                </span>
                              ))}
                          </div>
                          <div className="flex items-center justify-between gap-3 border-t pt-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {nights} {nights === 1 ? "night" : "nights"} ·
                                before GST
                              </p>
                              <p className="font-semibold">
                                {formatCurrency(
                                  room.roomType.basePrice * nights
                                )}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              className="min-w-28 gap-2"
                              onClick={() =>
                                setBooking((current) => ({
                                  ...current,
                                  roomId: room.id,
                                }))
                              }
                            >
                              {isSelected ? (
                                <>
                                  <Check className="h-4 w-4" /> Selected
                                </>
                              ) : (
                                "Choose room"
                              )}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
            {selectedRoom && (
              <div className="flex flex-col gap-3 rounded-2xl rounded-none border border-primary/25 bg-primary/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-none rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Room selected</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRoom.roomType.name} · Room{" "}
                      {selectedRoom.roomNumber}
                    </p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-muted-foreground">Room subtotal</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(subtotal)}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Step 03 · Guest details"
              title="Who will be staying?"
              description="Enter the details for every adult and child included in this reservation. The primary guest is prefilled from the customer profile where possible."
            />
            <div className="flex items-center justify-between gap-3 rounded-none rounded-xl bg-muted/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-none rounded-xl bg-background">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Guest information</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.guests.length} of {totalGuests} guest profiles
                    completed
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  booking.guests.length === totalGuests
                    ? "default"
                    : "secondary"
                }
              >
                {booking.guests.length}/{totalGuests}
              </Badge>
            </div>
            <div className="space-y-4">
              {booking.guests.map((guest, index) => (
                <div
                  key={`${index}-${guest.fullName || "guest"}`}
                  className="overflow-hidden rounded-2xl rounded-none border"
                >
                  <div className="flex items-center justify-between gap-3 border-b bg-muted/25 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-none rounded-xl border bg-background text-sm font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="font-semibold">
                          {index === 0 ? "Primary guest" : `Guest ${index + 1}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {index < booking.adults
                            ? "Adult guest"
                            : "Child guest"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {index < booking.adults ? "Adult" : "Child"}
                    </Badge>
                  </div>
                  <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                    <label className="space-y-2">
                      <FieldLabel>
                        Full name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        value={guest.fullName}
                        placeholder={
                          index === 0
                            ? selectedCustomer?.fullName || "Enter full name"
                            : "Enter full name"
                        }
                        onChange={(event) =>
                          handleGuestChange(
                            index,
                            "fullName",
                            event.target.value
                          )
                        }
                      />
                    </label>
                    <label className="space-y-2">
                      <FieldLabel>
                        Age <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        type="number"
                        min={1}
                        value={guest.age}
                        onChange={(event) =>
                          handleGuestChange(
                            index,
                            "age",
                            Math.max(1, Number(event.target.value || 1))
                          )
                        }
                      />
                    </label>
                    <label className="space-y-2">
                      <FieldLabel>Gender</FieldLabel>
                      <select
                        className="h-10 w-full rounded-md rounded-none border border-input bg-background px-3 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={guest.gender}
                        onChange={(event) =>
                          handleGuestChange(
                            index,
                            "gender",
                            event.target.value as "MALE" | "FEMALE" | "OTHER"
                          )
                        }
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </label>
                    <label className="space-y-2">
                      <FieldLabel>
                        ID proof number{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </FieldLabel>
                      <Input
                        value={guest.idProofNumber ?? ""}
                        placeholder="Enter ID proof number"
                        onChange={(event) =>
                          handleGuestChange(
                            index,
                            "idProofNumber",
                            event.target.value
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {booking.guests.length < totalGuests && (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={addGuest}
              >
                <Plus className="h-4 w-4" /> Add guest details
              </Button>
            )}
            <label className="block space-y-2">
              <FieldLabel>
                Special requests{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <textarea
                rows={4}
                maxLength={1000}
                placeholder="Early check-in, accessibility needs, or other preferences…"
                className="w-full resize-y rounded-none rounded-xl border border-input bg-background px-3.5 py-3 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                value={booking.specialRequest ?? ""}
                onChange={(event) =>
                  setBooking((current) => ({
                    ...current,
                    specialRequest: event.target.value,
                  }))
                }
              />
              <p className="text-right text-xs text-muted-foreground">
                {(booking.specialRequest ?? "").length}/1000
              </p>
            </label>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Step 04 · Payment"
              title="Review the charges and payment method"
              description="Check the stay summary and choose how the payment will be recorded for this booking."
            />
            <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-4">
                <div className="rounded-2xl rounded-none border p-4 sm:p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Stay summary</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        Customer
                      </p>
                      <p className="mt-1 font-medium">
                        {selectedCustomer?.fullName ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        Occupancy
                      </p>
                      <p className="mt-1 font-medium">
                        {booking.adults} adults · {booking.children} children
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        Check-in
                      </p>
                      <p className="mt-1 font-medium">
                        {booking.checkInDate || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        Check-out
                      </p>
                      <p className="mt-1 font-medium">
                        {booking.checkOutDate || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-none rounded-xl bg-muted/40 p-3">
                    <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg rounded-none bg-muted">
                      {selectedRoom?.roomType.image?.url ? (
                        <img
                          src={selectedRoom.roomType.image.url}
                          alt={
                            selectedRoom.roomType.image.altText ??
                            selectedRoom.roomType.name
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BedDouble className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {selectedRoom?.roomType.name ?? "No room selected"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Room {selectedRoom?.roomNumber ?? "—"} · {nights}{" "}
                        {nights === 1 ? "night" : "nights"}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">
                      {formatCurrency(subtotal)}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <h3 className="font-semibold">Payment method</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select the method to associate with this booking.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setBooking((current) => ({
                          ...current,
                          paymentMethod: "CASH",
                        }))
                      }
                      className={`flex items-start gap-3 rounded-2xl rounded-none border p-4 text-left transition-all ${booking.paymentMethod === "CASH" ? "border-primary bg-primary/[0.045] ring-2 ring-primary/15" : "hover:border-primary/40"}`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none rounded-xl ${booking.paymentMethod === "CASH" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      >
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">Cash payment</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Collect cash after the reservation is created.
                        </p>
                      </div>
                      {booking.paymentMethod === "CASH" && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBooking((current) => ({
                          ...current,
                          paymentMethod: "ONLINE",
                        }))
                      }
                      className={`flex items-start gap-3 rounded-2xl rounded-none border p-4 text-left transition-all ${booking.paymentMethod === "ONLINE" ? "border-primary bg-primary/[0.045] ring-2 ring-primary/15" : "hover:border-primary/40"}`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none rounded-xl ${booking.paymentMethod === "ONLINE" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      >
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">Online payment</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Use the configured online payment flow.
                        </p>
                      </div>
                      {booking.paymentMethod === "ONLINE" && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selecting a method here does not, by itself, verify that a
                    payment has been received.
                  </p>
                </div>
              </div>
              <div className="h-fit overflow-hidden rounded-2xl rounded-none border bg-card">
                <div className="border-b bg-muted/25 p-5">
                  <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                    Price breakdown
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">Booking total</h3>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      Room ({nights} {nights === 1 ? "night" : "nights"})
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-end justify-between gap-3">
                      <span className="font-semibold">Grand total</span>
                      <span className="text-2xl font-semibold tracking-tight tabular-nums">
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>
                    <p className="mt-1 text-right text-xs text-muted-foreground">
                      Inclusive of calculated GST
                    </p>
                  </div>
                  <div className="rounded-none rounded-xl bg-muted/40 p-3 text-xs leading-5 text-muted-foreground">
                    <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
                    Confirm the final amount before completing the reservation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-2xl rounded-none border border-primary/25 bg-primary/[0.045] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl rounded-none bg-primary/10 text-primary">
                  <FileCheck2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                    Final step
                  </p>
                  <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                    Review booking details
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                    Make sure the customer, stay dates, guest details and amount
                    are correct. You can go back to any previous step to make
                    changes.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <div className="space-y-4">
                <div className="rounded-2xl rounded-none border p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Reservation details</h3>
                    <Badge variant="outline">Draft review</Badge>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-none rounded-xl bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p className="mt-1 font-semibold">
                        {selectedCustomer?.fullName ?? "—"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selectedCustomer?.phone ??
                          selectedCustomer?.email ??
                          "Contact not provided"}
                      </p>
                    </div>
                    <div className="rounded-none rounded-xl bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">
                        Stay duration
                      </p>
                      <p className="mt-1 font-semibold">
                        {nights} {nights === 1 ? "night" : "nights"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {booking.checkInDate || "—"} →{" "}
                        {booking.checkOutDate || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-none rounded-xl border p-3">
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg rounded-none bg-muted">
                      {selectedRoom?.roomType.image?.url ? (
                        <img
                          src={selectedRoom.roomType.image.url}
                          alt={
                            selectedRoom.roomType.image.altText ??
                            selectedRoom.roomType.name
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BedDouble className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">
                        {selectedRoom?.roomType.name ?? "Room not selected"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Room {selectedRoom?.roomNumber ?? "—"} ·{" "}
                        {selectedRoom?.roomType.bedType ??
                          "Bed type not specified"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {booking.adults} adults · {booking.children} children
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="rounded-2xl rounded-none border p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Guest list</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(3)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {booking.guests.map((guest, index) => (
                      <div
                        key={`${index}-${guest.fullName || "guest"}`}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full rounded-none bg-muted text-xs font-semibold">
                          {guest.fullName
                            .trim()
                            .split(/\s+/)
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || String(index + 1)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {guest.fullName || "Name not provided"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {index < booking.adults ? "Adult" : "Child"} · Age{" "}
                            {guest.age}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {guest.gender.toLowerCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  {booking.specialRequest && (
                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        Special request
                      </p>
                      <p className="mt-1 text-sm whitespace-pre-wrap">
                        {booking.specialRequest}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <aside className="h-fit overflow-hidden rounded-2xl rounded-none border">
                <div className="bg-foreground p-5 text-background">
                  <div className="flex items-center gap-2 text-background/70">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold tracking-[0.16em] uppercase">
                      Booking summary
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-background/70">
                    Total payable
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight">
                    {formatCurrency(grandTotal)}
                  </p>
                  <p className="mt-2 text-xs text-background/70">
                    {nights} {nights === 1 ? "night" : "nights"} · {totalGuests}{" "}
                    guests
                  </p>
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Room subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">
                      {formatCurrency(taxAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3 border-t pt-3 text-sm">
                    <span className="text-muted-foreground">
                      Payment method
                    </span>
                    <span className="font-medium">
                      {booking.paymentMethod === "CASH" ? "Cash" : "Online"}
                    </span>
                  </div>
                  <div className="rounded-none rounded-xl bg-muted/40 p-3 text-xs leading-5 text-muted-foreground">
                    <MapPin className="mr-1 inline h-3.5 w-3.5" />
                    Room assignment and payment status follow the configured
                    booking workflow.
                  </div>
                </div>
              </aside>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-8">
      <header className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl rounded-none bg-primary/10 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Create a booking
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                A guided workflow for a seamless guest reservation.
              </p>
            </div>
          </div>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 rounded-full rounded-none px-3 py-1.5 text-xs"
        >
          <span className="h-1.5 w-1.5 rounded-full rounded-none bg-primary" />
          Step {step} of {TOTAL_STEPS}
        </Badge>
      </header>

      <nav
        aria-label="Booking progress"
        className="rounded-2xl rounded-none border bg-card p-3 sm:p-4"
      >
        <div className="mb-4 flex items-center justify-between gap-3 px-1">
          <p className="text-sm font-semibold">Reservation progress</p>
          <p className="text-xs text-muted-foreground">
            {Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)}% complete
          </p>
        </div>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full rounded-none bg-muted">
          <div
            className="h-full rounded-full rounded-none bg-primary transition-all duration-300"
            style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-5 gap-1 sm:gap-3">
          {stepLabels.map((item, index) => {
            const number = index + 1;
            const active = number === step;
            const complete = number < step;
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  if (number < step) setStep(number);
                }}
                disabled={number >= step}
                aria-current={active ? "step" : undefined}
                className={`group flex min-w-0 flex-col items-center gap-2 rounded-none rounded-xl px-1 py-2 text-center transition-colors sm:flex-row sm:gap-3 sm:px-3 sm:text-left ${active ? "bg-primary/[0.07]" : ""} ${number < step ? "cursor-pointer hover:bg-muted/70" : "cursor-default"}`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-none rounded-xl border transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : complete ? "border-primary/20 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}
                >
                  {complete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate text-[11px] font-semibold sm:text-sm ${active ? "text-foreground" : complete ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {item.title}
                  </span>
                  <span className="hidden text-xs text-muted-foreground lg:block">
                    {item.detail}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="min-w-0 rounded-2xl rounded-none border bg-card p-4 shadow-sm sm:p-6 lg:p-7">
          {renderStepContent()}
          <div className="mt-8 flex items-center justify-between gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={goToPreviousStep}
              disabled={step === 1 || isCreatingBooking}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  className="gap-2"
                  onClick={goToNextStep}
                  disabled={!canGoNext || isCreatingBooking}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="gap-2"
                  onClick={handleCreateBooking}
                  disabled={isCreatingBooking || !canGoNext}
                >
                  {isCreatingBooking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {isCreatingBooking ? "Creating booking…" : "Create booking"}
                </Button>
              )}
            </div>
          </div>
        </Card>
        <aside className="hidden space-y-4 xl:block">
          <div className="rounded-2xl rounded-none border bg-card p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Booking checklist</p>
            </div>
            <div className="mt-4 space-y-4">
              {[
                {
                  label: "Customer selected",
                  done: Boolean(booking.customerId),
                },
                {
                  label: "Stay and room chosen",
                  done: Boolean(
                    booking.checkInDate &&
                    booking.checkOutDate &&
                    booking.roomId &&
                    roomSearch
                  ),
                },
                {
                  label: "Guest details complete",
                  done:
                    booking.guests.length === totalGuests &&
                    booking.guests.every(
                      (guest) => guest.fullName.trim() && guest.age > 0
                    ),
                },
                {
                  label: "Payment method selected",
                  done: Boolean(booking.paymentMethod),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full rounded-none ${item.done ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                  >
                    {item.done ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full rounded-none bg-current" />
                    )}
                  </span>
                  <span
                    className={`text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl rounded-none border bg-muted/25 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-none rounded-xl bg-background text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="mt-3 text-sm font-semibold">Nivara standard</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Double-check guest names and stay dates before confirming.
              Accurate details help ensure a smooth check-in.
            </p>
          </div>
          {step >= 2 && (
            <div className="rounded-2xl rounded-none border p-5">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Current estimate
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                {formatCurrency(grandTotal)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {nights} {nights === 1 ? "night" : "nights"} · including
                estimated GST
              </p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
