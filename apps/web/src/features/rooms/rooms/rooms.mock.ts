import type { StatCard } from "@/components/common/StatCard";

import type { Room } from "./rooms.types";

export const ROOMS_STAT: StatCard[] = [
  {
    id: "total-rooms",
    title: "Total Rooms",
    value: "96",
    description: "Active rooms",
    icon: "BedDouble",
  },
  {
    id: "vacant-clean",
    title: "Vacant & Clean",
    value: "28",
    description: "Ready to sell",
    icon: "Sparkles",
  },
  {
    id: "occupied",
    title: "Occupied",
    value: "62",
    description: "Currently occupied",
    icon: "DoorOpen",
  },
  {
    id: "out-of-order",
    title: "Out of Order",
    value: "6",
    description: "Unavailable for booking",
    icon: "DoorClosed",
  },
];

export const rooms: Room[] = [
  {
    id: "room_001",
    name: "Deluxe King Room",
    roomNumber: "101",
    floor: "1",
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_deluxe_king",
      name: "Deluxe King Room",
    },
  },
  {
    id: "room_002",
    name: "Deluxe King Room",
    roomNumber: "102",
    floor: "1",
    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_deluxe_king",
      name: "Deluxe King Room",
    },
  },
  {
    id: "room_003",
    name: "Deluxe King Room",
    roomNumber: "103",
    floor: "1",
    occupancyStatus: "RESERVED",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_deluxe_king",
      name: "Deluxe King Room",
    },
  },
  {
    id: "room_004",
    name: "Deluxe King Room",
    roomNumber: "104",
    floor: "1",
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "DIRTY",
    isActive: true,
    roomType: {
      id: "rt_deluxe_king",
      name: "Deluxe King Room",
    },
  },

  {
    id: "room_005",
    name: "Premium Twin Room",
    roomNumber: "201",
    floor: "2",
    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_premium_twin",
      name: "Premium Twin Room",
    },
  },
  {
    id: "room_006",
    name: "Premium Twin Room",
    roomNumber: "202",
    floor: "2",
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_premium_twin",
      name: "Premium Twin Room",
    },
  },
  {
    id: "room_007",
    name: "Premium Twin Room",
    roomNumber: "203",
    floor: "2",
    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEANING",
    isActive: true,
    roomType: {
      id: "rt_premium_twin",
      name: "Premium Twin Room",
    },
  },
  {
    id: "room_008",
    name: "Premium Twin Room",
    roomNumber: "204",
    floor: "2",
    occupancyStatus: "RESERVED",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_premium_twin",
      name: "Premium Twin Room",
    },
  },

  {
    id: "room_009",
    name: "Executive Suite",
    roomNumber: "301",
    floor: "3",
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_executive_suite",
      name: "Executive Suite",
    },
  },
  {
    id: "room_010",
    name: "Executive Suite",
    roomNumber: "302",
    floor: "3",
    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_executive_suite",
      name: "Executive Suite",
    },
  },
  {
    id: "room_011",
    name: "Executive Suite",
    roomNumber: "303",
    floor: "3",
    occupancyStatus: "OUT_OF_ORDER",
    housekeepingStatus: "DIRTY",
    isActive: false,
    roomType: {
      id: "rt_executive_suite",
      name: "Executive Suite",
    },
  },

  {
    id: "room_012",
    name: "Family Room",
    roomNumber: "401",
    floor: "4",
    occupancyStatus: "OCCUPIED",
    housekeepingStatus: "DIRTY",
    isActive: true,
    roomType: {
      id: "rt_family",
      name: "Family Room",
    },
  },
  {
    id: "room_013",
    name: "Family Room",
    roomNumber: "402",
    floor: "4",
    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",
    isActive: true,
    roomType: {
      id: "rt_family",
      name: "Family Room",
    },
  },
  {
    id: "room_014",
    name: "Family Room",
    roomNumber: "403",
    floor: "4",
    occupancyStatus: "RESERVED",
    housekeepingStatus: "CLEANING",
    isActive: true,
    roomType: {
      id: "rt_family",
      name: "Family Room",
    },
  },
];
