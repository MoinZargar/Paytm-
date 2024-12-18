import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border-2 border-gray-300 p-4 rounded-lg shadow-md"
    >
      <h1 className="text-lg border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}