import { CircleDollarSignIcon, MapIcon } from 'lucide-react';
import Link from 'next/dist/client/link';
import React from 'react';

export default function Navigation() {
  return (
    <header
      className={
        'absolute top-1/2 -translate-y-1/2 left-12 z-50 bg-primary p-2 rounded-2xl flex flex-col gap-1'
      }
    >
      <Link href={'/map'} className={'transition group hover:bg-white p-2 rounded-lg'}>
        <MapIcon className={'transition text-white group-hover:text-primary'} size={32} />
      </Link>
      <Link href={'/map'} className={'transition group hover:bg-white p-2 rounded-lg'}>
        <CircleDollarSignIcon
          className={'transition text-white group-hover:text-primary'}
          size={32}
        />
      </Link>
    </header>
  );
}
