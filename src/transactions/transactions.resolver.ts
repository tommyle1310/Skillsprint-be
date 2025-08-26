import { Args, Mutation, ObjectType, Field, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@ObjectType()
class PurchaseResult {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  orderId?: string;

  @Field({ nullable: true })
  transactionId?: string;
}

@Resolver(() => PurchaseResult)
export class TransactionsResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => PurchaseResult)
  async purchaseCourse(
    @Args('courseId') courseId: string,
    @Args('provider') provider: string,
    @Args('userId', { nullable: true }) userId?: string,
  ): Promise<PurchaseResult> {
    const result = await this.prisma.$transaction(async (tx) => {
      // Always trust server-side price to prevent tampering
      const course = await tx.course.findUnique({ where: { id: courseId } });
      if (!course) {
        throw new Error('Course not found');
      }
      const amount = course.price; // stored in cents
      const order = await tx.order.create({
        data: { userId, courseId, amount, status: 'paid' },
      });
      const transaction = await tx.transaction.create({
        data: { userId, courseId, amount, provider, status: 'success' },
      });
      await tx.course.update({
        where: { id: courseId },
        data: { purchaseCount: { increment: 1 } },
      });

      return { order, transaction };
    });

    return {
      success: true,
      orderId: result.order.id,
      transactionId: result.transaction.id,
    };
  }
}


