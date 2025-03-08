import React from "react";

export default function ContainerXL({children, className}: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-screen-xl w-full ${className}`}>
      {children}
    </div>
  );
}
