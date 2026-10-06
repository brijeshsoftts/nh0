import type { StatCard } from "@/components/common/StatCard";

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
