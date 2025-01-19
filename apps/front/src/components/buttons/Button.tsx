import React, {MouseEventHandler} from "react";

export default function Button({children, type, onClick, className}: {
  children: React.ReactNode,
  type: "primary" | "secondary" | "tertiary",
  onClick: MouseEventHandler
  className?: string
}) {
  return (
    <button onClick={onClick}
            className={`rounded-full w-full transition ${className} active:scale-95
                        ${type === "primary" && "bg-blue-500 text-white hover:bg-blue-600"}
                        ${type === "secondary" && "bg-white text-blue-500 border border-blue-500 hover:bg-gray-100"}
                        ${type === "tertiary" && "bg-white text-blue-500 hover:bg-gray-100"}`}>
      {children}
    </button>
  );
}
