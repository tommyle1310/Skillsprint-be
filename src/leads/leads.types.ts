import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Lead {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;
}
