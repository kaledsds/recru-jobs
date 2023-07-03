import { z } from "zod";

// Edit Candidate Info Schema
export const editCondidateInfoSchema = z.object({
  fullName: z.string().min(3).max(50).optional(),
  expertise: z.string().min(3).max(50).optional(),
  phone: z.string().min(8).max(10).optional(),
  email: z.string().email().optional(),
  city: z.string().min(3).max(50).optional(),
  address: z.string().min(3).max(50).optional(),
  postalCode: z.string().min(4).max(4).optional(),
});

// Edit Candidate Info Type
export type EditCondidateInfoType = z.infer<typeof editCondidateInfoSchema>;
