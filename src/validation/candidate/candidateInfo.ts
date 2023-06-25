import { z } from "zod";

// Candidate Info Schema
export const candidateSchema = z.object({
  fullName: z.string().min(3).max(50),
  cin: z.string().min(8).max(8),
  expertise: z.string().min(8).max(8),
});

// Candidate Info Type
export type CandidateInfoType = z.infer<typeof candidateSchema>;