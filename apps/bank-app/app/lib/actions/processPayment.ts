import { BankTransactionType } from "@repo/validation/types";
import { bankTransactionSchema } from "@repo/validation/schemas";

export async function processPayment(paymentDetails: BankTransactionType, token: string, amount: number) {  
    try {
        const result = bankTransactionSchema.safeParse(paymentDetails);
        if (!result.success) {
            throw new Error("Invalid input");
        }
        //TODO: Implement payment processing logic
        //1. Find the user in the bank db using token
        //2. Check if payment deatils are valid
        //2. Check if the user has sufficient balance
        //3. Deduct the amount from the user's account
        //4. Update the transaction status to completed
    } catch (error:any) {
        throw new Error(error.message);
        
    }
    


}