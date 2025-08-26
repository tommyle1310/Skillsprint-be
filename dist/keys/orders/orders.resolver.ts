import { Args, Int, Mutation, ObjectType, Field, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@ObjectType()
class GqlOrder {
  @Field()
  id: string;

  @Field(() => Int)
  amount: number;

  @Field()
  status: string;

  @Field()
  createdAt: Date;
}

@Resolver(() => GqlOrder)
export class OrdersResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => GqlOrder)
  async createOrder(
    @Args('courseId') courseId: string,
    @Args('amount', { type: () => Int }) amount: number,
    @Args('status', { nullable: true }) status?: string,
    @Args('userId', { nullable: true }) userId?: string,
  ) {
    const order = await this.prisma.order.create({ data: { userId, courseId, amount, status: status ?? 'paid' } });
    return order as unknown as GqlOrder;
  }

  @Query(() => Boolean)
  async hasPurchased(@Args('userId') userId: string, @Args('courseId') courseId: string) {
    const count = await this.prisma.order.count({ where: { userId, courseId, status: 'paid' } });
    return count > 0;
  }
}


