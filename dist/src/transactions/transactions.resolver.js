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
exports.TransactionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
let PurchaseResult = class PurchaseResult {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PurchaseResult.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseResult.prototype, "orderId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseResult.prototype, "transactionId", void 0);
PurchaseResult = __decorate([
    (0, graphql_1.ObjectType)()
], PurchaseResult);
let TransactionsResolver = class TransactionsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async purchaseCourse(courseId, provider, userId) {
        const result = await this.prisma.$transaction(async (tx) => {
            const course = await tx.course.findUnique({ where: { id: courseId } });
            if (!course) {
                throw new Error('Course not found');
            }
            const amount = course.price;
            const order = await tx.order.create({
                data: { userId, courseId, amount, status: 'paid' },
            });
            const transaction = await tx.transaction.create({
                data: { userId, courseId, amount, provider, status: 'success' },
            });
            await tx.course.update({
                where: { id: courseId },
                data: { purchaseCount: { increment: 1 } },
            });
            return { order, transaction };
        });
        return {
            success: true,
            orderId: result.order.id,
            transactionId: result.transaction.id,
        };
    }
};
exports.TransactionsResolver = TransactionsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => PurchaseResult),
    __param(0, (0, graphql_1.Args)('courseId')),
    __param(1, (0, graphql_1.Args)('provider')),
    __param(2, (0, graphql_1.Args)('userId', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TransactionsResolver.prototype, "purchaseCourse", null);
exports.TransactionsResolver = TransactionsResolver = __decorate([
    (0, graphql_1.Resolver)(() => PurchaseResult),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsResolver);
//# sourceMappingURL=transactions.resolver.js.map