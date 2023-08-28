import { z } from "zod";

// Gig Input Schema
export const gigInputSchema = z.object({
  title: z
    .string({
      required_error: "Gig title is required!",
    })
    .min(3, "Gig title must contain at least 3 character(s)")
    .max(20, "Gig title must contain at most 20 character(s)"),
  category: z
    .string({
      required_error: "Gig category is required!",
    })
    .min(3, "Gig category must contain at least 3 character(s)")
    .max(100, "Gig category must contain at most 20 character(s)"),
  serviceType: z
    .string({
      required_error: "Service Type is required!",
    })
    .min(3, "Service Type must contain at least 3 character(s)")
    .max(20, "Service Type must contain at most 20 character(s)"),
  salary: z
    .string({
      required_error: "Salary is required!",
    })
    .min(3, "Salary must contain at least 3 character(s)")
    .max(20, "Salary must contain at most 20 character(s)"),
});

// Gig Input Type
export type GigInputType = z.infer<typeof gigInputSchema>;
