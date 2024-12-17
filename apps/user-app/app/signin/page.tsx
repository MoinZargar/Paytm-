'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SigninSchema } from '@repo/validation/schemas';
import { SigninType } from '@repo/validation/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninType>({
    resolver: zodResolver(SigninSchema)
  });

  const onSubmit = async (data: SigninType) => {
    setError(null);
    try {
      const response = await signIn('credentials', {
        mobileNumber: data.mobileNumber,
        password: data.password,
        redirect: false
      });

      if (response?.error) {
        setError('Invalid mobile number or password');
        return;
      }

      router.push('/');
    } catch (err: any) {
      setError('Internal server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="mobileNumber" className="block text-base font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="text"
              {...register('mobileNumber')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {errors.mobileNumber && (
              <p className="mt-2 text-sm text-red-600">{errors.mobileNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
