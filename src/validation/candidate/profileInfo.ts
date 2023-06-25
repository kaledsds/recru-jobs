import { z } from "zod";

// Profile Info Schema
export const profileInfoSchema = z.object({
  fullName: z.string().min(3).max(50),
  cin: z.string().min(8).max(8),
  expertise: z.string().min(3).max(50),
  phone: z.string().min(8).max(10),
  email: z.string().email(),
  city: z.string().min(3).max(50),
  address: z.string().min(3).max(50),
  postalCode: z.string().min(4).max(4),
  linkedIn: z.string().optional().or(z.string().url().optional()),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional().or(z.string().url().optional()),
});

// Profile Info Type
export type ProfileInfoType = z.infer<typeof profileInfoSchema>;
