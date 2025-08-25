import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsResolver {
    private prisma;
    constructor(prisma: PrismaService);
    dashboardStats(): Promise<{
        totalTraffic: number;
        totalLeads: number;
        totalOrders: number;
        totalRevenue: number;
        leadConversionRate: number;
        revenuePerVisitor: number;
    }>;
    trackPageView(): Promise<{
        id: string;
        updatedAt: Date;
        count: number;
    }>;
}
