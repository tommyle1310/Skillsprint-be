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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
const analytics_types_1 = require("./analytics.types");
let AnalyticsResolver = class AnalyticsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async trackPageView() {
        const traffic = await this.prisma.traffic.findFirst();
        if (traffic) {
            return this.prisma.traffic.update({
                where: { id: traffic.id },
                data: { count: { increment: 1 } }
            });
        }
        else {
            return this.prisma.traffic.create({
                data: { count: 1 }
            });
        }
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
exports.AnalyticsResolver = AnalyticsResolver = __decorate([
    (0, graphql_1.Resolver)(() => analytics_types_1.DashboardStats),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsResolver);
//# sourceMappingURL=analytics.resolver.js.map