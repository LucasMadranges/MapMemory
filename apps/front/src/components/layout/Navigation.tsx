import {Map} from "../icons/Map";
import {Notes} from "../icons/Notes";
import {Todo} from "../icons/Todo";
import {SimpleCalendar} from "../icons/SimpleCalendar";
import {Settings} from "../icons/Settings";
import NavigationLink from "./NavigationLink";
import React from "react";

export default function Navigation() {
  return (
    <div className={`bg-blue-500 h-fit flex sm:flex-col flex-row items-center justify-center gap-6 sm:gap-2 p-4 sm:p-2 rounded-3xl sm:rounded-2xl
    absolute bottom-4 left-1/2 -translate-x-1/2 z-10
    sm:bottom-1/2 sm:left-16 sm:translate-y-1/2`}>
      <NavigationLink text={"Map"}
                      href={"/"}
                      textDirection={"right"}>
        <Map className={"w-10 h-10 sm:w-8 sm:h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Notes"}
                      href={"/"}
                      textDirection={"right"}>
        <Notes className={"w-10 h-10 sm:w-8 sm:h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Todo"}
                      href={"/"}
                      textDirection={"right"}>
        <Todo className={"w-10 h-10 sm:w-8 sm:h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Résolutions"}
                      href={"/"}
                      textDirection={"right"}>
        <SimpleCalendar className={"w-10 h-10 sm:w-8 sm:h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Back"}
                      href={"/"}
                      textDirection={"right"}>
        <Settings className={"w-10 h-10 sm:w-8 sm:h-8 text-white"}/>
      </NavigationLink>
    </div>
  );
}
