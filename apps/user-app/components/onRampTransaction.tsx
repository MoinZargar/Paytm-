import { Card } from "@repo/ui/card"


export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
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
    return <Card title="Recent Wallet Transactions">
        <div className="pt-2">
            {transactions.map(t => <div key={t.time.toString()} className="flex justify-between items-center">
                <div className="text-sm">
                    {t.time.toLocaleString()}
                </div>
                <div className="text-lg font-bold text-right">
                    <span className="align-middle">+</span><span className="align-middle">Rs</span> <span className="align-middle">{(t.amount / 100).toLocaleString()}</span>
                </div>
                <div className={`text-lg ${t.status === "Success" ? 'text-green-500' : t.status === "Processing" ? 'text-blue-500' : 'text-red-500'}`}>
                    {t.status}
                </div>
            </div>)}
        </div>
    </Card>
}