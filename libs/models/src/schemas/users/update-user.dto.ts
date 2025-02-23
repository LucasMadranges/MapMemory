import {Field, InputType, PartialType} from "@nestjs/graphql";
import {CreateUserDto} from "@org/models";

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => String, {nullable: true})
  id?: string;
}
