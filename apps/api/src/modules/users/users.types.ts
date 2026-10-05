import { Category, UserRole } from '../../types/prisma.types';

export type UserDetails = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category?: Category;
  profile: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
};
