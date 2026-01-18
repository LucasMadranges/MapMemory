import '../globals.css';

import * as React from 'react';

import Navigation from '../../components/layout/navigation/Navigation';

export const metadata = {
  title: 'MapMemory | Accueil',
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
