import React from 'react';
import Select from 'react-select';

export default function MultiSelect({
  name,
  type,
  options,
  placeholder,
  value,
  setValue,
  errorMessage,
  className,
}: {
  name: string;
  type: 'single' | 'multi';
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  value: Array<{ value: string; label: string }>;
  setValue: React.Dispatch<React.SetStateAction<Array<{ value: string; label: string }>>>;
  errorMessage: string | undefined;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name}>{placeholder}</label>
      <Select
        instanceId={name}
        name={'label'}
        id={'label'}
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#D1D5DB',
            borderRadius: '8px',
          }),
        }}
      />

      {errorMessage && <span className={'text-danger'}>{errorMessage}</span>}
    </div>
  );
}
