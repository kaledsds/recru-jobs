import { z } from "zod";

// Edit Recruiter Info Schema
export const editRecruiterInfoSchema = z.object({
  fullName: z.string().min(3).max(50).optional(),
  orgName: z.string().min(3).max(50).optional(),
  phone: z.string().min(8).max(10).optional(),
  email: z.string().email().optional(),
  city: z.string().min(3).max(50).optional(),
  address: z.string().min(3).max(50).optional(),
  postalCode: z.string().min(4).max(4).optional(),
});

// Edit Recruiter Info Type
export type EditRecruiterInfoType = z.infer<typeof editRecruiterInfoSchema>;
