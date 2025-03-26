import "../global.css";
import React from "react";
import {Roboto} from "next/font/google";

export const metadata = {
  title: "MapMemory | Login",
  description: "Connexion",
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
    <div className="min-h-svh flex items-center justify-center bg-blue-500 p-4">
      {children}
    </div>
  );
}
