import { z } from "zod";

// Report Input Schema
export const reportInputSchema = z.object({
  id: z.string(),
  reason: z
    .string({
      required_error: "message is required!",
    })
    .min(10, "message contain at least 3 character(s)")
    .max(300, "message contain at most 20 character(s)"),
});

// report Input Type
export type ReporttInputType = z.infer<typeof reportInputSchema>;
