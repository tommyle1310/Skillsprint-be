import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DashboardStats {
  @Field()
  totalTraffic: number;

  @Field()
  totalLeads: number;

  @Field()
  totalOrders: number;

  @Field()
  totalRevenue: number;

  @Field()
  leadConversionRate: number;

  @Field()
  revenuePerVisitor: number;
}

@ObjectType()
export class Traffic {
  @Field(() => ID)
  id: string;

  @Field()
  count: number;

  @Field()
  updatedAt: Date;
}
