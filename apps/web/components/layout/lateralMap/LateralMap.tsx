'use client';
import React, { useState } from 'react';

import Button from '../../button/Button';
import LateralMapFilters from './LateralMapFilters';
import LateralMapForm from './LateralMapForm';
import LateralMapItem from './LateralMapItem';
import LateralMapPagination from './LateralMapPagination';

export default function LateralMap() {
  const [isFormActive, setIsFormActive] = useState(false);

  return (
    <div className={'flex flex-col bg-white -ml-4 pl-6 p-2 rounded-r-2xl w-[400px]'}>
      {!isFormActive && (
        <>
          <div className={'flex-1'}>
            <LateralMapFilters />
            <hr className={'my-4 border-gray-300'} />
            <LateralMapItem />
          </div>
          <LateralMapPagination />
          <hr className={'my-4 border-gray-300'} />
          <Button onClick={() => setIsFormActive(true)} variant={'primary'} className={'w-full'}>
            Ajouter un lieu
          </Button>
        </>
      )}
      {isFormActive && <LateralMapForm setIsFormActive={setIsFormActive} />}
    </div>
  );
}
