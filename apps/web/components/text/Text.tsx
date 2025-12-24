import React from 'react';

export default function Text({
  children,
  className = '',
  type,
}: {
  children: React.ReactNode;
  className?: string;
  type: string;
}) {
  return <span className={className}>{children}</span>;
}
