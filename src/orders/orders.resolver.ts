import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class OrdersResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => String)
  async createOrder(
    @Args('userId') userId: string,
    @Args('courseId') courseId: string,
    @Args('amount', { type: () => Int }) amount: number,
  ) {
    const order = await this.prisma.order.create({ data: { userId, courseId, amount, status: 'paid' } });
    return order.id;
  }

  @Query(() => Boolean)
  async hasPurchased(@Args('userId') userId: string, @Args('courseId') courseId: string) {
    const count = await this.prisma.order.count({ where: { userId, courseId, status: 'paid' } });
    return count > 0;
  }
}


