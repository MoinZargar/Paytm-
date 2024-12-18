"use server";
import { BankTransactionType } from "@repo/validation/types";
import { bankTransactionSchema } from "@repo/validation/schemas";
import axios from "axios";


export async function processPayment(paymentDetails: BankTransactionType, token: string, amount: number) {  
    try {
        const result = bankTransactionSchema.safeParse(paymentDetails);
        if (!result.success) {
            throw new Error("Invalid credit card details");
        }
        //TODO: Implement payment processing logic
        //1. Find the user in the bank db using token
        //2. Check if payment deatils are valid
        //2. Check if the user has sufficient balance
        //3. Deduct the amount from the user's account
        //4. Update the transaction status to completed
    
        const response = await axios.post(`${process.env.MERCHANT_WEBHOOK_URL}/api/v1/webhook`, {
            token: token,
            amount: amount,
            secret:process.env.BANK_SECRET_KEY
        });
       
    } catch (error:any) {
        throw new Error(error.message);
        
    }
    


}