import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { AdminOverview, AdminOverviewPeriodType, DashboardStats, Traffic } from './analytics.types';
import { GoogleAnalyticsService } from './google-analytics.service';

@Resolver(() => DashboardStats)
export class AnalyticsResolver {
  constructor(
    private prisma: PrismaService,
    private ga: GoogleAnalyticsService,
  ) {}

  /** Basic dashboard stats */
  @Query(() => DashboardStats)
  async dashboardStats() {
    const [traffic, leads, users, orders, revenue] = await Promise.all([
      this.prisma.traffic.findFirst(),
      this.prisma.lead.count(),
      this.prisma.user.count(),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        where: { status: 'paid' },
        _sum: { amount: true }
      })
    ]);

    const totalTrafficDB = traffic?.count || 0;
    const totalRevenue = revenue._sum.amount || 0;

    const [activeUsers, sessions, bounceRate] = await Promise.all([
      this.ga.getActiveUsersLast7Days(),
      this.ga.getSessionsLast7Days(),
      this.ga.getBounceRateLast7Days(),
    ]);

    return {
      totalTraffic: totalTrafficDB,
      gaActiveUsers: activeUsers,
      gaSessions: sessions,
      gaBounceRate: bounceRate,
      totalLeads: leads,
      totalUsers: users,
      totalOrders: orders,
      totalRevenue,
      leadConversionRate: totalTrafficDB > 0 ? (leads / totalTrafficDB) * 100 : 0,
      userConversionRate: leads > 0 ? (users / leads) * 100 : 0,
      paidConversionRate: users > 0 ? (orders / users) * 100 : 0,
      revenuePerVisitor: totalTrafficDB > 0 ? totalRevenue / totalTrafficDB : 0,
    };
  }

  /** Track pageview for DB traffic */
  @Mutation(() => Traffic)
  async trackPageView() {
    const traffic = await this.prisma.traffic.findFirst();
    if (traffic) {
      return this.prisma.traffic.update({
        where: { id: traffic.id },
        data: { count: { increment: 1 } }
      });
    } else {
      return this.prisma.traffic.create({ data: { count: 1 } });
    }
  }

  /** Admin Overview with funnel + sales focus */
  @Query(() => AdminOverview)
  async adminOverview(
    @Args('period', { type: () => AdminOverviewPeriodType, nullable: true })
    period: AdminOverviewPeriodType = AdminOverviewPeriodType.SEVEN_DAYS,
  ): Promise<AdminOverview> {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const endOfToday = new Date(now.setHours(23, 59, 59, 999));

    const daysMap: Record<AdminOverviewPeriodType, number> = {
      [AdminOverviewPeriodType.SEVEN_DAYS]: 7,
      [AdminOverviewPeriodType.THIRTY_DAYS]: 30,
      [AdminOverviewPeriodType.NINETY_DAYS]: 90,
      [AdminOverviewPeriodType.ONE_YEAR]: 365,
    };

    const compareDays = daysMap[period];
    const compareStart = new Date(startOfToday);
    compareStart.setDate(compareStart.getDate() - compareDays);
    const compareEnd = new Date(startOfToday);
    compareEnd.setMilliseconds(compareEnd.getMilliseconds() - 1);

    const lastLoginExistsRows = await this.prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE lower(table_name) = 'user'
          AND lower(column_name) = 'lastlogin'
      ) AS exists
    `;
    const lastLoginExists = Array.isArray(lastLoginExistsRows)
      ? Boolean(lastLoginExistsRows[0]?.exists)
      : false;

    const [
      recentOrders,
      recentUsers,
      todayOrders,
      todayRevenueAgg,
      todayLeads,
      todayUsers,
      todayPaidUsers,
      compareOrders,
      compareRevenueAgg,
      compareLeads,
      compareUsers,
      comparePaidUsers,
      todayInactiveUsers,
      compareInactiveUsers,
      totalUsersToday,
      totalUsersCompare,
      trafficRow,
      gaActiveUsers,
      gaSessions,
      gaBounceRate,
    ] = await Promise.all([
      this.prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: { id: true, amount: true, status: true, createdAt: true },
      }),
      this.prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
      }),
      this.prisma.order.count({ where: { createdAt: { gte: startOfToday, lte: endOfToday } } }),
      this.prisma.order.aggregate({ where: { status: 'paid', createdAt: { gte: startOfToday, lte: endOfToday } }, _sum: { amount: true } }),
      this.prisma.lead.count({ where: { createdAt: { gte: startOfToday, lte: endOfToday } } }),
      this.prisma.user.count({ where: { createdAt: { gte: startOfToday, lte: endOfToday } } }),
      this.prisma.order.count({ where: { status: 'paid', createdAt: { gte: startOfToday, lte: endOfToday } } }),
      this.prisma.order.count({ where: { createdAt: { gte: compareStart, lte: compareEnd } } }),
      this.prisma.order.aggregate({ where: { status: 'paid', createdAt: { gte: compareStart, lte: compareEnd } }, _sum: { amount: true } }),
      this.prisma.lead.count({ where: { createdAt: { gte: compareStart, lte: compareEnd } } }),
      this.prisma.user.count({ where: { createdAt: { gte: compareStart, lte: compareEnd } } }),
      this.prisma.order.count({ where: { status: 'paid', createdAt: { gte: compareStart, lte: compareEnd } } }),
      lastLoginExists
        ? this.prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM "User" u WHERE u."lastLogin" IS NULL OR u."lastLogin" < ${startOfToday}`
        : Promise.resolve([{ count: BigInt(0) }] as { count: bigint }[]),
      lastLoginExists
        ? this.prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM "User" u WHERE u."lastLogin" IS NULL OR u."lastLogin" < ${compareStart}`
        : Promise.resolve([{ count: BigInt(0) }] as { count: bigint }[]),
      this.prisma.user.count(),
      this.prisma.user.count(),
      this.prisma.traffic.findFirst(),
      this.ga.getActiveUsersLast7Days(),
      this.ga.getSessionsLast7Days(),
      this.ga.getBounceRateLast7Days(),
    ]);

    const todayRevenue = todayRevenueAgg._sum.amount ?? 0;
    const compareRevenue = compareRevenueAgg._sum.amount ?? 0;
    const todayInactiveUsersCount = Array.isArray(todayInactiveUsers) ? Number(todayInactiveUsers[0]?.count ?? 0) : 0;
    const compareInactiveUsersCount = Array.isArray(compareInactiveUsers) ? Number(compareInactiveUsers[0]?.count ?? 0) : 0;

    const churnRateToday = totalUsersToday > 0 ? (todayInactiveUsersCount / totalUsersToday) * 100 : 0;
    const churnRateCompare = totalUsersCompare > 0 ? (compareInactiveUsersCount / totalUsersCompare) * 100 : 0;

    return {
      recentOrders: recentOrders as any,
      recentUsers: recentUsers as any,
      today: {
        orders: todayOrders,
        revenue: todayRevenue,
        leads: todayLeads,
        users: todayUsers,
        paidUsers: todayPaidUsers,
      },
      compare: {
        orders: compareOrders,
        revenue: compareRevenue,
        leads: compareLeads,
        users: compareUsers,
        paidUsers: comparePaidUsers,
      },
      funnel: {
        leads: todayLeads,
        users: todayUsers,
        paidUsers: todayPaidUsers,
        leadToUserRate: todayLeads > 0 ? (todayUsers / todayLeads) * 100 : 0,
        userToPaidRate: todayUsers > 0 ? (todayPaidUsers / todayUsers) * 100 : 0,
        overallRate: todayLeads > 0 ? (todayPaidUsers / todayLeads) * 100 : 0,
      },
      period,
      churnRateToday,
      churnRateCompare,
      totalTraffic: trafficRow?.count ?? 0,
      gaActiveUsers,
      gaSessions,
      gaBounceRate,
    };
  }

}
