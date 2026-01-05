import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import React, { useState } from 'react';

export default function Input<T extends string | number>({
  name,
  type,
  placeholder,
  value,
  setValue,
  errorMessage,
  className = '',
  onClearError,
}: {
  name: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  placeholder: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  errorMessage: string | undefined;
  className?: string;
  onClearError?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const convertedValue = type === 'number' ? Number(inputValue) : inputValue;
    setValue(convertedValue as T);

    if (errorMessage && onClearError) {
      onClearError();
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={name}>{placeholder}</label>

        <div className="relative">
          <input
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className="rounded-md border border-gray-300 p-2 w-full pr-10"
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
          />

          {type === 'password' && (
            <button
              type={'button'}
              onClick={handleShowPassword}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
            </button>
          )}
        </div>

        {errorMessage && <span className={'text-danger'}>{errorMessage}</span>}
      </div>
    </>
  );
}
