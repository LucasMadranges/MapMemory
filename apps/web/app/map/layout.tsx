import '../globals.css';

import * as React from 'react';

export const metadata = {
  title: 'MapMemory | App',
  description: 'Have fun!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
