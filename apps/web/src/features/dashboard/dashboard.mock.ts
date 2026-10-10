import type { StatCard } from "@/components/common/StatCard";

import type { DonutChartData } from "./components/DonutChart";
import type { StatusBarChart } from "./components/StatusBarChart";
import type { TrendChart } from "./components/TrendChart";

// MANAGEMENT MOCK DATA
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

export const TODAYS_ARRIVALS = [
  {
    booking: {
      id: "booking-1001",
      bookingReference: "BK-2026-1001",
    },
    customer: {
      id: "customer-001",
      fullName: "Aarav Sharma",
    },
    roomNumber: "101",
    checkInDate: "2026-10-05",
    status: "CONFIRMED",
  },
  {
    booking: {
      id: "booking-1002",
      bookingReference: "BK-2026-1002",
    },
    customer: {
      id: "customer-002",
      fullName: "Priya Mehta",
    },
    roomNumber: "204",
    checkInDate: "2026-10-05",
    status: "CONFIRMED",
  },
  {
    booking: {
      id: "booking-1003",
      bookingReference: "BK-2026-1003",
    },
    customer: {
      id: "customer-003",
      fullName: "Rahul Verma",
    },
    roomNumber: "305",
    checkInDate: "2026-10-05",
    status: "PENDING",
  },
  {
    booking: {
      id: "booking-1004",
      bookingReference: "BK-2026-1004",
    },
    customer: {
      id: "customer-004",
      fullName: "Neha Kapoor",
    },
    roomNumber: "402",
    checkInDate: "2026-10-05",
    status: "CONFIRMED",
  },
  {
    booking: {
      id: "booking-1005",
      bookingReference: "BK-2026-1005",
    },
    customer: {
      id: "customer-005",
      fullName: "Vikram Singh",
    },
    roomNumber: "506",
    checkInDate: "2026-10-05",
    status: "PENDING",
  },
];

export const TODAYS_DEPARTURES = [
  {
    booking: {
      id: "booking-0901",
      bookingReference: "BK-2026-0901",
    },
    customer: {
      id: "customer-101",
      fullName: "Rohan Malhotra",
    },
    roomNumber: "103",
    checkOutDate: "2026-10-02",
    status: "CHECKED_IN",
  },
  {
    booking: {
      id: "booking-0902",
      bookingReference: "BK-2026-0902",
    },
    customer: {
      id: "customer-102",
      fullName: "Ananya Gupta",
    },
    roomNumber: "208",
    checkOutDate: "2026-10-03",
    status: "CHECKED_IN",
  },
  {
    booking: {
      id: "booking-0903",
      bookingReference: "BK-2026-0903",
    },
    customer: {
      id: "customer-103",
      fullName: "Karan Joshi",
    },
    roomNumber: "312",
    checkOutDate: "2026-10-01",
    status: "CHECKED_IN",
  },
  {
    booking: {
      id: "booking-0904",
      bookingReference: "BK-2026-0904",
    },
    customer: {
      id: "customer-104",
      fullName: "Sneha Agarwal",
    },
    roomNumber: "415",
    checkOutDate: "2026-10-03",
    status: "PENDING",
  },
  {
    booking: {
      id: "booking-0905",
      bookingReference: "BK-2026-0905",
    },
    customer: {
      id: "customer-105",
      fullName: "Aditya Bansal",
    },
    roomNumber: "507",
    checkOutDate: "2026-10-02",
    status: "CHECKED_IN",
  },
];

export const REVENUE_DATA: TrendChart[] = [
  { date: "1", value: 12000 },
  { date: "5", value: 18000 },
  { date: "10", value: 15000 },
  { date: "15", value: 24000 },
  { date: "20", value: 21000 },
  { date: "25", value: 28000 },
  { date: "30", value: 25000 },
];

export const BOOKING_STATUS: StatusBarChart[] = [
  {
    status: "CONFIRMED",
    count: 42,
  },
  {
    status: "PENDING",
    count: 12,
  },
  {
    status: "CHECKED_IN",
    count: 18,
  },
  {
    status: "CHECKED_OUT",
    count: 35,
  },
  {
    status: "CANCELLED",
    count: 8,
  },
  {
    status: "NO_SHOW",
    count: 1,
  },
];

export const ROOM_STATUS = [
  {
    status: "VACANT",
    count: 24,
  },
  {
    status: "RESERVED",
    count: 12,
  },
  {
    status: "OCCUPIED",
    count: 38,
  },
  {
    status: "OUT_OF_ORDER",
    count: 3,
  },
];

// STAFF MOCK DATA
export const STAFF_STAT: StatCard[] = [
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

// HOUSEKEEPER MOCK DATA
export const HOUSEKEEPER_STAT: StatCard[] = [
  {
    id: "pending-tasks",
    title: "My Pending Tasks",
    value: "8",
    description: "Tasks waiting to be completed",
    icon: "ClipboardList",
    link: "/housekeeping/tasks?status=pending",
    tone: "emerald",
  },
  {
    id: "in-progress",
    title: "In Progress",
    value: "2",
    description: "Tasks currently being handled",
    icon: "LoaderCircle",
    link: "/housekeeping/tasks?status=in-progress",
    tone: "gold",
  },
  {
    id: "completed-today",
    title: "Completed Today",
    value: "6",
    description: "Tasks completed today",
    icon: "CircleCheck",
    link: "/housekeeping/tasks?status=completed&date=today",
    tone: "rose",
  },
  {
    id: "dirty-rooms",
    title: "Dirty Rooms",
    value: "7",
    description: "Rooms requiring cleaning",
    icon: "BedDouble",
    link: "/rooms?status=dirty",
    tone: "sky",
  },
];

export const TASKS_STATUS: DonutChartData[] = [
  {
    status: "Pending",
    count: 12,
  },
  {
    status: "In Progress",
    count: 8,
  },
  {
    status: "Completed",
    count: 25,
  },
];

export const TASK_TYPES_STATUS: DonutChartData[] = [
  {
    status: "Cleaning",
    count: 18,
  },
  {
    status: "Deep Clean",
    count: 7,
  },
  {
    status: "Turndown",
    count: 12,
  },
];

export const HOUSEKEEPER_ROOMS = [
  {
    id: "room-101",
    name: "Deluxe King Room",
    roomNumber: "101",
    floor: 1,
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "CLEAN",
    taskId: "cmjtask1025001",
    isActive: true,
    taskType: "CLEANING",
    status: "COMPLETED",
  },
  {
    id: "room-204",
    name: "Superior Twin Room",
    roomNumber: "204",
    floor: 2,
    occupancyStatus: "VACANT",
    housekeepingStatus: "DIRTY",
    isActive: true,
    taskId: "cmjtask1025002",
    taskType: "DEEP_CLEAN",
    status: "PENDING",
  },
  {
    id: "room-305",
    name: "Deluxe Suite",
    roomNumber: "305",
    floor: 3,
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "CLEANING",
    isActive: true,
    taskId: "cmjtask1025003",
    taskType: "TURNDOWN",
    status: "IN_PROGRESS",
  },
  {
    id: "room-412",
    name: "Executive King Room",
    roomNumber: "412",
    floor: 4,
    occupancyStatus: "RESERVED",
    housekeepingStatus: "DIRTY",
    isActive: true,
    taskId: "cmjtask1025004",
    taskType: "CLEANING",
    status: "PENDING",
  },
  {
    id: "room-508",
    name: "Premium Suite",
    roomNumber: "508",
    floor: 5,
    occupancyStatus: "OUT_OF_ORDER",
    housekeepingStatus: "DIRTY",
    isActive: false,
    taskId: "cmjtask1025005",
    taskType: "DEEP_CLEAN",
    status: "PENDING",
  },
];
