import React from "react";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function H1({children}: { children: React.ReactNode }) {
  return (
    <h1 className={`${montserrat.className} text-4xl text-center`}>{children}</h1>
  );
}
