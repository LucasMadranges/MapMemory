import './globals.css';

import { Roboto } from 'next/font/google';
import * as React from 'react';

import Navigation from '../components/layout/Navigation';

export const metadata = {
  title: 'MapMemory',
  description: 'Welcome to MapMemory!',
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${roboto.className} relative`}>
        <Navigation />
        <main className="w-full min-h-svh flex items-center justify-center bg-primary">
          {children}
        </main>
      </body>
    </html>
  );
}
