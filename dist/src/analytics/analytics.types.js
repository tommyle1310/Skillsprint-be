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
exports.AdminOverview = exports.Funnel = exports.TotalsSnapshot = exports.RecentUser = exports.RecentOrder = exports.AdminOverviewPeriodType = exports.Traffic = exports.DashboardStats = void 0;
const graphql_1 = require("@nestjs/graphql");
let DashboardStats = class DashboardStats {
};
exports.DashboardStats = DashboardStats;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalTraffic", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalLeads", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalUsers", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DashboardStats.prototype, "gaActiveUsers", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DashboardStats.prototype, "gaSessions", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DashboardStats.prototype, "gaBounceRate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalOrders", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DashboardStats.prototype, "totalRevenue", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DashboardStats.prototype, "leadConversionRate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DashboardStats.prototype, "userConversionRate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DashboardStats.prototype, "paidConversionRate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DashboardStats.prototype, "revenuePerVisitor", void 0);
exports.DashboardStats = DashboardStats = __decorate([
    (0, graphql_1.ObjectType)()
], DashboardStats);
let Traffic = class Traffic {
};
exports.Traffic = Traffic;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Traffic.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Traffic.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Traffic.prototype, "updatedAt", void 0);
exports.Traffic = Traffic = __decorate([
    (0, graphql_1.ObjectType)()
], Traffic);
var AdminOverviewPeriodType;
(function (AdminOverviewPeriodType) {
    AdminOverviewPeriodType["SEVEN_DAYS"] = "7d";
    AdminOverviewPeriodType["THIRTY_DAYS"] = "30d";
    AdminOverviewPeriodType["NINETY_DAYS"] = "90d";
    AdminOverviewPeriodType["ONE_YEAR"] = "1y";
})(AdminOverviewPeriodType || (exports.AdminOverviewPeriodType = AdminOverviewPeriodType = {}));
(0, graphql_1.registerEnumType)(AdminOverviewPeriodType, {
    name: 'AdminOverviewPeriodType',
});
let RecentOrder = class RecentOrder {
};
exports.RecentOrder = RecentOrder;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecentOrder.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], RecentOrder.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecentOrder.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], RecentOrder.prototype, "createdAt", void 0);
exports.RecentOrder = RecentOrder = __decorate([
    (0, graphql_1.ObjectType)()
], RecentOrder);
let RecentUser = class RecentUser {
};
exports.RecentUser = RecentUser;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecentUser.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RecentUser.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RecentUser.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RecentUser.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], RecentUser.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], RecentUser.prototype, "createdAt", void 0);
exports.RecentUser = RecentUser = __decorate([
    (0, graphql_1.ObjectType)()
], RecentUser);
let TotalsSnapshot = class TotalsSnapshot {
};
exports.TotalsSnapshot = TotalsSnapshot;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TotalsSnapshot.prototype, "orders", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TotalsSnapshot.prototype, "revenue", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TotalsSnapshot.prototype, "leads", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TotalsSnapshot.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TotalsSnapshot.prototype, "paidUsers", void 0);
exports.TotalsSnapshot = TotalsSnapshot = __decorate([
    (0, graphql_1.ObjectType)()
], TotalsSnapshot);
let Funnel = class Funnel {
};
exports.Funnel = Funnel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Funnel.prototype, "leads", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Funnel.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Funnel.prototype, "paidUsers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Funnel.prototype, "leadToUserRate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Funnel.prototype, "userToPaidRate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Funnel.prototype, "overallRate", void 0);
exports.Funnel = Funnel = __decorate([
    (0, graphql_1.ObjectType)()
], Funnel);
let AdminOverview = class AdminOverview {
};
exports.AdminOverview = AdminOverview;
__decorate([
    (0, graphql_1.Field)(() => [RecentOrder]),
    __metadata("design:type", Array)
], AdminOverview.prototype, "recentOrders", void 0);
__decorate([
    (0, graphql_1.Field)(() => Funnel),
    __metadata("design:type", Funnel)
], AdminOverview.prototype, "funnel", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RecentUser]),
    __metadata("design:type", Array)
], AdminOverview.prototype, "recentUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => TotalsSnapshot),
    __metadata("design:type", TotalsSnapshot)
], AdminOverview.prototype, "today", void 0);
__decorate([
    (0, graphql_1.Field)(() => TotalsSnapshot),
    __metadata("design:type", TotalsSnapshot)
], AdminOverview.prototype, "compare", void 0);
__decorate([
    (0, graphql_1.Field)(() => AdminOverviewPeriodType),
    __metadata("design:type", String)
], AdminOverview.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], AdminOverview.prototype, "churnRateToday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], AdminOverview.prototype, "churnRateCompare", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], AdminOverview.prototype, "totalTraffic", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], AdminOverview.prototype, "gaActiveUsers", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], AdminOverview.prototype, "gaSessions", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], AdminOverview.prototype, "gaBounceRate", void 0);
exports.AdminOverview = AdminOverview = __decorate([
    (0, graphql_1.ObjectType)()
], AdminOverview);
//# sourceMappingURL=analytics.types.js.map