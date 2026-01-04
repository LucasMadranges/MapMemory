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
    ${variant === 'primary' && 'bg-primary hover:bg-primary-dark text-white'}
    ${variant === 'secondary' && 'bg-secondary hover:bg-gray-200 text-black border border-primary transition'}
    ${variant === 'tertiary' && 'bg-transparent text-black'}
    ${disabled && 'opacity-50 cursor-not-allowed'}`}
    >
      {children}
    </button>
  );
}
