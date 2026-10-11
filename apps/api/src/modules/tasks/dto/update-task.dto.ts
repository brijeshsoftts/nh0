import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { CreateTaskSchema } from './create-task.dto';

const taskTypeSchema = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(z.enum(['CLEANING', 'DEEP_CLEAN', 'TURNDOWN']));

export const UpdateTaskSchema = CreateTaskSchema.partial()
  .extend({
    taskType: taskTypeSchema.optional(),
  })
  .strict()
  .refine((task) => Object.keys(task).length > 0, {
    message: 'Provide at least one task field to update.',
  });

export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}
