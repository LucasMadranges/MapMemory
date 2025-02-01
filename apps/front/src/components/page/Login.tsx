"use client";

import H1 from "../titles/H1";
import HorizontalBar from "../ui/HorizontalBar";
import Input from "../forms/Input";
import {useState} from "react";
import {User} from "../icons/User";
import {Eye} from "../icons/Eye";
import {DisabledEye} from "../icons/DisabledEye";
import Checkbox from "../forms/Checkbox";
import Button from "../buttons/Button";
import ContainerSM from "../containers/ContainerSM";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // WIP Change any type
  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("submit");
  }

  return (
    <ContainerSM>
      <form className="bg-white rounded-2xl shadow p-8 md:p-12">
        <H1>Connexion</H1>
        <HorizontalBar/>
        <Input name={"username"}
               label={"Nom d'utilisateur"}
               placeholder={"Nom d'utilisateur"}
               value={username}
               type={"text"}
               containerClassName={"mb-4"}
               onChange={(event) => setUsername((event.target as HTMLInputElement).value)}
               icon={<User width={24}
                           height={24}/>}/>
        <Input name={"password"}
               label={"Mot de passe"}
               placeholder={"Mot de passe"}
               value={password}
               type={"password"}
               containerClassName={"mb-4"}
               onChange={(event) => setPassword((event.target as HTMLInputElement).value)}
               enabledPasswordIcon={<Eye width={24}
                                         height={24}/>}
               disabledPasswordIcon={<DisabledEye width={24}
                                                  height={24}/>}/>
        <Checkbox name={"remember"}
                  label={"Se souvenir de moi"}/>
        <HorizontalBar/>
        <Button type={"primary"}
                className={"py-2"}
                onClick={handleSubmit}>
          Se connecter
        </Button>
      </form>
    </ContainerSM>
  );
}
