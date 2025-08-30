import { ObjectType, Field, ID, Int, Float, registerEnumType } from '@nestjs/graphql';

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

// ===== ENHANCED ANALYTICS TYPES =====

@ObjectType()
export class GATimePoint {
  @Field() date: string;     // YYYYMMDD
  @Field(() => Int) pageViews?: number;
  @Field(() => Int) sessions?: number;
  @Field(() => Int) count?: number; // cho event
}

@ObjectType()
export class GAEventCounts {
  @Field(() => Int) register: number;
  @Field(() => Int) login: number;
  @Field(() => Int) courses: number;
  @Field(() => Int) pricing: number;
}

@ObjectType()
export class GAScrollBuckets {
  @Field(() => Int) s25: number;
  @Field(() => Int) s50: number;
  @Field(() => Int) s75: number;
  @Field(() => Int) s90: number;
  @Field(() => Int) s100: number;
}

@ObjectType()
export class GATopPage {
  @Field() path: string;
  @Field({ nullable: true }) title?: string;
  @Field(() => Int) pageViews: number;
  @Field(() => Float) avgSessionDurationSec: number;
  @Field(() => Float) bounceRate: number;
}

@ObjectType()
export class GAAcquisitionRow {
  @Field() source: string;
  @Field() medium: string;
  @Field() channelGroup: string;
  @Field(() => Int) sessions: number;
  @Field(() => Int) activeUsers: number;
  @Field(() => Int) engagedSessions: number;
  @Field(() => Float) bounceRate: number;
}

@ObjectType()
export class GANewReturning {
  @Field(() => Int) newUsers: number;
  @Field(() => Int) returningUsers: number;
}

@ObjectType()
export class GATrafficSource {
  @Field() source: string;
  @Field() medium: string;
  @Field(() => Int) sessions: number;
}

@ObjectType()
export class GADevice {
  @Field() device: string;
  @Field(() => Int) sessions: number;
}

@ObjectType()
export class GABrowser {
  @Field() browser: string;
  @Field(() => Int) sessions: number;
}

@ObjectType()
export class GACountry {
  @Field() country: string;
  @Field(() => Int) sessions: number;
}

@ObjectType()
export class GACity {
  @Field() city: string;
  @Field(() => Int) sessions: number;
}

@ObjectType()
export class GANavigationFlow {
  @Field(() => [GATopPage]) entryPages: GATopPage[];
  @Field(() => [GATopPage]) exitPages: GATopPage[];
}

@ObjectType()
export class GAFormSubmission {
  @Field() formType: string;
  @Field(() => Int) count: number;
}

@ObjectType()
export class GAHoverEvent {
  @Field() elementId: string;
  @Field(() => Int) count: number;
}

@ObjectType()
export class GASummary {
  @Field(() => Int) pageViews: number;
  @Field(() => Int) sessions: number;
  @Field(() => Int) activeUsers: number;
  @Field(() => Float) avgSessionDurationSec: number;
  @Field(() => Float) engagementDurationSec: number;
  @Field(() => Float) bounceRate: number;
}

@ObjectType()
export class GAComprehensiveOverview {
  @Field(() => GASummary) summary: GASummary;
  @Field(() => GAEventCounts) ctaClicks: GAEventCounts;
  @Field(() => GAScrollBuckets) scrollBuckets: GAScrollBuckets;
  @Field(() => GANewReturning) newReturning: GANewReturning;
  @Field(() => [GATopPage]) topPages: GATopPage[];
  @Field(() => [GAAcquisitionRow]) acquisition: GAAcquisitionRow[];
  @Field(() => [GADevice]) devices: GADevice[];
  @Field(() => [GACountry]) countries: GACountry[];
  @Field(() => Float) averageScrollPercentage: number;
  @Field(() => Float) overallCtr: number;
  @Field(() => Int) formSubmissions: number;
  @Field(() => Int) hoverEvents: number;
}



@ObjectType()
export class AdminGaPanel {
  @Field(() => Int) pageViews7d: number;
  @Field(() => Int) sessions7d: number;
  @Field(() => Int) activeUsers7d: number;
  @Field(() => Float) avgSessionDurationSec7d: number;
  @Field(() => Float) engagementDurationSec7d: number;
  @Field(() => Float) bounceRate7d: number;

  @Field(() => [GATimePoint]) pageViewsSeries7d: GATimePoint[];
  @Field(() => GAEventCounts) ctaClicks7d: GAEventCounts;
  @Field(() => GAScrollBuckets) scroll7d: GAScrollBuckets;

  @Field(() => [GATopPage]) topPages7d: GATopPage[];
  @Field(() => [GAAcquisitionRow]) acquisition7d: GAAcquisitionRow[];
  @Field(() => GANewReturning) newReturning7d: GANewReturning;

  @Field(() => [GATimePoint]) registerSeries7d: GATimePoint[];
  @Field(() => [GATimePoint]) loginSeries7d: GATimePoint[];
  @Field(() => [GATimePoint]) coursesSeries7d: GATimePoint[];
  @Field(() => [GATimePoint]) pricingSeries7d: GATimePoint[];

  @Field(() => [GATimePoint], { nullable: true }) devices7d?: any;
  @Field(() => [GATimePoint], { nullable: true }) countries7d?: any;
}
