import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserDto {

  @Field()
  @IsString({message: "Le prénom doit être un texte."})
  @IsNotEmpty({message: "Le prénom est obligatoire."})
  firstname!: string;

  @Field()
  @IsString({message: "Le nom doit être un texte."})
  @IsNotEmpty({message: "Le nom est obligatoire."})
  lastname!: string;

  @Field()
  @IsNotEmpty({message: "L'email est obligatoire."})
  @IsEmail({}, {message: "L'email est invalide."})
  email!: string;

  @Field()
  @IsString({message: "Le nom doit être un texte."})
  @IsNotEmpty({message: "Le mot de passe est obligatoire."})
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, {
    message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole.",
  })
  password!: string;
}
