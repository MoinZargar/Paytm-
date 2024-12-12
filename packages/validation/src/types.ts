import * as z from "zod";
import { SignupSchema } from "./schemas";

export type SignupInput = z.infer<typeof SignupSchema>;