import { Suspense } from 'react';
import Link from 'next/link';

export default function SuccessPage({ searchParams }: { searchParams: { amount: string } }) {
  const amount = searchParams.amount || '0';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <p className="text-lg mb-6">Your payment of ${amount} has been processed successfully.</p>
        </Suspense>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
