import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

@InputType()
export class LoginUserDto {
  @Field()
  @IsNotEmpty({message: "L'email est obligatoire."})
  @IsEmail({}, {message: "L'email est invalide."})
  email!: string;

  @Field()
  @IsString({message: "Le mot de passe doit être un texte."})
  @IsNotEmpty({message: "Le mot de passe est obligatoire."})
  password!: string;
}
