import 'rc-slider/assets/index.css';

import SliderReact from 'rc-slider';
import React from 'react';

import Input from './Input';

export default function Slider({
  name,
  label,
  type,
  minLimit,
  minValue,
  setMin,
  maxLimit,
  maxValue,
  setMax,
  step,
  disabled,
  className,
  errorMessage,
}: {
  name: string;
  label?: string;
  type: 'slider' | 'range';
  minLimit: number;
  minValue: number;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  maxLimit: number;
  maxValue: number;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  disabled: boolean;
  className?: string;
  errorMessage: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={'flex items-center gap-4'}>
        <Input
          unit={'€'}
          min={minLimit}
          max={maxLimit}
          name={'min'}
          type={'number'}
          placeholder={''}
          value={minValue}
          setValue={setMin}
          errorMessage={''}
          className={'w-24 [&_input]:p-2'}
        />
        <SliderReact
          range={type === 'range'}
          value={type === 'range' ? [minValue, maxValue] : minValue}
          min={minLimit}
          max={maxLimit}
          step={step}
          disabled={disabled}
          id={name}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setMin(value[0]);
              setMax(value[1]);
            } else {
              setMin(value);
            }
          }}
          activeDotStyle={{ backgroundColor: 'var(--color-primary)' }}
          styles={{
            rail: { backgroundColor: '#D1D5DB' },
            track: { backgroundColor: 'var(--color-primary)' },
            handle: {
              borderColor: 'var(--color-primary)',
              opacity: 1,
              zIndex: 10,
            },
          }}
        />
        <Input
          unit={'€'}
          min={minLimit}
          max={maxLimit}
          name={'max'}
          type={'number'}
          placeholder={''}
          value={maxValue}
          setValue={setMax}
          errorMessage={''}
          className={'w-24 [&_input]:p-2'}
        />
      </div>

      {errorMessage && <span className={'text-danger'}>{errorMessage}</span>}
    </div>
  );
}
