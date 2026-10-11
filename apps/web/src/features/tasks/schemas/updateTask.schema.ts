import { z } from "zod";

import { CreateTaskSchema } from "./createTask.schema";

export const UpdateTaskSchema = CreateTaskSchema.partial().refine(
  (task) => Object.keys(task).length > 0,
  {
    message: "Provide at least one task field to update.",
  }
);

export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
