import type { Category, UserRole } from "@/types/enum.types";

export type Profile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category: Category | null;
  avatar: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
};

export type ProfileDetails = Profile & {
  idProofNumber: string | null;
  experience: string | null;
  qualification: string | null;
  emergencyContact: string | null;
  address: string | null;
  idProofImage: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
  signatureImage: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
};
