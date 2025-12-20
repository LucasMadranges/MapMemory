import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Friends {
  @Field(() => String, { nullable: true })
  @Directive('@shareable')
  id?: string;

  @Field(() => String, { nullable: true })
  @Directive('@shareable')
  avatar?: string | null;

  @Field()
  @Directive('@shareable')
  firstname!: string;

  @Field()
  @Directive('@shareable')
  lastname!: string;
}
