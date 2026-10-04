import { AmenityCategory } from '../../types/prisma.types';
export type AmenityBase = {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: AmenityCategory;
    isActive: boolean;
};
export type CreateAmenityResponse = AmenityBase & {
    createdAt: Date;
    updatedAt: Date;
};
export type UpdateAmenityResponse = AmenityBase & {
    createdAt: Date;
    updatedAt: Date;
};
export type AmenityListItemResponse = AmenityBase & {
    createdAt: Date;
    updatedAt: Date;
};
