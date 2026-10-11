import { z } from "zod";

const taskTypeSchema = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(
    z.enum(
      ["CLEANING", "DEEP_CLEAN", "TURNDOWN"],
      "Please select a valid task type."
    )
  );

export const CreateTaskSchema = z
  .object({
    roomId: z.string().cuid("Please select a valid room."),
    assignedTo: z.string().cuid("Please select a valid housekeeper."),
    taskType: taskTypeSchema,
    scheduledDate: z.coerce.date("Scheduled date is required."),
  })
  .strict();

export type CreateTask = z.infer<typeof CreateTaskSchema>;
