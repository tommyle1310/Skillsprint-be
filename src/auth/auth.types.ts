import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
