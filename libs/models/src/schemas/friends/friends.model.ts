import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Friends {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;
}
