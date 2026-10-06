import type { HousekeepingStatus, OccupancyStatus } from "@/types/enum.types";

export const occupancyStatus: { id: OccupancyStatus; name: OccupancyStatus }[] =
  [
    {
      id: "OCCUPIED",
      name: "OCCUPIED",
    },
    {
      id: "OUT_OF_ORDER",
      name: "OUT_OF_ORDER",
    },
    {
      id: "RESERVED",
      name: "RESERVED",
    },
    {
      id: "VACANT",
      name: "VACANT",
    },
  ];

export const housekeepingStatus: {
  id: HousekeepingStatus;
  name: HousekeepingStatus;
}[] = [
  {
    id: "CLEAN",
    name: "CLEAN",
  },
  {
    id: "CLEANING",
    name: "CLEANING",
  },
  {
    id: "DIRTY",
    name: "DIRTY",
  },
];
