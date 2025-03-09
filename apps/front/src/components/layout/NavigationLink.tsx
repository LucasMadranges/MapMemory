import Link from "next/link";
import React from "react";

export default function NavigationLink({children, text, href, textDirection, className}: {
  children: React.ReactNode,
  text: string,
  href: string
  textDirection: "left" | "right" | "top" | "bottom",
  className?: string
}) {
  return (
    <Link href={href}
          className={`relative transition
          hover:bg-white [&>svg]:hover:text-black
          hover:scale-105 z-10 active:scale-95 sm:p-2 rounded-xl
          flex flex-col items-center justify-center gap-2
            focus-visible:outline-blue-900 focus-visible:outline
            hover:after:content-[attr(data-text)] hover:after:absolute
            hover:after:hidden sm:hover:after:block hover:after:leading-[1.4]
            ${textDirection === "bottom" && "sm:hover:after:top-14 sm:hover:after:left-1/2 sm:hover:after:-translate-x-1/2"}
            ${textDirection === "top" && "sm:hover:after:bottom-14 sm:hover:after:left-1/2 sm:hover:after:-translate-x-1/2"}
            ${textDirection === "left" && "sm:hover:after:top-1/2 sm:hover:after:right-14 sm:hover:after:-translate-y-1/2"}
            ${textDirection === "right" && "sm:hover:after:top-1/2 sm:hover:after:left-14 sm:hover:after:-translate-y-1/2"}
            hover:after:w-fit hover:after:h-fit hover:after:bg-black hover:after:text-white hover:after:px-2 hover:after:rounded-md hover:after:text-sm ${className}`}
          data-text={text}>
      {children}
    </Link>
  );
}
