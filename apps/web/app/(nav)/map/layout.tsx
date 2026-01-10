import '../../globals.css';

import * as React from 'react';

import LateralMap from '../../../components/layout/lateralMap/LateralMap';
import Navigation from '../../../components/layout/navigation/Navigation';

export const metadata = {
  title: 'MapMemory | Map',
  description: 'Have fun!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation>
        <LateralMap />
      </Navigation>
      {children}
    </>
  );
}
