import { z } from "zod";

// Profile Info Schema
export const profileInfoSchema = z
  .object({
    isOrganization: z.boolean(),
    orgName: z.string().min(3).max(50),
    orgId: z.string(),
    fullName: z.string().min(3).max(50),
    cin: z.string().min(8).max(8),
    phone: z.string().min(10).max(10),
    email: z.string().email(),
    city: z.string().min(3).max(50),
    address: z.string().min(3).max(50),
    postalCode: z.string().min(4).max(4),
    linkedIn: z.string().url(),
    facebook: z.string(),
    twitter: z.string(),
    instagram: z.string(),
    website: z.string().url(),
  })
  // Check if isOrganization is true then orgName & orgId is required otherwise fullName & cin is required
  .refine((data) => {
    if (data.isOrganization) {
      return data.orgName && data.orgId;
    } else {
      return data.fullName && data.cin;
    }
  });

// Profile Info Type
export type ProfileInfoType = z.infer<typeof profileInfoSchema>;
