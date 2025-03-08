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
  const [isLoading, setIsLoading] = useState(false);

  // WIP Change any type
  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      setIsLoading(true);

      /* Validation avec Zod */
      const {success, error} = loginUserSchema.safeParse({email, password});

      if (!success) {
        console.log(error);
        setIsLoading(false);
        return;
      }

      const {data} = await client.query({
        query: loginUser,
        variables: {email, password},
      });

      console.log("Users:", data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <ContainerSM>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        isLoading={isLoading}/>
    </ContainerSM>
  );
}
