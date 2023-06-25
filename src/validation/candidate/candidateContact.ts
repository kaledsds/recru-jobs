import { z } from "zod";

// Candidate Contact Schema
export const candidateContactSchema = z.object({
  phone: z.string().min(8).max(10),
  email: z.string().email(),
});

// Candidate Contact Type
export type CandidateContactType = z.infer<typeof candidateContactSchema>;
