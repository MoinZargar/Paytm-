import React from "react";
import { Button } from "./button.tsx"

interface AppbarProps {
    user?: {
        name?: string | null;
    },
   
    onSignin: () => Promise<void>,
    onSignout: () => Promise<void>
}

export function Appbar ({
    user,
    onSignin,
    onSignout
}: AppbarProps){
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}