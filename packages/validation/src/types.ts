import * as z from "zod";
import { SignupSchema } from "./schemas";
import { SigninSchema } from "./schemas";
import { AddMoneySchema } from "./schemas";
import { bankTransactionSchema } from "./schemas";

export type SignupType = z.infer<typeof SignupSchema>;
export type SigninType = z.infer<typeof SigninSchema>;
export type AddMoneyType = z.infer<typeof AddMoneySchema>;
export type BankTransactionType = z.infer<typeof bankTransactionSchema>;