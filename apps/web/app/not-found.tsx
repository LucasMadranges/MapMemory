import { AngryIcon } from 'lucide-react';
import Link from 'next/dist/client/link';
import React from 'react';

import Button from '../components/button/Button';

export default function Page() {
  return (
    <div className={'flex flex-col items-center justify-center gap-4 text-white'}>
      <AngryIcon size={128} />
      <h1 className={'text-4xl'}>404</h1>
      <p>Page introuvable</p>
      <Link href={'/'}>
        <Button variant={'secondary'}>Retour à l&#39;accueil</Button>
      </Link>
    </div>
  );
}
