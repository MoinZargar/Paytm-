import { Card } from "@repo/ui/card"
import { OnRampStatus } from "@prisma/client"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatus,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div key={t.time.toString()} className="flex justify-between items-center">
                <div className="text-sm">
                    {t.time.toLocaleString()}
                </div>
                <div className="text-lg font-bold text-right">
                    <span className="align-middle">+</span><span className="align-middle">Rs</span> <span className="align-middle">{(t.amount / 100).toLocaleString()}</span>
                </div>
                <div className={`text-lg ${t.status === OnRampStatus.Success ? 'text-green-500' : t.status === OnRampStatus.Processing ? 'text-blue-500' : 'text-red-500'}`}>
                    {t.status}
                </div>
            </div>)}
        </div>
    </Card>
}