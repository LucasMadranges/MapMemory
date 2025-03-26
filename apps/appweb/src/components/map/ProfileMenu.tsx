import NavigationLink from "../layout/NavigationLink";
import Image from "next/image";
import React from "react";
import VerticalBar from "../ui/VerticalBar";
import {SignOut} from "../icons/SignOut";

export default function ProfileMenu() {
  return (
    <div className={"bg-white absolute right-4 top-4 z-10 rounded-lg flex gap-2 items-center h-fit p-2 sm:p-0 sm:px-1"}>
      <NavigationLink text={"Profil"}
                      href={"/"}
                      textDirection={"bottom"}>
        <Image src="/people-image.jpg"
               alt={"Profile"}
               width={64}
               height={64}
               className={"w-8 h-8 rounded-full object-cover"}/>
      </NavigationLink>
      <VerticalBar/>
      <NavigationLink text={"Déconnexion"}
                      href={"/"}
                      textDirection={"bottom"}>
        <SignOut className={"w-8 h-8 text-black"}/>
      </NavigationLink>
    </div>
  );
}
