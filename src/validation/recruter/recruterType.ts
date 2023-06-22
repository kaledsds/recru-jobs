import { z } from "zod";

// Recruter Profile Type Schema
export const recruterTypeSchema = z.object({
  isOrganization: z.enum(["Organization", "Individual"], {
    required_error: "Please select one of the options",
    invalid_type_error: "Please select one of the options",
  }),
});

// Recruter Profile Type
export type RecruterTypeType = z.infer<typeof recruterTypeSchema>;
