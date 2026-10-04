export declare const UpdateAmenitySchema: import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    description: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>;
    icon: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>;
    category: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodEnum<{
        ROOM: "ROOM";
        BATHROOM: "BATHROOM";
        FOOD: "FOOD";
        ENTERTAINMENT: "ENTERTAINMENT";
        CONNECTIVITY: "CONNECTIVITY";
        COMFORT: "COMFORT";
        SAFETY: "SAFETY";
        OTHER: "OTHER";
    }>>>;
    isActive: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodBoolean>>;
}, import("zod/v4/core").$strict>;
declare const UpdateAmenityDto_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    description: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>;
    icon: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>;
    category: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodEnum<{
        ROOM: "ROOM";
        BATHROOM: "BATHROOM";
        FOOD: "FOOD";
        ENTERTAINMENT: "ENTERTAINMENT";
        CONNECTIVITY: "CONNECTIVITY";
        COMFORT: "COMFORT";
        SAFETY: "SAFETY";
        OTHER: "OTHER";
    }>>>;
    isActive: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodBoolean>>;
}, import("zod/v4/core").$strict>, false>;
export declare class UpdateAmenityDto extends UpdateAmenityDto_base {
}
export {};
