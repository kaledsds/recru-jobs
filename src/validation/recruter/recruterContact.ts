import { z } from "zod";

// Recruter Contact Schema
export const recruterContactSchema = z.object({
  phone: z.string().min(8).max(10),
  email: z.string().email(),
  city: z.string().min(3).max(50),
  address: z.string().min(3).max(50),
  postalCode: z.string().min(4).max(4),
});

// Recruter Contact Type
export type RecruterContactType = z.infer<typeof recruterContactSchema>;
