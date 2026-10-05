import { AmenityCategory } from '../../types/prisma.types';

export type Amenity = {
  id: string;
  category: AmenityCategory;
  name: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};
