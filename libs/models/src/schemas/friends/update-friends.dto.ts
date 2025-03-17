import {Field, InputType, PartialType} from "@nestjs/graphql";
import {CreateFriendsDto} from "./create-friends.dto";

@InputType()
export class UpdateFriendsDto extends PartialType(CreateFriendsDto) {
  @Field(() => String, {nullable: true})
  id?: string;
}
