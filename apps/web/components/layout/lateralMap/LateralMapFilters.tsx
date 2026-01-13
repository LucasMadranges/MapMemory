'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { clientApi } from '../../../utils/api/clientApi';
import { MainTypes } from '../../../utils/types/mainTypes';
import { MultiSelectTypes } from '../../../utils/types/multiSelectTypes';
import { SubTypes } from '../../../utils/types/subTypes';
import Button from '../../button/Button';
import MultiSelect from '../../input/MultiSelect';
import Slider from '../../input/Slider';

export default function LateralMapFilters() {
  const [mainTypes, setMainTypes] = useState<MainTypes[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<MultiSelectTypes[]>([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  useEffect(() => {
    async function getMainTypes() {
      try {
        const response = await clientApi.get('/mainTypes');
        setMainTypes(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    }

    getMainTypes();
  }, []);

  const displayOptions = useMemo(() => {
    let options: MultiSelectTypes[] = [];

    if (selectedTypes.length === 2) return options;

    mainTypes.forEach((type: MainTypes) => {
      options.push({
        value: type.id,
        label: type.label,
        color: type.color,
        isSub: false,
      });
    });

    selectedTypes.forEach((selected) => {
      if (!selected.isSub) {
        const mainType = mainTypes.find((type) => type.id === selected.value);

        if (mainType?.edges.sub_types) {
          options = [];

          mainType.edges.sub_types.forEach((subType: SubTypes) => {
            options.push({
              value: `sub-${subType.id}`,
              label: subType.label,
              color: subType.color,
              isSub: true,
              parentId: mainType.id,
            });
          });
        }
      }
    });

    return options;
  }, [mainTypes, selectedTypes]);

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <MultiSelect
          name={'categorie'}
          type={'multi'}
          placeholder={'Catégorie'}
          value={selectedTypes}
          setValue={setSelectedTypes}
          options={displayOptions}
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
