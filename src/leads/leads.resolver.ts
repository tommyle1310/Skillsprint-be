import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Lead } from './leads.types';

@Resolver(() => Lead)
export class LeadsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Lead])
  async leads() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  @Mutation(() => Lead)
  async createLead(@Args('email') email: string) {
    return this.prisma.lead.create({
      data: { email }
    });
  }
}
