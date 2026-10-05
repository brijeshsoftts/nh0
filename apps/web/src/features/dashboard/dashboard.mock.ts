import type { StatCard } from "@/components/common/StatCard";

export const MANAGEMENT_STAT: StatCard[] = [
  {
    id: "occupancy",
    title: "Occupancy",
    value: "72%",
    description: "58 occupied / 80 active rooms",
    icon: "BedDouble",
    link: "/rooms?status=occupied",
    tone: "emerald",
  },
  {
    id: "todays-arrivals",
    title: "Arrivals",
    value: "12",
    description: "8 confirmed · 4 pending",
    icon: "LogIn",
    link: "/bookings?checkIn=today",
    tone: "gold",
  },
  {
    id: "todays-departures",
    title: "Departures",
    value: "9",
    description: "7 checked-in · 2 pending",
    icon: "LogOut",
    link: "/bookings?checkOut=today",
    tone: "violet",
  },
  {
    id: "pending-bookings",
    title: "Pending Bookings",
    value: "7",
    description: "Require confirmation",
    icon: "Clock",
    link: "/bookings?status=pending",
    tone: "sky",
  },
];
