import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => String, {nullable: true})
  avatar?: string | null;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
