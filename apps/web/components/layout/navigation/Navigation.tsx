'use client';
import { CircleDollarSignIcon, HomeIcon, MapIcon, ServerIcon } from 'lucide-react';
import React from 'react';

import Lateral from '../lateral/Lateral';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  return (
    <header className={'h-full absolute top-0 left-0 z-10 flex'}>
      <div className={'h-full bg-primary p-2 flex flex-col gap-1 z-10'}>
        <NavigationLink textContent={'Accueil'} href={'/'}>
          <HomeIcon className={'transition text-white group-hover:text-primary'} size={24} />
        </NavigationLink>
        <NavigationLink textContent={'Carte'} href={'/map'}>
          <MapIcon className={'transition text-white group-hover:text-primary'} size={24} />
        </NavigationLink>
        <NavigationLink textContent={'Budget'} href={'/budget'}>
          <CircleDollarSignIcon
            className={'transition text-white group-hover:text-primary'}
            size={24}
          />
        </NavigationLink>
        <NavigationLink textContent={'Serveur'} href={'/server'}>
          <ServerIcon className={'transition text-white group-hover:text-primary'} size={24} />
        </NavigationLink>
      </div>

      <Lateral />
    </header>
  );
}
