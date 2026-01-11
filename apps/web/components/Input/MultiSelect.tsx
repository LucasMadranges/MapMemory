import chroma from 'chroma-js';
import React from 'react';
import Select from 'react-select';

import { getTextColor } from '../../utils/color/getTextColor';
import { MultiSelectTypes } from '../../utils/types/multiSelectTypes';

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
  options: MultiSelectTypes[];
  label?: string;
  placeholder: string;
  value: MultiSelectTypes[];
  setValue: React.Dispatch<React.SetStateAction<MultiSelectTypes[]>>;
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
        onChange={(newValue) => setValue(newValue as MultiSelectTypes[])}
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
          option: (base, { data }) => ({
            ...base,
            backgroundColor: chroma(data.color).alpha(0.1).css(),
            color: data.color,
            ':hover': { backgroundColor: chroma(data.color).alpha(0.3).css() },
          }),
          multiValue: (base, { data }) => ({
            ...base,
            backgroundColor: data.color,
            color: getTextColor(data.color),
            borderRadius: '6px',
          }),
          multiValueLabel: (base, { data }) => ({
            ...base,
            color: getTextColor(data.color),
            lineHeight: '20px',
            padding: '0 4px 0 8px',
            borderRadius: '6px',
          }),
          multiValueRemove: (base, { data }) => ({
            ...base,
            borderRadius: '6px',
            ':hover': {
              backgroundColor: chroma(data.color).darken(0.8).css(),
              color: 'white',
            },
          }),
        }}
      />

      {errorMessage && <span className={'text-danger'}>{errorMessage}</span>}
    </div>
  );
}
