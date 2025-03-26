import React from "react";

export default function ContainerSM({children, className}: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-screen-sm w-full ${className}`}>
      {children}
    </div>
  );
}
