import { z } from "zod";

// Edit Candidate Socials Schema
export const editCondidateSocialsSchema = z.object({
  linkedIn: z.string().optional().or(z.string().url().optional()),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional().or(z.string().url().optional()),
});

// Edit Candidate Socials Type
export type EditCondidateSocialsType = z.infer<
  typeof editCondidateSocialsSchema
>;
