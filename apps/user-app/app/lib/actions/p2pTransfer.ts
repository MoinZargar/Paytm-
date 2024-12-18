"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    try {
        const session = await getServerSession(authOptions);
        const from = session?.user?.id;
        if (!from) {
            throw new Error("Something went wrong. Please try again");
        }
        const toUser = await prisma.user.findFirst({
            where: {
                mobileNumber: to
            }
        });
    
        if (!toUser) {
            throw new Error('User not found');
        }
        await prisma.$transaction(async (tx) => {
            //for locking the row to aviod simultaneous transactions
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
              });
              if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient balance');
              }
              
              await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
              });
    
              await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
              });

              await tx.p2pTransfer.create({
                data: {
                  amount,
                  timestamp: new Date(),
                  fromUserId: Number(from),
                  toUserId : toUser.id
                },
              });
        });
        return {
            message: "Transfer successful"
        }
    } catch (error:any) {
        throw new Error(error);
        
    }
}