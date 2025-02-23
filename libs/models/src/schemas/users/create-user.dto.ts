import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserDto {

  @Field()
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
