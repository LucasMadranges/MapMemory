import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function MultiSelect({
  label,
  name,
  containerClassName,
}: {
  label: string;
  name: string;
  containerClassName?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={containerClassName}>
      <label htmlFor={name} className={'inline-block pb-2'}>
        {label}
      </label>
      {/* Afficher Select uniquement côté client après le montage */}
      {isMounted ? (
        <Select options={options} isMulti className={'rounded-full'} />
      ) : (
        <div className="select-placeholder">Loading...</div>
      )}
    </div>
  );
}
