import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  async transform(value: unknown) {
    const parsedValue = await this.schema.safeParseAsync(value);
    if (parsedValue.error) {
      const errors = parsedValue.error.issues.map((i) => ({
        field: i.path[0],
        message: i.message,
        code: i.code,
      }));

      const format = {};
      errors.forEach((e) => {
        format[e.field] = {
          message: e.message,
          code: e.code,
        };
      });
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: format,
      });
    }
    return parsedValue.data;
  }
}
