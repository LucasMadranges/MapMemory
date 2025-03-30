'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function Textarea({
  name,
  label,
  placeholder,
  value,
  rows,
  cols,
  containerClassName,
  textareaClassName,
  onChange,
}: {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  rows?: number | 10;
  cols?: number | 5;
  containerClassName?: string;
  textareaClassName?: string;
  onChange: React.ChangeEventHandler;
}) {
  const refTextarea = useRef(null);

  // Focus animation
  function handleFocus() {
    gsap.to(refTextarea.current, {
      borderColor: '#1e3a8a',
    });
  }

  function handleBlur() {
    gsap.to(refTextarea.current, {
      borderColor: '#d1d5db',
    });
  }

  return (
    <div className={containerClassName}>
      <label htmlFor={name} className={'inline-block pb-2'}>
        {label}
      </label>
      <div className={'relative'}>
        <textarea
          id={name}
          name={name}
          ref={refTextarea}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          value={value}
          className={`border border-gray-300 rounded-lg w-full p-2 focus-visible:outline-0 ${textareaClassName}`}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
        />
      </div>
    </div>
  );
}
