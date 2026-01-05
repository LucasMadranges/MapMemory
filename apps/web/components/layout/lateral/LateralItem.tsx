import React from 'react';

import Badges from '../../badge/Badges';

export default function LateralItem() {
  return (
    <div
      className={
        'border border-gray-300 rounded-lg p-2 flex flex-col gap-1 transition hover:bg-gray-100 cursor-pointer'
      }
    >
      <span className={'font-semibold'}>PandaWok</span>
      <span className={'text-gray-400 text-sm'}>18 rue Beaucourt Decourchelles</span>
      <span className={'text-gray-400 text-sm'}>59800, Lille</span>
      <div className={'flex flex-wrap gap-2'}>
        <Badges />
        <Badges />
        <Badges />
      </div>
    </div>
  );
}
