import { z } from "zod";

// Edit job post Schema
export const editJobPostSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "Job title must contain at least 3 character(s)")
    .max(20, "Job title must contain at most 20 character(s)")
    .optional(),
  description: z
    .string()
    .min(3, "Job description must contain at least 3 character(s)")
    .max(100, "Job position must contain at most 20 character(s)")
    .optional(),
  yearsOfExperience: z
    .string()
    .min(3, "Job position must contain at least 3 character(s)")
    .max(20, "Job position must contain at most 20 character(s)")
    .optional(),
  type: z
    .string()
    .min(3, "type must contain at least 3 character(s)")
    .max(20, "type must contain at most 20 character(s)")
    .optional(),
  salary: z
    .string()
    .min(3, "Salary must contain at least 3 character(s)")
    .max(20, "Salary must contain at most 20 character(s)")
    .optional(),
  hoursofwork: z
    .string()
    .min(3, "hours of work must contain at least 3 character(s)")
    .max(20, "hours of work must contain at most 20 character(s)")
    .optional(),
  location: z
    .string()
    .min(3, "Job location must contain at least 3 character(s)")
    .max(20, "Job location must contain at most 20 character(s)")
    .optional(),
});

// Edit job post Type
export type EditJobPostType = z.infer<typeof editJobPostSchema>;
