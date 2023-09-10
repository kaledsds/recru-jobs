import { z } from "zod";

// Contact Input Schema
export const contactInputSchema = z.object({
  fullName: z
    .string({
      required_error: "Name is required!",
    })
    .min(3, "Name must contain at least 3 character(s)")
    .max(20, "Name must contain at most 20 character(s)"),
  email: z
    .string({
      required_error: "email is required!",
    })
    .email(),
  subject: z
    .string({
      required_error: "Subject is required!",
    })
    .min(3, "Subject must contain at least 3 character(s)")
    .max(20, "Subject must contain at most 20 character(s)"),
  message: z
    .string({
      required_error: "message is required!",
    })
    .min(10, "message contain at least 3 character(s)")
    .max(300, "message contain at most 20 character(s)"),
});

// Contact Input Type
export type ContactInputType = z.infer<typeof contactInputSchema>;
