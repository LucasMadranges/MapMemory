import './global.css';
import React from 'react';
import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'MapMemory',
  description: 'Welcome to MapMemory!',
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  );
}
