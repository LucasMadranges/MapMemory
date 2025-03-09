import {Map} from "../icons/Map";
import {Notes} from "../icons/Notes";
import {Todo} from "../icons/Todo";
import {SimpleCalendar} from "../icons/SimpleCalendar";
import {Settings} from "../icons/Settings";
import NavigationLink from "./NavigationLink";
import React from "react";

export default function Navigation() {
  return (
    <div className={"sm:h-full flex sm:flex-col flex-row items-center justify-center gap-4 sm:gap-2 p-4"}>
      <NavigationLink text={"Map"}
                      href={"/"}
                      textDirection={"right"}>
        <Map className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Notes"}
                      href={"/"}
                      textDirection={"right"}>
        <Notes className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Todo"}
                      href={"/"}
                      textDirection={"right"}>
        <Todo className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Résolutions"}
                      href={"/"}
                      textDirection={"right"}>
        <SimpleCalendar className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Back"}
                      href={"/"}
                      textDirection={"right"}>
        <Settings className={"w-8 h-8 text-white"}/>
      </NavigationLink>
    </div>
  );
}
