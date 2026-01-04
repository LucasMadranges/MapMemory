import '../globals.css';

import * as React from 'react';

import Navigation from '../../components/layout/Navigation';

export const metadata = {
  title: 'MapMemory | Map',
  description: 'Have fun!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
