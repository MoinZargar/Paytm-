import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .min(1, "Password is required")
});