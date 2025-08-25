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
exports.Traffic = exports.DashboardStats = void 0;
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
//# sourceMappingURL=analytics.types.js.map