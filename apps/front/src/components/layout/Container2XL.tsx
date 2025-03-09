import React from "react";

export default function Container2XL({children, className}: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-screen-2xl w-full ${className}`}>
      {children}
    </div>
  );
}
