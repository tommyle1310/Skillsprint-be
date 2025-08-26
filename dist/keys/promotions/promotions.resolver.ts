import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class PromotionsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [PromotionGQL])
  async promotions() {
    return this.prisma.promotion.findMany();
  }

  @Mutation(() => PromotionGQL)
  async createPromotion(
    @Args('code') code: string,
    @Args('discountPercentage', { type: () => Int }) discountPercentage: number,
    @Args('expiresAt') expiresAt: string,
  ) {
    return this.prisma.promotion.create({ data: { code, discountPercentage, expiresAt: new Date(expiresAt) } });
  }

  @Mutation(() => PromotionGQL)
  async updatePromotion(
    @Args('id') id: string,
    @Args('code', { nullable: true }) code?: string,
    @Args('discountPercentage', { type: () => Int, nullable: true }) discountPercentage?: number,
    @Args('expiresAt', { nullable: true }) expiresAt?: string,
  ) {
    return this.prisma.promotion.update({
      where: { id },
      data: { code, discountPercentage, expiresAt: expiresAt ? new Date(expiresAt) : undefined },
    });
  }

  @Mutation(() => Boolean)
  async deletePromotion(@Args('id') id: string) {
    await this.prisma.promotion.delete({ where: { id } });
    return true;
  }
}

import { Field, ID, Int as GQLInt, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PromotionGQL {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field(() => GQLInt)
  discountPercentage: number;

  @Field()
  expiresAt: Date;
}


