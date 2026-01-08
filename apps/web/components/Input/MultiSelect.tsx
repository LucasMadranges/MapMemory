import React from 'react';
import Select from 'react-select';

export default function MultiSelect({
  name,
  type,
  options,
  label,
  placeholder,
  value,
  setValue,
  errorMessage,
  className,
}: {
  name: string;
  type: 'single' | 'multi';
  options: Array<{ value: string; label: string }>;
  label?: string;
  placeholder: string;
  value: Array<{ value: string; label: string }>;
  setValue: React.Dispatch<React.SetStateAction<Array<{ value: string; label: string }>>>;
  errorMessage: string | undefined;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        isMulti={type === 'multi'}
        instanceId={name}
        name={'label'}
        id={'label'}
        value={value}
        onChange={(newValue) => setValue(newValue as Array<{ value: string; label: string }>)}
        placeholder={placeholder}
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#D1D5DB',
            borderRadius: '8px',
            zIndex: 50,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
        }}
      />

      {errorMessage && <span className={'text-danger'}>{errorMessage}</span>}
    </div>
  );
}
