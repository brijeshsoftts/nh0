import type { StatCard } from "@/components/common/StatCard";

export const issuesStats: StatCard[] = [
  {
    id: "todays-arrivals",
    title: "Today's Arrivals",
    value: "12",
    description: "8 confirmed · 4 pending",
    icon: "LogIn",
    link: "/bookings?checkIn=today",
    tone: "rose",
  },
  {
    id: "todays-departures",
    title: "Today's Departures",
    value: "9",
    description: "7 checked-in · 2 pending",
    icon: "LogOut",
    link: "/bookings?checkOut=today",
    tone: "teal",
  },
  {
    id: "available-rooms",
    title: "Available Rooms",
    value: "18",
    description: "Ready for new bookings",
    icon: "BedDouble",
    link: "/rooms?status=available",
    tone: "sky",
  },
  {
    id: "pending-bookings",
    title: "Pending Bookings",
    value: "7",
    description: "Require confirmation",
    icon: "Clock",
    link: "/bookings?status=pending",
    tone: "violet",
  },
];
