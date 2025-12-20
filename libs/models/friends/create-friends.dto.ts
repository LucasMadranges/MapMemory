import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateFriendsDto {
  @Field()
  @IsString({ message: "L'avatar doit être un lien." })
  avatar?: string;

  @Field()
  @IsString({ message: 'Le prénom doit être un texte.' })
  @IsNotEmpty({ message: 'Le prénom est obligatoire.' })
  firstname!: string;

  @Field()
  @IsString({ message: 'Le nom doit être un texte.' })
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  lastname!: string;
}
