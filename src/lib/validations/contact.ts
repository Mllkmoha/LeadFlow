import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be 100 characters or less"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be 100 characters or less"),
  email: z.string().trim().email("Invalid email address").max(254, "Email must be 254 characters or less"),
  phone: z.string().trim().max(50, "Phone must be 50 characters or less").optional(),
  company: z.string().trim().max(200, "Company must be 200 characters or less").optional(),
  position: z.string().trim().max(200, "Position must be 200 characters or less").optional(),
  status: z
    .enum(["NEW", "CONTACTED", "INTERESTED", "CONVERTED"])
    .default("NEW"),
  source: z.string().trim().max(200, "Source must be 200 characters or less").optional(),
});


export const updateContactSchema = contactSchema.partial();
