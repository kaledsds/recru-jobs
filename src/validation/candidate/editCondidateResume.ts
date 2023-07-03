import { z } from "zod";

// Candidate Resume Schema
export const editCandidateResumeSchema = z.object({
  resume: z.string().url(),
});

// Candidate Resume Type
export type EditCandidateResumeType = z.infer<typeof editCandidateResumeSchema>;
