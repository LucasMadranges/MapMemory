import NavigationLink from "../layout/NavigationLink";
import Image from "next/image";
import React from "react";
import VerticalBar from "../ui/VerticalBar";
import {SignOut} from "../icons/SignOut";

export default function ProfileMenu() {
  return (
    <div className={"bg-white absolute right-4 top-4 z-10 rounded-lg flex gap-2 items-center h-fit px-1"}>
      <NavigationLink text={"Profil"}
                      href={"/"}
                      textDirection={"bottom"}>
        <Image src="/people-image.jpg"
               alt={"Profile"}
               width={64}
               height={64}
               className={"w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"}/>
      </NavigationLink>
      <VerticalBar/>
      <NavigationLink text={"Déconnexion"}
                      href={"/"}
                      textDirection={"bottom"}>
        <SignOut className={"w-6 h-6 text-black"}/>
      </NavigationLink>
    </div>
  );
}
