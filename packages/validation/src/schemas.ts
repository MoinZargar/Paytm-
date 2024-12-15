import { z } from "zod";
import { SupportedBanks } from "./lib/constants";

export const SignupSchema = z.object({
  name: z.string()
    .min(4, "Name must be at least 4 characters")  
    .max(30, "Name must be at most 30 characters"),
  email: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must be at most 20 characters")
});

export const SigninSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must be at most 20 characters")
}); 

export const AddMoneySchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),
  bankName: z
    .string({
      required_error: "Please select a bank",
    })
    .refine(
      (val) => SupportedBanks.some((bank) => bank.name === val),
      "Please select a valid bank"
    ),
});


export const bankTransactionSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
});
