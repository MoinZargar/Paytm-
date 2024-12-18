"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { Input } from "@repo/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupportedBanks } from "@repo/validation/constants";
import { AddMoneySchema } from "@repo/validation/schemas";
import { AddMoneyType } from "@repo/validation/types";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { useState } from 'react';

export const AddMoney = () => {
    const [error, setError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<AddMoneyType>({
        resolver: zodResolver(AddMoneySchema),
        defaultValues: {
            amount: 0,
            bankName: SupportedBanks[0]?.name
        }
    });

    const onSubmit = async (data: AddMoneyType) => {
        try {
            const selectedBank = SupportedBanks.find(x => x.name === data.bankName);
            if (!selectedBank) {
                setError('Bank not found');
                return;
            }
            //store the amount in paisa in db 
            const amount = Number(data.amount) * 100;
            const response = await createOnRampTransaction(selectedBank, amount);
         
            const redirectUrl = `${selectedBank.redirectUrl}?token=${response.token}&amount=${data.amount}`;
            window.location.href = redirectUrl;
        } catch (error: any) {
            setError('Something went wrong: ' + error.message);
        }
    };

    return (
        <Card title="Add Money">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Amount"
                            type="number"
                            placeholder="Enter amount"
                            onChange={field.onChange}

                        />
                    )}
                />
                {errors?.amount && (

                    <div className="text-red-500 text-sm">
                        {errors.amount.message}
                    </div>

                )}
                <div className="py-4 text-left">Bank</div>

                <Controller
                    name="bankName"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={SupportedBanks.map(x => ({
                                key: x.name,
                                value: x.name
                            }))}
                            onSelect={field.onChange}
                        />
                    )}
                />
                {errors?.bankName && (

                    <div className="text-red-500 text-sm">
                        {errors.bankName.message}
                    </div>

                )}
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}
                <div className="flex justify-center pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing' : 'Add Money'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};