import { ArrowLeft, ArrowRight, Check, Loader2, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AvailableBookingRoom } from "@/features/bookings/bookings.types";
import { useAvailableBookingRooms } from "@/features/bookings/hooks/useAvailableBookingRooms";
import { useCreateBooking } from "@/features/bookings/hooks/useCreateBooking";
import { SearchCustomer } from "@/features/customers/components/SearchCustomer";
import type { SearchCustomer as CustomerSearchResult } from "@/features/customers/customers.types";

const TOTAL_STEPS = 5;
const stepLabels = [
  "Customer",
  "Stay & Room",
  "Guest Information",
  "Payment",
  "Review & Confirm",
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
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
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
        ? Boolean(booking.roomId)
        : step === 3
          ? Boolean(
              booking.guests.length >= 1 &&
              booking.guests[0]?.fullName.trim() &&
              booking.guests[0]?.age > 0 &&
              booking.guests[0]?.gender
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

      return {
        ...current,
        guests: [...current.guests, defaultGuest()],
      };
    });
  };

  const handleRoomSearch = () => {
    if (!booking.checkInDate || !booking.checkOutDate) return;
    if (new Date(booking.checkOutDate) <= new Date(booking.checkInDate)) {
      window.alert("Check-out date must be after the check-in date.");
      return;
    }

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
      {
        onSuccess: () => {
          setStep(TOTAL_STEPS);
        },
      }
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search customer</label>
              <SearchCustomer
                value={selectedCustomer}
                onChange={handleCustomerChange}
              />
            </div>

            {selectedCustomer && (
              <Card className="border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{selectedCustomer.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCustomer.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCustomer.phone}
                    </p>
                  </div>
                  <Badge variant="secondary">Selected</Badge>
                </div>
              </Card>
            )}

            <Button type="button" variant="outline" className="w-full">
              Create Customer
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="space-y-2 text-sm font-medium">
                <span>Check-in</span>
                <Input
                  type="date"
                  value={booking.checkInDate}
                  onChange={(event) =>
                    setBooking((current) => ({
                      ...current,
                      checkInDate: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                <span>Check-out</span>
                <Input
                  type="date"
                  value={booking.checkOutDate}
                  onChange={(event) =>
                    setBooking((current) => ({
                      ...current,
                      checkOutDate: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                <span>Adults</span>
                <Input
                  type="number"
                  min={1}
                  value={booking.adults}
                  onChange={(event) => {
                    const nextAdults = Number(event.target.value || 1);

                    setBooking((current) => ({
                      ...current,
                      adults: nextAdults,
                      guests:
                        current.guests.length >
                        Math.max(1, nextAdults + current.children)
                          ? current.guests.slice(
                              0,
                              Math.max(1, nextAdults + current.children)
                            )
                          : current.guests,
                    }));
                  }}
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                <span>Children</span>
                <Input
                  type="number"
                  min={0}
                  value={booking.children}
                  onChange={(event) => {
                    const nextChildren = Number(event.target.value || 0);

                    setBooking((current) => ({
                      ...current,
                      children: nextChildren,
                      guests:
                        current.guests.length >
                        Math.max(1, current.adults + nextChildren)
                          ? current.guests.slice(
                              0,
                              Math.max(1, current.adults + nextChildren)
                            )
                          : current.guests,
                    }));
                  }}
                />
              </label>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 p-3 text-sm">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Total guests: {totalGuests}
              </span>
              <Button type="button" onClick={handleRoomSearch}>
                Search Available Rooms
              </Button>
            </div>

            <div className="space-y-3">
              {isLoadingRooms ? (
                <div className="flex items-center justify-center gap-2 rounded-lg border p-8 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading available rooms...
                </div>
              ) : rooms.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  No rooms are available for the selected stay.
                </div>
              ) : (
                rooms.map((room: AvailableBookingRoom) => (
                  <Card
                    key={room.id}
                    className={`overflow-hidden p-0 ${booking.roomId === room.id ? "border-primary ring-1 ring-primary/50" : ""}`}
                  >
                    <div className="flex flex-col gap-4 p-4 md:flex-row">
                      <div className="h-28 w-full overflow-hidden rounded-lg bg-muted md:w-40">
                        {room.roomType.image?.url ? (
                          <img
                            src={room.roomType.image.url}
                            alt={
                              room.roomType.image.altText ?? room.roomType.name
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            Room image
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="text-lg font-semibold">
                              Room {room.roomNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {room.roomType.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-primary">
                              {formatCurrency(room.roomType.basePrice)}/night
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {nights} nights
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary">
                            Capacity {room.roomType.maxGuests}
                          </Badge>
                          <Badge variant="secondary">
                            {room.roomType.bedType}
                          </Badge>
                          <Badge variant="secondary">
                            {room.roomType.bedCount} bed(s)
                          </Badge>
                          <Badge variant="secondary">
                            {room.roomType.sizeSqFt ?? "-"} sq ft
                          </Badge>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {room.roomType.amenities
                            .slice(0, 4)
                            .map((amenity) => (
                              <span
                                key={amenity.id}
                                className="rounded-full border px-2 py-1 text-xs"
                              >
                                {amenity.name}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <Button
                          type="button"
                          onClick={() =>
                            setBooking((current) => ({
                              ...current,
                              roomId: room.id,
                            }))
                          }
                        >
                          {booking.roomId === room.id
                            ? "Selected"
                            : "Select Room"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {selectedRoom && (
              <Card className="border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">Selected room</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRoom.roomType.name} · Room{" "}
                      {selectedRoom.roomNumber}
                    </p>
                  </div>
                  <p className="font-semibold">{formatCurrency(subtotal)}</p>
                </div>
              </Card>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {booking.guests.map((guest, index) => (
              <Card
                key={`${index}-${guest.fullName || "guest"}`}
                className="p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium">
                    {index === 0 ? "Primary guest" : `Guest ${index + 1}`}
                  </p>
                  <Badge variant="secondary">
                    {index < booking.adults ? "Adult" : "Child"}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium">
                    <span>Full name</span>
                    <Input
                      value={guest.fullName}
                      placeholder={
                        index === 0
                          ? selectedCustomer?.fullName || "Full name"
                          : "Full name"
                      }
                      onChange={(event) =>
                        handleGuestChange(index, "fullName", event.target.value)
                      }
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium">
                    <span>Age</span>
                    <Input
                      type="number"
                      min={1}
                      value={guest.age}
                      onChange={(event) =>
                        handleGuestChange(
                          index,
                          "age",
                          Number(event.target.value || 1)
                        )
                      }
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium">
                    <span>Gender</span>
                    <select
                      className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                      value={guest.gender}
                      onChange={(event) =>
                        handleGuestChange(index, "gender", event.target.value)
                      }
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </label>

                  <label className="space-y-2 text-sm font-medium">
                    <span>ID proof number</span>
                    <Input
                      value={guest.idProofNumber ?? ""}
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
              </Card>
            ))}

            {booking.guests.length < Math.max(1, totalGuests) && (
              <Button type="button" variant="outline" onClick={addGuest}>
                Add guest
              </Button>
            )}

            <label className="block space-y-2 text-sm font-medium">
              <span>Special request</span>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none"
                value={booking.specialRequest ?? ""}
                onChange={(event) =>
                  setBooking((current) => ({
                    ...current,
                    specialRequest: event.target.value,
                  }))
                }
              />
            </label>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Booking summary</p>
              <Card className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">
                      {selectedCustomer?.fullName ?? "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stay</p>
                    <p className="font-medium">
                      {booking.checkInDate} → {booking.checkOutDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {nights} nights · {booking.adults} adults ·{" "}
                      {booking.children} children
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room</p>
                    <p className="font-medium">
                      {selectedRoom?.roomType.name ?? "-"} · Room{" "}
                      {selectedRoom?.roomNumber ?? "-"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Button
                type="button"
                variant={
                  booking.paymentMethod === "CASH" ? "default" : "outline"
                }
                onClick={() =>
                  setBooking((current) => ({
                    ...current,
                    paymentMethod: "CASH",
                  }))
                }
              >
                Record Cash Payment
              </Button>
              <Button
                type="button"
                variant={
                  booking.paymentMethod === "ONLINE" ? "default" : "outline"
                }
                onClick={() =>
                  setBooking((current) => ({
                    ...current,
                    paymentMethod: "ONLINE",
                  }))
                }
              >
                Pay {formatCurrency(grandTotal)}
              </Button>
            </div>

            <Card className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Room total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="mt-2 border-t pt-2 text-base font-semibold">
                  <div className="flex justify-between">
                    <span>Grand Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedCustomer?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stay</p>
                  <p className="font-medium">
                    {booking.checkInDate} → {booking.checkOutDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">
                    {booking.guests.map((guest) => guest.fullName).join(", ") ||
                      "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-medium">
                    {selectedRoom?.roomType.name} · Room{" "}
                    {selectedRoom?.roomNumber}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Pricing</p>
                  <p className="font-medium">
                    {formatCurrency(subtotal)} + GST {formatCurrency(taxAmount)}{" "}
                    = {formatCurrency(grandTotal)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Payment method
                  </p>
                  <p className="font-medium">{booking.paymentMethod}</p>
                </div>
                {booking.specialRequest && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Special request
                    </p>
                    <p className="font-medium">{booking.specialRequest}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Bookings</p>
          <h1 className="text-2xl font-semibold">New Booking</h1>
        </div>
        <Badge variant="secondary">
          Step {step} of {TOTAL_STEPS}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {stepLabels.map((label, index) => (
          <div
            key={label}
            className={`rounded-lg border p-3 text-sm ${index + 1 === step ? "border-primary bg-primary/5" : "bg-muted/20"}`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      <Card className="p-5">{renderStepContent()}</Card>

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={step === 1}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {step < TOTAL_STEPS ? (
          <Button type="button" onClick={goToNextStep} disabled={!canGoNext}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleCreateBooking}
            disabled={isCreatingBooking}
          >
            {isCreatingBooking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  );
}
