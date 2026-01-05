import React from 'react';

import Button from '../../button/Button';
import LateralFilters from './LateralFilters';
import LateralItem from './LateralItem';
import LateralPagination from './LateralPagination';

export default function Lateral() {
  return (
    <div className={'flex flex-col bg-white -ml-4 pl-6 p-2 rounded-r-2xl w-[400px]'}>
      <div className={'flex-1'}>
        <LateralFilters />
        <hr className={'my-4 border-gray-300'} />
        <LateralItem />
      </div>
      <LateralPagination />
      <hr className={'my-4 border-gray-300'} />
      <Button variant={'primary'} className={'w-full'}>
        Ajouter un lieu
      </Button>
    </div>
  );
}
