"use client";
import Image, { type ImageProps } from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()
  return (
    <div className="text-2xl">
      
    </div>
  );
}
