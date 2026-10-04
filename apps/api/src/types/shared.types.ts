import { Category, UserRole } from './prisma.types';

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  category?: Category;
}
