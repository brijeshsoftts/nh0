import { z } from 'zod';
export declare const CreateAmenitySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodOptional<z.ZodEnum<{
        ROOM: "ROOM";
        BATHROOM: "BATHROOM";
        FOOD: "FOOD";
        ENTERTAINMENT: "ENTERTAINMENT";
        CONNECTIVITY: "CONNECTIVITY";
        COMFORT: "COMFORT";
        SAFETY: "SAFETY";
        OTHER: "OTHER";
    }>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
declare const CreateAmenityDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodOptional<z.ZodEnum<{
        ROOM: "ROOM";
        BATHROOM: "BATHROOM";
        FOOD: "FOOD";
        ENTERTAINMENT: "ENTERTAINMENT";
        CONNECTIVITY: "CONNECTIVITY";
        COMFORT: "COMFORT";
        SAFETY: "SAFETY";
        OTHER: "OTHER";
    }>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>, false>;
export declare class CreateAmenityDto extends CreateAmenityDto_base {
}
export {};
