import Container2XL from "../../components/containers/Container2XL";
import Link from "next/link";
import {Home} from "../../components/icons/Home";
import {Map} from "../../components/icons/Map";
import {Notes} from "../../components/icons/Notes";
import {Todo} from "../../components/icons/Todo";
import {Settings} from "../../components/icons/Settings";
import {Calendar} from "../../components/icons/Calendar";

export default function Page() {
  return (
    <Container2XL className={"h-[calc(100svh-32px)]"}>
      <div className={"bg-blue-500 h-full rounded-2xl flex"}>
        <div className={"h-full flex flex-col items-center justify-center gap-2 p-4"}>
          <Link href={"/"}
                className={"transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl"}>
            <Home className={"w-8 h-8"}/>
          </Link>
          <Link href={"/"}
                className={"transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl"}>
            <Map className={"w-8 h-8"}/>
          </Link>
          <Link href={"/"}
                className={"transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl"}>
            <Notes className={"w-8 h-8"}/>
          </Link>
          <Link href={"/"}
                className={"transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl"}>
            <Todo className={"w-8 h-8"}/>
          </Link>
          <Link href={"/"}
                className={"transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl"}>
            <Calendar className={"w-8 h-8"}/>
          </Link>
          <Link href={"/"}
                className={"transition hover:bg-white hover:scale-105 active:scale-95 p-2 rounded-xl"}>
            <Settings className={"w-8 h-8"}/>
          </Link>
        </div>
        <div className={"w-3/12"}>
          Menu
        </div>
        <div>
          Map
        </div>
      </div>
    </Container2XL>
  );
}
