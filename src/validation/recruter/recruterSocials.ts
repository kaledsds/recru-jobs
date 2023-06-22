import { z } from "zod";

// Recruter Social Schema
export const recruterSocialsSchema = z.object({
  linkedIn: z.string().optional().or(z.string().url().optional()),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional().or(z.string().url().optional()),
});

// Recruter Social Type
export type RecruterSocialsType = z.infer<typeof recruterSocialsSchema>;
