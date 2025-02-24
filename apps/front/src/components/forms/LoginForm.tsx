import H1 from "../titles/H1";
import HorizontalBar from "../ui/HorizontalBar";
import Input from "../inputs/Input";
import {User} from "../icons/User";
import {Eye} from "../icons/Eye";
import {DisabledEye} from "../icons/DisabledEye";
import Checkbox from "../inputs/Checkbox";
import Button from "../buttons/Button";
import {Dispatch, MouseEventHandler, SetStateAction} from "react";

type LoginFormProps = {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleSubmit: MouseEventHandler;
}

export default function LoginForm({
                                    email,
                                    password,
                                    setEmail,
                                    setPassword,
                                    handleSubmit,
                                  }: LoginFormProps) {
  return (
    <form className="bg-white rounded-2xl shadow p-8 md:p-12">
      <H1>Connexion</H1>
      <HorizontalBar/>
      <Input name={"email"}
             label={"Email"}
             placeholder={"Email"}
             value={email}
             type={"text"}
             containerClassName={"mb-4"}
             onChange={(event) => setEmail((event.target as HTMLInputElement).value)}
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
  );
}
