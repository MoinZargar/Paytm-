'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bankTransactionSchema } from '@repo/validation/schemas';
import { BankTransactionType } from '@repo/validation/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { processPayment } from './lib/actions/processPayment';
import { Suspense } from 'react';

// Wrapper component to handle searchParams
function TransactionPageContent() {
  const router = useRouter();

  // Client-side searchParams hook usage
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const amount = searchParams.get('amount');

  const { register, handleSubmit, formState: { errors } } = useForm<BankTransactionType>({
    resolver: zodResolver(bankTransactionSchema)
  });

  const onSubmit = async (data: BankTransactionType) => {
    try {
      if (!token || !amount) {
        throw new Error('Token not found or amount not found');
      }
      await processPayment(data, token, Number(amount));
      router.push(`/result?success=true&amount=${amount}`);
    } catch (error) {
      console.error('Something went wrong:', error);
      router.push(`/result?success=false&amount=${amount}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Bank Transaction</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              {...register('cardNumber')}
              type="text"
              id="cardNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>}
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              {...register('expiryDate')}
              type="text"
              id="expiryDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="MM/YY"
            />
            {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>}
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              {...register('cvv')}
              type="text"
              id="cvv"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="123"
            />
            {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
          </div>
          {amount &&
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-lg font-semibold">Amount to be debited: Rs {amount}</p>
            </div>
          }
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}



export default function TransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionPageContent />
    </Suspense>
  );
}