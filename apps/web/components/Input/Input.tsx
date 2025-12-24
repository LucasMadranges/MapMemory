import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import React, { useState } from 'react';

export default function Input({
  name,
  type,
  placeholder,
}: {
  name: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  placeholder: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
    setIsShowPassword(!isShowPassword);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor={name}>{placeholder}</label>

        <div className="relative">
          <input
            id={name}
            name={name}
            className="rounded-md border border-gray-300 p-2 w-full pr-10"
            type={isShowPassword ? 'text' : type}
            placeholder={placeholder}
          />

          {type === 'password' && (
            <button
              onClick={handleShowPassword}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
