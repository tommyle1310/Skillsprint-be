import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardStats, Traffic } from './analytics.types';

@Resolver(() => DashboardStats)
export class AnalyticsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => DashboardStats)
  async dashboardStats() {
    const [traffic, leads, orders, revenue] = await Promise.all([
      this.prisma.traffic.findFirst(),
      this.prisma.lead.count(),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        where: { status: 'paid' },
        _sum: { amount: true }
      })
    ]);

    const totalTraffic = traffic?.count || 0;
    const totalRevenue = revenue._sum.amount || 0;

    return {
      totalTraffic,
      totalLeads: leads,
      totalOrders: orders,
      totalRevenue,
      leadConversionRate: totalTraffic > 0 ? (leads / totalTraffic) * 100 : 0,
      revenuePerVisitor: totalTraffic > 0 ? totalRevenue / totalTraffic : 0
    };
  }

  @Mutation(() => Traffic)
  async trackPageView() {
    const traffic = await this.prisma.traffic.findFirst();
    
    if (traffic) {
      return this.prisma.traffic.update({
        where: { id: traffic.id },
        data: { count: { increment: 1 } }
      });
    } else {
      return this.prisma.traffic.create({
        data: { count: 1 }
      });
    }
  }
}
