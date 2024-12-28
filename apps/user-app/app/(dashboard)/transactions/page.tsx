import React from 'react';
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { get } from 'http';


const fetchTransactions = async () => {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        if (!userId) {
            throw new Error('User not found');
        }
        const transactions = await db.p2pTransfer.findMany({
            where: {
                OR: [
                    { fromUserId: Number(userId) },
                    { toUserId: Number(userId) },
                ],
            },
            include: {
                fromUser: { select: { name: true } },
                toUser: { select: { name: true } },
            },
            orderBy: { timestamp: 'desc' },
        });
        return transactions;
}


export default async function TransactionHistory () {

  const session = await getServerSession(authOptions);
  const transactions = await fetchTransactions();
  const userId = Number(session?.user?.id);
  if(!session) {
    return <div>Not authenticated</div>;
  }
  if(!transactions.length) {
    return <div className='w-full p-2'>No transactions found</div>;
}

 

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 border border-gray-200 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">{new Date(transaction.timestamp).toLocaleString()}</span>
                <h3 className="text-lg font-semibold">{transaction.fromUserId === userId ? 'Sent to' : 'Received from'} {transaction.fromUserId === userId ? transaction.toUser.name : transaction.fromUser.name}</h3>
              </div>
              <div className="text-right">
                <span className={`text-lg font-semibold ${transaction.fromUserId === userId ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.fromUserId === userId ? <span>&#8595;</span> : <span>&#8593;</span>} Rs&nbsp;{transaction.amount/100}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


