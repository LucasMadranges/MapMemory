import React from 'react';

export default function Button({
  children,
  className = '',
  type,
  variant,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'button';
  variant: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`cursor-pointer transition
       px-4 py-2 rounded-lg ${className}
    ${variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark'}
    ${variant === 'secondary' && 'bg-secondary text-black border border-primary'}
    ${variant === 'tertiary' && 'bg-transparent text-black'}
    ${disabled && 'opacity-50 cursor-not-allowed'}`}
    >
      {children}
    </button>
  );
}
