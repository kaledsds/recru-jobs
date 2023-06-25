import { z } from "zod";

// Candidate Location Schema
export const candidateLocationSchema = z.object({
  city: z.string().min(3).max(50),
  address: z.string().min(3).max(50),
  postalCode: z.string().min(4).max(4),
});

// Candidate Location Type
export type CandidateLocationType = z.infer<typeof candidateLocationSchema>;
