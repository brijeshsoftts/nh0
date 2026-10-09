import type { Category, TaskStatus, TaskType } from "@/types/enum.types";

export type StaffItem = {
  id: string;
  staffId: string;
  fullName: string;
  email: string;
  phone: string;
  category: Category;
  isActive: boolean;
  assignedTasks: number;
  createdAt: string;
};

export type StaffTask = {
  id: string;
  taskType: TaskType;
  status: TaskStatus;
  scheduledDate: string;
  room: {
    id: string;
    roomNumber: string;
    name: string | null;
  };
};

export type StaffDetails = {
  id: string;
  staffId: string;
  category: Category;
  fatherName: string;
  motherName: string;
  idProofNumber: string;
  qualification: string;
  experience: string;
  emergencyContact: string;
  address: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    isActive: boolean;
    lastLoginAt: string | null;
  };
  assignedTasks: StaffTask[];
};
