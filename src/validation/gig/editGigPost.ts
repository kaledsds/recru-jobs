import { z } from "zod";

// Gig Input Schema
export const editGigInputSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "Gig title must contain at least 3 character(s)")
    .max(20, "Gig title must contain at most 20 character(s)")
    .optional(),
  category: z
    .string()
    .min(3, "Gig category must contain at least 3 character(s)")
    .max(100, "Gig category must contain at most 20 character(s)")
    .optional(),
  serviceType: z
    .string()
    .min(3, "Service Type must contain at least 3 character(s)")
    .max(20, "Service Type must contain at most 20 character(s)")
    .optional(),
  salary: z
    .string()
    .min(3, "Salary must contain at least 3 character(s)")
    .max(20, "Salary must contain at most 20 character(s)")
    .optional(),
});

// Gig Input Type
export type EditGigInputType = z.infer<typeof editGigInputSchema>;
