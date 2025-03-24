import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";
import {Type} from "class-transformer";

@InputType()
export class CoordinatesInput {
  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({message: "La latitude est obligatoire."})
  lat!: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty({message: "La longitude est obligatoire."})
  lng!: number;
}

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

  @Field(() => [String], {nullable: true})
  @IsArray({message: "Les amis doivent être dans un tableau."})
  friendIds?: string[];

  @Field()
  @IsString({message: "Le lieu doit être un texte."})
  @IsNotEmpty({message: "Le lieu est obligatoire."})
  place!: string;

  @Field()
  @IsString({message: "La date doit être une date."})
  @IsNotEmpty({message: "La date est obligatoire."})
  date!: string;

  @Field(() => CoordinatesInput)
  @ValidateNested()
  @Type(() => CoordinatesInput)
  @IsNotEmpty({message: "Les coordonnées sont obligatoires."})
  coordinates!: CoordinatesInput;
}

