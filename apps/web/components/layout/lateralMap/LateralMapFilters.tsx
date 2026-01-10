'use client';
import React, { useEffect, useState } from 'react';

import { clientApi } from '../../../utils/api/clientApi';
import Button from '../../button/Button';
import MultiSelect from '../../input/MultiSelect';
import Slider from '../../input/Slider';

export default function LateralMapFilters() {
  const [item, setItem] = useState<{ value: string; label: string; color: string }[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string; color: string }[]>([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  useEffect(() => {
    const getMainTypes = async () => {
      try {
        const response = await clientApi.get('/mainTypes');
        console.log(response.data);
        const items = response.data.map((type: { id: number; name: string; color: string }) => ({
          value: type.id,
          label: type.name,
          color: type.color,
        }));

        setOptions(items);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    getMainTypes();
  }, []);

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
        />
        <div className={'flex gap-2 items-center justify-end'}>
          <Button variant={'tertiary'}>Effacer</Button>
          <Button variant={'primary'}>Appliquer</Button>
        </div>
      </div>
    </>
  );
}
