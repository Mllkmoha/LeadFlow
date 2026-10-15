
import { z } from "zod";

export const activitySchema = z.object({
  type: z.enum(["CALL", "EMAIL", "MEETING", "TASK"]),
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().optional(),
  contactId: z.string().trim().min(1, "Contact is required"),
  dueDate: z
  .string()
  .optional()
  .refine(
    (value) => !value || !Number.isNaN(Date.parse(value)),
    "Invalid due date",
  ),
});
