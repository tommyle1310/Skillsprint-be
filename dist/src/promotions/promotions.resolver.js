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
exports.PromotionGQL = exports.PromotionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
let PromotionsResolver = class PromotionsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async promotions() {
        return this.prisma.promotion.findMany();
    }
    async createPromotion(code, discountPercentage, expiresAt) {
        return this.prisma.promotion.create({ data: { code, discountPercentage, expiresAt: new Date(expiresAt) } });
    }
    async updatePromotion(id, code, discountPercentage, expiresAt) {
        return this.prisma.promotion.update({
            where: { id },
            data: { code, discountPercentage, expiresAt: expiresAt ? new Date(expiresAt) : undefined },
        });
    }
    async deletePromotion(id) {
        await this.prisma.promotion.delete({ where: { id } });
        return true;
    }
};
exports.PromotionsResolver = PromotionsResolver;
__decorate([
    (0, graphql_1.Query)(() => [PromotionGQL]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionsResolver.prototype, "promotions", null);
__decorate([
    (0, graphql_1.Mutation)(() => PromotionGQL),
    __param(0, (0, graphql_1.Args)('code')),
    __param(1, (0, graphql_1.Args)('discountPercentage', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('expiresAt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], PromotionsResolver.prototype, "createPromotion", null);
__decorate([
    (0, graphql_1.Mutation)(() => PromotionGQL),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('code', { nullable: true })),
    __param(2, (0, graphql_1.Args)('discountPercentage', { type: () => graphql_1.Int, nullable: true })),
    __param(3, (0, graphql_1.Args)('expiresAt', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], PromotionsResolver.prototype, "updatePromotion", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionsResolver.prototype, "deletePromotion", null);
exports.PromotionsResolver = PromotionsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromotionsResolver);
const graphql_2 = require("@nestjs/graphql");
let PromotionGQL = class PromotionGQL {
};
exports.PromotionGQL = PromotionGQL;
__decorate([
    (0, graphql_2.Field)(() => graphql_2.ID),
    __metadata("design:type", String)
], PromotionGQL.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], PromotionGQL.prototype, "code", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_2.Int),
    __metadata("design:type", Number)
], PromotionGQL.prototype, "discountPercentage", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Date)
], PromotionGQL.prototype, "expiresAt", void 0);
exports.PromotionGQL = PromotionGQL = __decorate([
    (0, graphql_2.ObjectType)()
], PromotionGQL);
//# sourceMappingURL=promotions.resolver.js.map