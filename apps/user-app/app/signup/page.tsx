'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SignupSchema } from '@repo/validation/schemas';
import { SignupInput } from '@repo/validation/types';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema)
  });

  const onSubmit = async (data: SignupInput) => {
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post('/api/auth/signup', data);
      console.log(response.data);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Internal server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-sm space-y-2">
            <p>Account created successfully!</p>
            <p>
              Sign in to continue. {' '}
              <Link href="/signin" className="text-green-800 underline hover:text-green-900">
                Click here
              </Link>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
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
            Sign Up
          </button>

          <p className="text-center text-md text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
