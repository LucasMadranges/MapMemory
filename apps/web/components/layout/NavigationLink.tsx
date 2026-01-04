import Link from 'next/dist/client/link';
import React from 'react';

export default function NavigationLink({
  textContent,
  href,
  children,
}: {
  textContent: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative
    transition group hover:bg-white p-2 rounded-lg
       hover:after:content-[attr(data-text)] hover:after:absolute
       hover:after:hidden sm:hover:after:block
       hover:after:top-1/2 hover:after:left-14 hover:after:-translate-y-1/2
       hover:after:text-white hover:after:bg-black hover:after:text-sm hover:after:rounded-md hover:after:px-2
    `}
      data-text={textContent}
    >
      {children}
    </Link>
  );
}
