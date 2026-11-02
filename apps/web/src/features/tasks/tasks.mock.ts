import { DEMO_STAFF } from "../shared/demo-hotel-data";

import type { TaskDetails } from "./tasks.types";

export const TASK_DETAILS: TaskDetails = {
  id: "cmjtask1025002",

  taskType: "DEEP_CLEAN",
  status: "COMPLETED",

  scheduledDate: "2026-11-02T07:30:00+05:30",
  startedAt: "2026-11-02T07:42:00+05:30",
  completedAt: "2026-11-02T08:35:00+05:30",

  createdAt: "2026-11-01T18:20:00+05:30",
  updatedAt: "2026-11-02T08:35:00+05:30",

  room: {
    id: "cmroom305001",
    roomNumber: "305",
    name: "Premium Room",
    floor: 3,
    description: "Large suite with living area",

    occupancyStatus: "VACANT",
    housekeepingStatus: "CLEAN",

    roomType: {
      id: "cmroomtype002",
      name: "Premium Room",
    },
  },

  assignee: {
    id: DEMO_STAFF.housekeeper.id,
    fullName: DEMO_STAFF.housekeeper.fullName,
    email: DEMO_STAFF.housekeeper.email,
    phone: DEMO_STAFF.housekeeper.phone,
  },

  assignment: {
    id: "cmassignment002",
    isActive: true,

    createdAt: "2026-11-01T18:22:00+05:30",

    housekeeper: {
      id: DEMO_STAFF.housekeeper.id,
      fullName: DEMO_STAFF.housekeeper.fullName,
    },

    assignedBy: {
      id: DEMO_STAFF.receptionist.id,
      fullName: DEMO_STAFF.receptionist.fullName,
    },
  },
};
