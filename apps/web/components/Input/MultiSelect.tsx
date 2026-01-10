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
  disabled = false,
  className,
}: {
  name: string;
  type: 'single' | 'multi';
  options: Array<{ value: string; label: string; color: string }>;
  label?: string;
  placeholder: string;
  value: Array<{
    color: string;
    value: string;
    label: string;
  }>;
  setValue: React.Dispatch<
    React.SetStateAction<Array<{ value: string; label: string; color: string }>>
  >;
  errorMessage?: string | undefined;
  className?: string;
  disabled?: boolean;
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
        onChange={(newValue) =>
          setValue(newValue as Array<{ value: string; label: string; color: string }>)
        }
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#D1D5DB',
            borderRadius: '8px',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
          option: (base, { data }) => {
            return {
              ...base,
              backgroundColor: data.color,
            };
          },
        }}
      />

      {errorMessage && <span className={'text-danger'}>{errorMessage}</span>}
    </div>
  );
}
