import Link from "next/link";
import React from "react";

export default function NavigationLink({children, text, href}: {
  children: React.ReactNode,
  text: string,
  href: string
}) {
  return (
    <Link href={href}
          className={`relative transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl
            focus-visible:outline-blue-900 focus-visible:outline
            hover:after:content-[attr(data-text)] hover:after:absolute hover:after:top-1/2 hover:after:left-14 hover:after:-translate-y-1/2 hover:after:w-fit hover:after:h-fit hover:after:bg-black hover:after:text-white hover:after:px-2 hover:after:rounded-md hover:after:text-sm`}
          data-text={text}>
      {children}
    </Link>
  );
}
