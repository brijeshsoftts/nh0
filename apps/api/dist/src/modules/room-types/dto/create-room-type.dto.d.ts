import { z } from 'zod';
export declare const CreateRoomTypeSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    sizeSqFt: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    maxGuests: z.ZodCoercedNumber<unknown>;
    adults: z.ZodCoercedNumber<unknown>;
    children: z.ZodCoercedNumber<unknown>;
    basePrice: z.ZodCoercedNumber<unknown>;
    currency: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    bedType: z.ZodEnum<{
        SINGLE: "SINGLE";
        DOUBLE: "DOUBLE";
        QUEEN: "QUEEN";
        KING: "KING";
        TWIN: "TWIN";
    }>;
    bedCount: z.ZodCoercedNumber<unknown>;
    smokingAllowed: z.ZodCoercedBoolean<unknown>;
    petsAllowed: z.ZodCoercedBoolean<unknown>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodCoercedBoolean<unknown>;
}, z.core.$strip>;
declare const CreateRoomTypeDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    sizeSqFt: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    maxGuests: z.ZodCoercedNumber<unknown>;
    adults: z.ZodCoercedNumber<unknown>;
    children: z.ZodCoercedNumber<unknown>;
    basePrice: z.ZodCoercedNumber<unknown>;
    currency: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    bedType: z.ZodEnum<{
        SINGLE: "SINGLE";
        DOUBLE: "DOUBLE";
        QUEEN: "QUEEN";
        KING: "KING";
        TWIN: "TWIN";
    }>;
    bedCount: z.ZodCoercedNumber<unknown>;
    smokingAllowed: z.ZodCoercedBoolean<unknown>;
    petsAllowed: z.ZodCoercedBoolean<unknown>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodCoercedBoolean<unknown>;
}, z.core.$strip>, false>;
export declare class CreateRoomTypeDto extends CreateRoomTypeDto_base {
}
export {};
