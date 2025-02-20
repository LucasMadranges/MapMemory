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
      <body className={`min-h-svh flex items-center justify-center bg-blue-500 p-4 md:p-0 ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
