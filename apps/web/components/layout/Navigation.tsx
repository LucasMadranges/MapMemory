import { CircleDollarSignIcon, MapIcon, ServerIcon } from 'lucide-react';
import React from 'react';

import Lateral from './Lateral';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  return (
    <header className={'h-full absolute top-0 left-0 z-10 p-4 flex'}>
      <div className={'h-full bg-primary p-2 rounded-2xl flex flex-col gap-1 z-10'}>
        <NavigationLink textContent={'Map'} href={'/map'}>
          <MapIcon className={'transition text-white group-hover:text-primary'} size={32} />
        </NavigationLink>
        <NavigationLink textContent={'Budget'} href={'/budget'}>
          <CircleDollarSignIcon
            className={'transition text-white group-hover:text-primary'}
            size={32}
          />
        </NavigationLink>
        <NavigationLink textContent={'Server'} href={'/server'}>
          <ServerIcon className={'transition text-white group-hover:text-primary'} size={32} />
        </NavigationLink>
      </div>

      <Lateral />
    </header>
  );
}
