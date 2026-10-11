import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTaskSchema = z
  .object({
    roomId: z.string().cuid('Please select a valid room.'),
    assignedTo: z.string().cuid('Please select a valid housekeeper.'),
    taskType: z.enum(['CLEANING', 'DEEP_CLEAN', 'TURNDOWN'], {
      error: 'Please select a valid task type.',
    }),
    scheduledDate: z.coerce.date('Scheduled date is required.'),
  })
  .strict();

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
