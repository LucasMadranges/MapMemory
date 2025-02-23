import {IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserDto {

  @Field()
  @IsNotEmpty()
  firstname!: string;

  @Field()
  @IsNotEmpty()
  lastname!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
