import React, { useState } from 'react';

import MultiSelect from '../../input/MultiSelect';
import Slider from '../../input/Slider';

export default function LateralFilters() {
  const [item, setItem] = useState<{ value: string; label: string }[]>([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <MultiSelect
          name={'categorie'}
          type={'multi'}
          placeholder={'Catégorie'}
          value={item}
          setValue={setItem}
          options={options}
          errorMessage={''}
        />
        <Slider
          type={'range'}
          name={'slider'}
          minLimit={0}
          minValue={min}
          setMin={setMin}
          maxLimit={100}
          maxValue={max}
          setMax={setMax}
          step={1}
          disabled={false}
          errorMessage={''}
        />
      </div>
    </>
  );
}
