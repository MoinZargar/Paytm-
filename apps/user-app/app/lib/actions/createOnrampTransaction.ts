"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from "axios";



export async function createOnRampTransaction(selectedBank: {
    name: string;
    redirectUrl: string;
} ,
    amount: number) {

    
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return {
                message: "You need to be logged in to perform this action"
            }
        }
        const provider = selectedBank?.name;
        //get the token from the bank
        const response = await axios.post(`${selectedBank?.redirectUrl}/api/token`, {
            amount,
            userId: session?.user?.id
        });
       
        const token = response.data.token;
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing",
                startTime: new Date(),
                token: token,
                userId: Number(session?.user?.id),
                amount: amount 
            }
        });
        return {
            token: token,
            status: 201
        };
    } catch (error:any) {
    
       throw new Error(error);
    }
}