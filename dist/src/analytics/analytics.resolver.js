"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
const analytics_types_1 = require("./analytics.types");
const google_analytics_service_1 = require("./google-analytics.service");
let AnalyticsResolver = class AnalyticsResolver {
    constructor(prisma, ga) {
        this.prisma = prisma;
        this.ga = ga;
    }
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
    async trackPageView() {
        const traffic = await this.prisma.traffic.findFirst();
        if (traffic) {
            return this.prisma.traffic.update({
                where: { id: traffic.id },
                data: { count: { increment: 1 } }
            });
        }
        else {
            return this.prisma.traffic.create({ data: { count: 1 } });
        }
    }
    async adminOverview(period = analytics_types_1.AdminOverviewPeriodType.SEVEN_DAYS) {
        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const endOfToday = new Date(now.setHours(23, 59, 59, 999));
        const daysMap = {
            [analytics_types_1.AdminOverviewPeriodType.SEVEN_DAYS]: 7,
            [analytics_types_1.AdminOverviewPeriodType.THIRTY_DAYS]: 30,
            [analytics_types_1.AdminOverviewPeriodType.NINETY_DAYS]: 90,
            [analytics_types_1.AdminOverviewPeriodType.ONE_YEAR]: 365,
        };
        const compareDays = daysMap[period];
        const compareStart = new Date(startOfToday);
        compareStart.setDate(compareStart.getDate() - compareDays);
        const compareEnd = new Date(startOfToday);
        compareEnd.setMilliseconds(compareEnd.getMilliseconds() - 1);
        const lastLoginExistsRows = await this.prisma.$queryRaw `
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
        const [recentOrders, recentUsers, todayOrders, todayRevenueAgg, todayLeads, todayUsers, todayPaidUsers, compareOrders, compareRevenueAgg, compareLeads, compareUsers, comparePaidUsers, todayInactiveUsers, compareInactiveUsers, totalUsersToday, totalUsersCompare, trafficRow, gaActiveUsers, gaSessions, gaBounceRate,] = await Promise.all([
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
                ? this.prisma.$queryRaw `SELECT COUNT(*)::bigint AS count FROM "User" u WHERE u."lastLogin" IS NULL OR u."lastLogin" < ${startOfToday}`
                : Promise.resolve([{ count: BigInt(0) }]),
            lastLoginExists
                ? this.prisma.$queryRaw `SELECT COUNT(*)::bigint AS count FROM "User" u WHERE u."lastLogin" IS NULL OR u."lastLogin" < ${compareStart}`
                : Promise.resolve([{ count: BigInt(0) }]),
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
            recentOrders: recentOrders,
            recentUsers: recentUsers,
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
};
exports.AnalyticsResolver = AnalyticsResolver;
__decorate([
    (0, graphql_1.Query)(() => analytics_types_1.DashboardStats),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsResolver.prototype, "dashboardStats", null);
__decorate([
    (0, graphql_1.Mutation)(() => analytics_types_1.Traffic),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsResolver.prototype, "trackPageView", null);
__decorate([
    (0, graphql_1.Query)(() => analytics_types_1.AdminOverview),
    __param(0, (0, graphql_1.Args)('period', { type: () => analytics_types_1.AdminOverviewPeriodType, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsResolver.prototype, "adminOverview", null);
exports.AnalyticsResolver = AnalyticsResolver = __decorate([
    (0, graphql_1.Resolver)(() => analytics_types_1.DashboardStats),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        google_analytics_service_1.GoogleAnalyticsService])
], AnalyticsResolver);
//# sourceMappingURL=analytics.resolver.js.map