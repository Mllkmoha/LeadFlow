import { z } from "zod";

export const activitySchema = z.object({
  type: z.enum(["CALL", "EMAIL", "MEETING", "TASK"]),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  content: z
    .string()
    .trim()
    .max(10000, "Description must be 10,000 characters or less")
    .optional(),
  contactId: z.string().trim().min(1, "Contact is required").max(100, "Invalid contact ID"),
  dueDate: z
    .string()
    .optional()
    .refine(
      (value) => !value || !Number.isNaN(Date.parse(value)),
      "Invalid due date",
    ),
});

export const updateActivitySchema = activitySchema.partial().extend({
  completed: z.boolean().optional(),
});
