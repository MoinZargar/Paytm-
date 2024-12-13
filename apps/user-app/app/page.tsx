"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()
  return (
    <div className="text-2xl">
      <Appbar user={session.data?.user} onSignin={() => {}} onSignout={() => {}} />
      Hello Moin from user-app
      {JSON.stringify(session)}
    </div>
  );
}
