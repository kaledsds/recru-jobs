import { z } from "zod";

// Candidate Social Schema
export const candidateSocialsSchema = z.object({
  linkedIn: z.string().optional().or(z.string().url().optional()),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional().or(z.string().url().optional()),
});

// Candidate Social Type
export type CandidateSocialsType = z.infer<typeof candidateSocialsSchema>;
