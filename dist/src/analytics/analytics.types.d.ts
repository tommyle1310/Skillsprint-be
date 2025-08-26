export declare class DashboardStats {
    totalTraffic: number;
    totalLeads: number;
    totalUsers?: number;
    gaActiveUsers?: number;
    gaSessions?: number;
    gaBounceRate?: number;
    totalOrders: number;
    totalRevenue: number;
    leadConversionRate: number;
    userConversionRate?: number;
    paidConversionRate?: number;
    revenuePerVisitor: number;
}
export declare class Traffic {
    id: string;
    count: number;
    updatedAt: Date;
}
export declare enum AdminOverviewPeriodType {
    SEVEN_DAYS = "7d",
    THIRTY_DAYS = "30d",
    NINETY_DAYS = "90d",
    ONE_YEAR = "1y"
}
export declare class RecentOrder {
    id: string;
    amount: number;
    status: string;
    createdAt: Date;
}
export declare class RecentUser {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role?: string;
    createdAt: Date;
}
export declare class TotalsSnapshot {
    orders: number;
    revenue: number;
    leads: number;
    users: number;
    paidUsers: number;
}
export declare class Funnel {
    leads: number;
    users: number;
    paidUsers: number;
    leadToUserRate: number;
    userToPaidRate: number;
    overallRate: number;
}
export declare class AdminOverview {
    recentOrders: RecentOrder[];
    funnel: Funnel;
    recentUsers: RecentUser[];
    today: TotalsSnapshot;
    compare: TotalsSnapshot;
    period: AdminOverviewPeriodType;
    churnRateToday: number;
    churnRateCompare: number;
    totalTraffic?: number;
    gaActiveUsers?: number;
    gaSessions?: number;
    gaBounceRate?: number;
}
