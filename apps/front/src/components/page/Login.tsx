"use client";
import ContainerSM from "../containers/ContainerSM";
import LoginForm from "../forms/LoginForm";
import {useState} from "react";
import {getUsers} from "@org/graphql";
import {client} from "../../../apollo-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // WIP Change any type
  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      const {data} = await client.query({
        query: getUsers,
      });
      console.log("Users:", data);
    } catch (error) {
      console.error(error);
    }
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
