import db from "@repo/db/client";
import { Request, Response } from "express";

const bankWebhook = async (req :Request , res :Response) => {
    const paymentInformation: {
        token: string;
        amount: string
        secret: string
    } = {
        token: req.body.token,
        amount: req.body.amount,
        secret: req.body.secret
    };
    
    try {

        if(paymentInformation.secret !== process.env.BANK_SECRET_KEY) {
            throw new Error("Unauthorized request"); 
        }
        const transaction = await db.onRampTransaction.findUnique({
            where: {
                token: paymentInformation.token
            }
        });
        if(!transaction) {
            throw new Error("Transaction not found");
        }
        //check if the transaction is already processed
        if(transaction.status === "Success") {
            throw new Error("Transaction already processed");
        }
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(transaction?.userId)
                },
                data: {
                    amount: {
                       
                        increment: Number(paymentInformation.amount)*100
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.status(200).json({
            message: "Captured"
        })
    } catch(e) {
        console.log(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
}

export { bankWebhook }