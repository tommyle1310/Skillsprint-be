import { PrismaService } from '../prisma/prisma.service';
import { AdminOverview, AdminOverviewPeriodType } from './analytics.types';
import { GoogleAnalyticsService } from './google-analytics.service';
export declare class AnalyticsResolver {
    private prisma;
    private ga;
    constructor(prisma: PrismaService, ga: GoogleAnalyticsService);
    dashboardStats(): Promise<{
        totalTraffic: number;
        gaActiveUsers: number;
        gaSessions: number;
        gaBounceRate: number;
        totalLeads: number;
        totalUsers: number;
        totalOrders: number;
        totalRevenue: number;
        leadConversionRate: number;
        userConversionRate: number;
        paidConversionRate: number;
        revenuePerVisitor: number;
    }>;
    trackPageView(): Promise<{
        id: string;
        updatedAt: Date;
        count: number;
    }>;
    adminOverview(period?: AdminOverviewPeriodType): Promise<AdminOverview>;
}
