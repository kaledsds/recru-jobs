import { z } from "zod";

// Edit Recruiter Socials Schema
export const editRecruiterSocialsSchema = z.object({
  linkedIn: z.string().optional().or(z.string().url().optional()),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional().or(z.string().url().optional()),
});

// Edit Recruiter Socials Type
export type EditRecruiterSocialsType = z.infer<
  typeof editRecruiterSocialsSchema
>;
