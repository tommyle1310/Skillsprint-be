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
exports.InquiriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
const inquiries_types_1 = require("./inquiries.types");
let InquiriesResolver = class InquiriesResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async inquiries(skip = 0, take = 10) {
        return this.prisma.inquiry.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        });
    }
    async inquiriesCount() {
        return this.prisma.inquiry.count();
    }
    async createInquiry(name, email, subject, message) {
        return this.prisma.inquiry.create({ data: { name, email, subject, message, status: 'OPEN' } });
    }
    async updateInquiryStatus(id, status) {
        return this.prisma.inquiry.update({ where: { id }, data: { status } });
    }
};
exports.InquiriesResolver = InquiriesResolver;
__decorate([
    (0, graphql_1.Query)(() => [inquiries_types_1.Inquiry]),
    __param(0, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InquiriesResolver.prototype, "inquiries", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InquiriesResolver.prototype, "inquiriesCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => inquiries_types_1.Inquiry),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('email')),
    __param(2, (0, graphql_1.Args)('subject')),
    __param(3, (0, graphql_1.Args)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], InquiriesResolver.prototype, "createInquiry", null);
__decorate([
    (0, graphql_1.Mutation)(() => inquiries_types_1.Inquiry),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InquiriesResolver.prototype, "updateInquiryStatus", null);
exports.InquiriesResolver = InquiriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => inquiries_types_1.Inquiry),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InquiriesResolver);
//# sourceMappingURL=inquiries.resolver.js.map