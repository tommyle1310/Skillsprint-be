import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Inquiry {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  subject: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;
}
