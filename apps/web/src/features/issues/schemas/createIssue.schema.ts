import { z } from "zod";

export const CreateIssueSchema = z
  .object({
    roomId: z.cuid("Select a valid room").optional(),
    category: z.enum(
      [
        "PLUMBING",
        "ELECTRICAL",
        "HVAC",
        "FURNITURE",
        "APPLIANCE",
        "INTERNET",
        "BATHROOM",
        "DOOR_LOCK",
        "LIGHTING",
        "OTHER",
      ],
      "Select a valid issue category"
    ),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
      message: "Select a valid issue priority",
    }),
    title: z
      .string("Issue title is required")
      .trim()
      .min(3, "Issue title must contain at least 3 characters")
      .max(200, "Issue title must be 200 characters or fewer"),
    description: z
      .string("Issue description is required")
      .trim()
      .min(1, "Issue description is required")
      .max(5000, "Issue description must be 5000 characters or fewer"),
  })
  .strict();
export type CreateIssue = z.infer<typeof CreateIssueSchema>;
