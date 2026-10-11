import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const taskStatusSchema = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(
    z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'], {
      error: 'Please select a valid task status.',
    }),
  );

export const UpdateTaskStatusSchema = z
  .object({
    status: taskStatusSchema,
  })
  .strict();

export class UpdateTaskStatusDto extends createZodDto(UpdateTaskStatusSchema) {}
