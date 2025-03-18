import {Field, ObjectType} from "@nestjs/graphql";
import {Friends} from "../friends/friends.model";

@ObjectType()
export class Memory {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => [String])
  images!: string[];

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => [Friends], {nullable: true})
  friends!: Friends[];

  @Field()
  place!: string;

  @Field()
  date!: Date;
}
