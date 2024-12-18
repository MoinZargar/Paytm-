import React from "react";
import { Button } from "./button";
import { ArrowRight, Wallet, RefreshCw, Shield } from 'lucide-react'


interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => Promise<void>,
    onSignout: () => Promise<void>
}

export function Appbar({
    user,
    onSignin,
    onSignout
}: AppbarProps) {
    return <div className="flex justify-between border-b px-4">
        <div className="px-4 lg:px-6 h-14 flex items-center">

            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">PayWallet</span>


        </div>
        <div className="flex flex-col justify-center pt-2">
            <div className="flex items-center">
                {user && <span className="text-gray-600 text-lg font-bold mr-4">Welcome, {user.name}</span>}
                <Button type="button" onclick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    </div>
}