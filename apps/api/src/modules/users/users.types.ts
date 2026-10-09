import { Category, UserRole } from '../../types/prisma.types';

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  category?: Category;
  avatar: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
};

export type UserDetails = UserProfile;

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  avatar: {
    url: string;
    altText: string | null;
  } | null;
};

export type CreatedUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
};

export type UpdateUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
};
