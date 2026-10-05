import type { AmenityCategory } from "@/types/enum.types";

export type Amenity = {
  id: string;
  category: AmenityCategory;
  name: string;
  description?: string;
  icon: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
