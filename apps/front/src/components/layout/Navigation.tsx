import {Map} from "../icons/Map";
import {Notes} from "../icons/Notes";
import {Todo} from "../icons/Todo";
import {Calendar} from "../icons/Calendar";
import {Settings} from "../icons/Settings";
import NavigationLink from "./NavigationLink";
import {Home} from "../icons/Home";
import React from "react";

export default function Navigation() {
  return (
    <div className={"h-full flex flex-col items-center justify-center gap-2 p-4"}>
      <NavigationLink text={"Home"}
                      href={"/"}>
        <Home className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Map"}
                      href={"/"}>
        <Map className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Notes"}
                      href={"/"}>
        <Notes className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Todo"}
                      href={"/"}>
        <Todo className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Résolutions"}
                      href={"/"}>
        <Calendar className={"w-8 h-8 text-white"}/>
      </NavigationLink>
      <NavigationLink text={"Back"}
                      href={"/"}>
        <Settings className={"w-8 h-8 text-white"}/>
      </NavigationLink>
    </div>
  );
}
