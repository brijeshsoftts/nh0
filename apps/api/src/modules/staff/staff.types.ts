import { Category, TaskStatus, TaskType } from '../../types/prisma.types';

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

export type CreateStaff = {
  id: string;
  staffId: string | null;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  category: Category | null;
  isActive: boolean;
};

export type UpdateStaffResponse = CreateStaff;
export type DeleteStaffResult = 'DELETED' | 'DEACTIVATED';
