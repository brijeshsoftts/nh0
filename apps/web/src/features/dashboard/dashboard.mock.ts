import { DEMO_CUSTOMERS } from "../shared/demo-hotel-data";

import type { DonutChartData } from "./components/DonutChart";
import type { StatusBarChart } from "./components/StatusBarChart";
import type { TrendChart } from "./components/TrendChart";
import type { TodaysArrival, TodaysDeparture } from "./dashboard.types";

export const TODAYS_ARRIVALS: TodaysArrival[] = [
  {
    booking: {
      id: "booking-2026-1101",
      bookingReference: "BK-2026-1101",
    },
    customer: {
      id: DEMO_CUSTOMERS.saimKhan.id,
      fullName: DEMO_CUSTOMERS.saimKhan.fullName,
    },
    roomNumber: "101",
    checkInDate: "2026-11-02",
    status: "PENDING",
  },
  {
    booking: {
      id: "booking-2026-1102",
      bookingReference: "BK-2026-1102",
    },
    customer: {
      id: DEMO_CUSTOMERS.priyaSrivastava.id,
      fullName: DEMO_CUSTOMERS.priyaSrivastava.fullName,
    },
    roomNumber: "204",
    checkInDate: "2026-11-02",
    status: "CONFIRMED",
  },
  {
    booking: {
      id: "booking-2026-1103",
      bookingReference: "BK-2026-1103",
    },
    customer: {
      id: DEMO_CUSTOMERS.ankitMishra.id,
      fullName: DEMO_CUSTOMERS.ankitMishra.fullName,
    },
    roomNumber: "301",
    checkInDate: "2026-11-02",
    status: "PENDING",
  },
  {
    booking: {
      id: "booking-2026-1104",
      bookingReference: "BK-2026-1104",
    },
    customer: {
      id: DEMO_CUSTOMERS.nehaGupta.id,
      fullName: DEMO_CUSTOMERS.nehaGupta.fullName,
    },
    roomNumber: "402",
    checkInDate: "2026-11-02",
    status: "CONFIRMED",
  },
  {
    booking: {
      id: "booking-2026-1105",
      bookingReference: "BK-2026-1105",
    },
    customer: {
      id: DEMO_CUSTOMERS.arjunPandey.id,
      fullName: DEMO_CUSTOMERS.arjunPandey.fullName,
    },
    roomNumber: "403",
    checkInDate: "2026-11-02",
    status: "PENDING",
  },
];

export const TODAYS_DEPARTURES: TodaysDeparture[] = [
  {
    booking: {
      id: "booking-2026-1001",
      bookingReference: "BK-2026-1001",
    },
    customer: {
      id: DEMO_CUSTOMERS.poojaShukla.id,
      fullName: DEMO_CUSTOMERS.poojaShukla.fullName,
    },
    roomNumber: "102",
    checkOutDate: "2026-11-02",
    status: "CHECKED_IN",
  },
  {
    booking: {
      id: "booking-2026-1002",
      bookingReference: "BK-2026-1002",
    },
    customer: {
      id: DEMO_CUSTOMERS.rohitYadav.id,
      fullName: DEMO_CUSTOMERS.rohitYadav.fullName,
    },
    roomNumber: "202",
    checkOutDate: "2026-11-02",
    status: "CHECKED_IN",
  },
  {
    booking: {
      id: "booking-2026-1003",
      bookingReference: "BK-2026-1003",
    },
    customer: {
      id: DEMO_CUSTOMERS.kavitaVerma.id,
      fullName: DEMO_CUSTOMERS.kavitaVerma.fullName,
    },
    roomNumber: "302",
    checkOutDate: "2026-11-02",
    status: "CHECKED_IN",
  },
  {
    booking: {
      id: "booking-2026-1004",
      bookingReference: "BK-2026-1004",
    },
    customer: {
      id: DEMO_CUSTOMERS.amanTripathi.id,
      fullName: DEMO_CUSTOMERS.amanTripathi.fullName,
    },
    roomNumber: "103",
    checkOutDate: "2026-11-02",
    status: "PENDING",
  },
  {
    booking: {
      id: "booking-2026-1005",
      bookingReference: "BK-2026-1005",
    },
    customer: {
      id: DEMO_CUSTOMERS.shreyaSrivastava.id,
      fullName: DEMO_CUSTOMERS.shreyaSrivastava.fullName,
    },
    roomNumber: "201",
    checkOutDate: "2026-11-02",
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
    count: 28,
  },
  {
    status: "RESERVED",
    count: 6,
  },
  {
    status: "OCCUPIED",
    count: 56,
  },
  {
    status: "OUT_OF_ORDER",
    count: 6,
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
    name: "Deluxe Room",
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
    name: "Premium Room",
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
    name: "Executive Room",
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
    name: "Family Suite",
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
