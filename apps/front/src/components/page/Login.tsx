"use client";
import ContainerSM from "../containers/ContainerSM";
import LoginForm from "../forms/LoginForm";
import {useState} from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // WIP Change any type
  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <ContainerSM>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}/>
    </ContainerSM>
  );
}
