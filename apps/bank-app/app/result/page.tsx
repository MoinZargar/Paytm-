import { Suspense } from 'react';
import Link from 'next/link';


export default function ResultPage({ searchParams }: { searchParams: { success:string, amount: string } }) {
  const amount = searchParams.amount || '0';
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">{searchParams.success === 'true' ? 'Payment Successful!' : 'Payment Failed'}</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <p className="text-lg mb-6">{searchParams.success === 'true' ? `Your payment of ${amount} has been processed successfully.` : `Your payment of ${amount} has failed.`}</p>
        </Suspense>
        <Link href={process.env.NEXT_PUBLIC_MERCHANT_URL + '/transfer'} className="text-indigo-600 hover:text-indigo-800">
          Continue to Transfer
        </Link>
      </div>
    </div>
  );
}
