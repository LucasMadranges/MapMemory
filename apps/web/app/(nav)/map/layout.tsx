import '../../globals.css';

import * as React from 'react';

export const metadata = {
  title: 'MapMemory | Map',
  description: 'Have fun!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
