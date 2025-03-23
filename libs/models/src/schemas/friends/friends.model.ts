import {Directive, Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Directive("@key(fields: \"id\")")
export class Friends {
  @Field(() => String, {nullable: true})
  @Directive("@shareable")
  id?: string;

  @Field()
  @Directive("@shareable")
  firstname!: string;

  @Field()
  @Directive("@shareable")
  lastname!: string;
}

