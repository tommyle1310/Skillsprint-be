import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Inquiry } from './inquiries.types';

@Resolver(() => Inquiry)
export class InquiriesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Inquiry])
  async inquiries() {
    return this.prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Mutation(() => Inquiry)
  async createInquiry(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('subject') subject: string,
    @Args('message') message: string,
  ) {
    return this.prisma.inquiry.create({ data: { name, email, subject, message } });
  }
}
