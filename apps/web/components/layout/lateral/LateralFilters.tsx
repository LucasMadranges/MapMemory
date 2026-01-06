import React, { useState } from 'react';

import MultiSelect from '../../input/MultiSelect';

export default function LateralFilters() {
  const [item, setItem] = useState<{ value: string; label: string }[]>([]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <MultiSelect
      name={'categorie'}
      type={'single'}
      placeholder={'Catégorie'}
      value={item}
      setValue={setItem}
      options={options}
      errorMessage={''}
    />
  );
}
