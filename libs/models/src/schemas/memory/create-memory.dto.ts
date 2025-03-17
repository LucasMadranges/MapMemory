import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";
import {Friends} from "../friends/friends.model";

@InputType()
export class CreateMemoryDto {

  @Field(() => [String])
  @IsArray({message: "Les images doivent être dans un tableau."})
  @IsNotEmpty({message: "Les images sont obligatoires."})
  images!: string[];

  @Field()
  @IsString({message: "Le titre doit être un texte."})
  @IsNotEmpty({message: "Le titre est obligatoire."})
  title!: string;

  @Field()
  @IsString({message: "La description doit être un texte."})
  @IsNotEmpty({message: "La description est obligatoire."})
  description!: string;

  @Field(() => [Friends], {defaultValue: []})
  @IsArray({message: "Les amis doivent être dans un tableau."})
  friends!: Friends[];

  @Field()
  @IsString({message: "Le lieu doit être un texte."})
  @IsNotEmpty({message: "Le lieu est obligatoire."})
  place!: string;

  @Field()
  @IsString({message: "La date doit être une date."})
  @IsNotEmpty({message: "La date est obligatoire."})
  date!: string;
}
