"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onclick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button ({ type="button", onclick,disabled=false, children }: ButtonProps) {
  return (
    <button  type={type} onClick={onclick} disabled={disabled} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>

  );
};