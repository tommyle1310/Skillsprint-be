import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class DashboardStats {
  @Field()
  totalTraffic: number;

  @Field()
  totalLeads: number;

  @Field({ nullable: true })
  totalUsers?: number;

  // GA metrics
  @Field({ nullable: true })
  gaActiveUsers?: number;

  @Field({ nullable: true })
  gaSessions?: number;

  @Field({ nullable: true })
  gaBounceRate?: number;

  @Field()
  totalOrders: number;

  @Field()
  totalRevenue: number;

  @Field()
  leadConversionRate: number;

  @Field({ nullable: true })
  userConversionRate?: number;

  @Field({ nullable: true })
  paidConversionRate?: number;

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

export enum AdminOverviewPeriodType {
  SEVEN_DAYS = '7d',
  THIRTY_DAYS = '30d',
  NINETY_DAYS = '90d',
  ONE_YEAR = '1y',
}

registerEnumType(AdminOverviewPeriodType, {
  name: 'AdminOverviewPeriodType',
});

@ObjectType()
export class RecentOrder {
  @Field()
  id: string;

  @Field(() => Int)
  amount: number;

  @Field()
  status: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class RecentUser {
  @Field()
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

@ObjectType()
export class TotalsSnapshot {
  @Field(() => Int)
  orders: number;

  @Field(() => Int)
  revenue: number;

  @Field(() => Int)
  leads: number;

  @Field(() => Int)
  users: number;

  @Field(() => Int)
  paidUsers: number;
}

@ObjectType()
export class Funnel {
  @Field(() => Int)
  leads: number;

  @Field(() => Int)
  users: number;

  @Field(() => Int)
  paidUsers: number;

  @Field()
  leadToUserRate: number;

  @Field()
  userToPaidRate: number;

  @Field()
  overallRate: number;
}

@ObjectType()
export class AdminOverview {
  @Field(() => [RecentOrder])
  recentOrders: RecentOrder[];

  @Field(() => Funnel)
  funnel: Funnel;

  @Field(() => [RecentUser])
  recentUsers: RecentUser[];

  // Today values
  @Field(() => TotalsSnapshot)
  today: TotalsSnapshot;

  // Comparison values for the selected period before today
  @Field(() => TotalsSnapshot)
  compare: TotalsSnapshot;

  // Echo of requested period type
  @Field(() => AdminOverviewPeriodType)
  period: AdminOverviewPeriodType;

  // Churn rate (percentage) for today and comparison window
  @Field()
  churnRateToday: number;

  @Field()
  churnRateCompare: number;

  // Optional traffic/GA metrics for convenience in this overview
  @Field({ nullable: true })
  totalTraffic?: number;

  @Field({ nullable: true })
  gaActiveUsers?: number;

  @Field({ nullable: true })
  gaSessions?: number;

  @Field({ nullable: true })
  gaBounceRate?: number;
}