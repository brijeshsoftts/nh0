import { PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
export declare class ValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodSchema);
    transform(value: unknown): Promise<unknown>;
}
