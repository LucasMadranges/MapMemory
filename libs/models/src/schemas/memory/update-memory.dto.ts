import {Field, InputType, PartialType} from "@nestjs/graphql";
import {CreateMemoryDto} from "./create-memory.dto";

@InputType()
export class UpdateMemoryDto extends PartialType(CreateMemoryDto) {
  @Field(() => String, {nullable: true})
  id?: string;
}
