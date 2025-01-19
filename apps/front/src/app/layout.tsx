import "./global.css";
import React from "react";
import {Roboto} from "next/font/google";

export const metadata = {
  title: "MapMemory",
  description: "Have fun!",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`max-w-screen-md mx-auto bg-blue-500 my-24 ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
