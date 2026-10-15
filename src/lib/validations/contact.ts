import { z } from "zod";

export const contactSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  position: z.string().trim().optional(),
  status: z
    .enum(["NEW", "CONTACTED", "INTERESTED", "CONVERTED"])
    .default("NEW"),
  source: z.string().trim().optional(),
});


    export const updateContactSchema = contactSchema.partial();