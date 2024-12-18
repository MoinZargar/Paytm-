"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendMoneySchema } from "@repo/validation/schemas";
import { SendMoneyType } from "@repo/validation/types";
import { Input } from "@repo/ui/input";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useState } from 'react';

export function SendCard() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SendMoneyType>({
        resolver: zodResolver(SendMoneySchema),
        defaultValues: {
            mobileNumber: "",
            amount: 0
        }
    });
    const onSubmit = async (data: SendMoneyType) => {
       
        setError(null); 
        setSuccess(false);
        setAmount(data.amount);
        
        try {
            const amount = Number(data.amount)*100;
            const response = await p2pTransfer(data.mobileNumber, amount);
            console.log(response);
            setSuccess(true);
        } catch (error: any) {
            console.error(error);
            setError(error.message); 
        }
    }
    return <div className="h-[90vh]">
        <Center>
            {success ? (
                <Card title="Payment Successful">
                    <div className="text-green-500 text-base p-2">
                        <p>Payment of {amount} is successful</p>
                    </div>
                </Card>
            ) : (
                <Card title="Send">
                    <form onSubmit={handleSubmit(onSubmit)} className="min-w-72 pt-2">
                        <Controller
                            name="mobileNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type={"text"}
                                    placeholder={"Mobile Number"}
                                    label="Mobile Number"
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.mobileNumber && (
                            <div className="text-red-500 text-sm">
                                {errors.mobileNumber.message}
                            </div>
                        )}
                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type={"number"}
                                    placeholder={"Amount"}
                                    label="Amount"
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.amount && (
                            <div className="text-red-500 text-sm">
                                {errors.amount.message}
                            </div>
                        )}
                        {error && (
                            <div className="text-red-500 text-base">
                                {error}
                            </div>
                        )}
                        <div className="pt-4 flex justify-center">
                            <Button type={"submit"} disabled={isSubmitting}>Send</Button>
                        </div>
                    </form>
                </Card>
            )}
        </Center>
    </div>
}