import { z } from "zod";

// Common validation
const idSchema = z.string().trim().min(1, "ID is required");

const titleSchema = z
  .string()
  .trim()
  .min(3, "Title must be at least 3 characters")
  .max(150, "Title must not exceed 150 characters");

const descriptionSchema = z
  .string()
  .trim()
  .min(10, "Description must be at least 10 characters")
  .max(500, "Description must not exceed 2000 characters");

// Normalize category before enum validation
export const issueCategorySchema = z
  .string()
  .trim()
  .min(1, "Category is required")
  .transform((value) => value.toUpperCase())
  .pipe(
    z.enum(
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
      "Invalid category"
    )
  );

const issuePrioritySchema = z.enum(
  ["LOW", "MEDIUM", "HIGH", "URGENT"],
  "Invalid priority"
);
const issueStatusSchema = z.enum(
  ["OPEN", "IN_PROGRESS", "COMPLETED", "RESOLVED", "CANCELLED"],
  "Invalid status"
);

const updateTitleSchema = z
  .string()
  .trim()
  .min(3, "Title must contain at least 3 characters")
  .max(200, "Title must contain 200 characters or fewer");

const updateDescriptionSchema = z
  .string()
  .trim()
  .min(1, "Description is required")
  .max(5000, "Description must contain 5000 characters or fewer");

// CUSTOMER: Create issue
export const customerCreateIssueSchema = z
  .object({
    category: issueCategorySchema,
    title: titleSchema,
    priority: issuePrioritySchema.default("LOW"),
    description: descriptionSchema,
  })
  .strict();

// ADMIN: Create issue
export const adminCreateIssueSchema = z
  .object({
    roomId: idSchema,
    reportedById: idSchema,
    category: issueCategorySchema,
    priority: issuePrioritySchema,
    title: titleSchema,
    description: descriptionSchema,
    assignedToId: idSchema.nullable().optional(),
  })
  .strict();

// ADMIN: Update issue
export const adminUpdateIssueSchema = z
  .object({
    category: issueCategorySchema.optional(),
    priority: issuePrioritySchema.optional(),
    status: issueStatusSchema.optional(),
    title: updateTitleSchema.optional(),
    description: updateDescriptionSchema.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update the issue",
  });

// Inferred TypeScript types
export type CustomerCreateIssue = z.infer<typeof customerCreateIssueSchema>;

export type AdminCreateIssue = z.infer<typeof adminCreateIssueSchema>;

export type AdminUpdateIssue = z.infer<typeof adminUpdateIssueSchema>;
