import type { TaskDetails } from "./tasks.types";

export const TASK_DETAILS: TaskDetails = {
  id: "cmjtask1025002",

  taskType: "DEEP_CLEAN",
  status: "COMPLETED",

  scheduledDate: "2026-10-05T07:30:00.000Z",
  startedAt: "2026-10-05T07:42:00.000Z",
  completedAt: "2026-10-05T08:35:00.000Z",

  createdAt: "2026-10-04T18:20:00.000Z",
  updatedAt: "2026-10-05T08:35:00.000Z",

  room: {
    id: "cmroom305001",
    roomNumber: "305",
    name: "Premium Suite",
    floor: 3,
    description: "Large suite with living area",

    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",

    roomType: {
      id: "cmroomtype002",
      name: "Premium Suite",
    },
  },

  assignee: {
    id: "cmuser002",
    fullName: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 99887 66554",
  },

  assignment: {
    id: "cmassignment002",
    isActive: true,

    createdAt: "2026-10-04T18:22:00.000Z",

    housekeeper: {
      id: "cmuser002",
      fullName: "Priya Singh",
    },

    assignedBy: {
      id: "cmuser010",
      fullName: "Amit Sharma",
    },
  },
};
