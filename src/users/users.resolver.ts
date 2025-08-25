import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class GqlUser {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  role?: string;

  @Field()
  createdAt: Date;
}

@Resolver(() => GqlUser)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [GqlUser])
  async users(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
    });
  }

  @Query(() => Int)
  async usersCount() {
    return this.prisma.user.count();
  }

  @Mutation(() => GqlUser)
  async updateUserRole(
    @Args('userId') userId: string,
    @Args('role') role: string,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
      select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
    });
  }
}
