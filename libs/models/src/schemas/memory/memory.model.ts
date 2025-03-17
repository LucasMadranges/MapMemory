import {Field, ObjectType} from "@nestjs/graphql";
import {Friends} from "../friends/friends.model";

@ObjectType()
export class Memory {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field()
  images!: string[];

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  friends!: Friends[];

  @Field()
  place!: string;

  @Field()
  date!: string;
}
