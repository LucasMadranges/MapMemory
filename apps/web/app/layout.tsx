import './globals.css';

import { Roboto } from 'next/font/google';
import * as React from 'react';

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
      <body className={`${roboto.className}`}>
        <main className="w-full min-h-svh flex items-center justify-center bg-blue-500">
          {children}
        </main>
      </body>
    </html>
  );
}
