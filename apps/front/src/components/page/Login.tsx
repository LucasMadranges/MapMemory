"use client";
import ContainerSM from "../containers/ContainerSM";
import LoginForm from "../forms/LoginForm";
import {useState} from "react";
import {client} from "../../../apollo-client";
import {loginUser} from "@org/graphql";
import {loginUserSchema} from "@org/clients";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // WIP Change any type
  async function handleSubmit(event: any) {
    try {
      event.preventDefault();

      /* Validation avec Zod */
      const {success, error} = loginUserSchema.safeParse({email, password});

      if (!success) {
        console.log(error);
        return;
      }

      const {data} = await client.query({
        query: loginUser,
        variables: {email, password},
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
