import * as z from "zod";
import { SignupSchema } from "./schemas";
import { SigninSchema } from "./schemas";

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;