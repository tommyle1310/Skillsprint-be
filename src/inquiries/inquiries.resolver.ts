import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Inquiry } from './inquiries.types';

@Resolver(() => Inquiry)
export class InquiriesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Inquiry])
  async inquiries(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    return this.prisma.inquiry.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Query(() => Int)
  async inquiriesCount() {
    return this.prisma.inquiry.count();
  }

  @Mutation(() => Inquiry)
  async createInquiry(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('subject') subject: string,
    @Args('message') message: string,
  ) {
    return this.prisma.inquiry.create({ data: { name, email, subject, message, status: 'OPEN' } });
  }

  @Mutation(() => Inquiry)
  async updateInquiryStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ) {
    return this.prisma.inquiry.update({ where: { id }, data: { status } });
  }
}
