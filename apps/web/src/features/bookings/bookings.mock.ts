import type { BookingDetails } from "./bookings.types";

export const BOOKING_DETAILS: BookingDetails = {
  id: "booking-001",
  bookingReference: "BK-2026-1001",
  status: "CONFIRMED",
  checkInDate: "2026-10-10",
  checkOutDate: "2026-10-13",
  totalGuests: 2,
  totalAmount: 28500,
  specialRequest: "Late check-in around 10 PM. King-size bed preferred.",
  bookedAt: "2026-10-05T09:15:00Z",
  createdAt: "2026-10-05T09:15:00Z",
  updatedAt: "2026-10-05T09:20:00Z",

  customer: {
    id: "customer-001",
    fullName: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 98765 43210",
    profileImage: {
      id: "profile-001",
      url: "https://i.pravatar.cc/150?img=12",
      altText: "Arjun Mehta",
    },
    profile: {
      idProofNumber: "XXXX-XXXX-4821",
      address: "22 Park Street, New Delhi, India",
    },
  },

  bookingRooms: [
    {
      id: "booking-room-001",
      roomNumber: "304",
      name: "Deluxe King Room",
      floor: 3,
      roomType: {
        id: "room-type-001",
        name: "Deluxe King",
        slug: "deluxe-king",
        maxGuests: 2,
        basePrice: 8500,
        currency: "INR",
        bedType: "King",
        bedCount: 1,
      },
      pricePerNight: 8500,
    },
  ],

  bookingGuests: [
    {
      id: "guest-001",
      fullName: "Arjun Mehta",
      age: 34,
      gender: "MALE",
      idProofNumber: "XXXX-XXXX-4821",
    },
    {
      id: "guest-002",
      fullName: "Priya Mehta",
      age: 31,
      gender: "FEMALE",
      idProofNumber: "XXXX-XXXX-7294",
    },
  ],

  invoices: [
    {
      id: "invoice-001",
      invoiceNumber: "INV-2026-1001",
      subtotal: 25500,
      taxAmount: 3000,
      discountAmount: 0,
      totalAmount: 28500,
      status: "UNPAID",
      issuedAt: "2026-10-05T09:20:00Z",
      payments: [
        {
          id: "payment-001",
          paymentReference: "PAY-10001",
          amount: 0,
          paymentMethod: "ONLINE",
          paymentStatus: "PENDING",
          createdAt: "2026-10-05T09:20:00Z",
        },
      ],
    },
  ],
};
