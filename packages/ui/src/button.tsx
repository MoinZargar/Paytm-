"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button ({ type, disabled=false, children }: ButtonProps) {
  return (
    <button  type={type} disabled={disabled} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>

  );
};