import { Montserrat } from 'next/font/google';
import React from 'react';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={`${montserrat.className} text-3xl md:text-2xl text-center mb-4`}>{children}</h2>
  );
}
