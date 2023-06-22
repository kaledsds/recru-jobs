import { z } from "zod";

// Recruter Org Info Schema
export const recruterOrgSchema = z.object({
  orgName: z.string().min(3).max(50),
  orgId: z.string().min(3).max(50),
});

// Recruter Org Info Type
export type RecruterOrgType = z.infer<typeof recruterOrgSchema>;

// Recruter Non Org Info Schema
export const recruterNonOrgSchema = z.object({
  fullName: z.string().min(3).max(50),
  cin: z.string().min(8).max(8),
});

// Recruter Org Info Type
export type RecruterNonOrgType = z.infer<typeof recruterNonOrgSchema>;
