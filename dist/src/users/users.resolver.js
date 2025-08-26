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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
const graphql_2 = require("@nestjs/graphql");
let GqlUser = class GqlUser {
};
__decorate([
    (0, graphql_2.Field)(() => graphql_2.ID),
    __metadata("design:type", String)
], GqlUser.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], GqlUser.prototype, "email", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], GqlUser.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], GqlUser.prototype, "image", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], GqlUser.prototype, "role", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Date)
], GqlUser.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", Date)
], GqlUser.prototype, "lastLogin", void 0);
GqlUser = __decorate([
    (0, graphql_2.ObjectType)()
], GqlUser);
let UsersResolver = class UsersResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async users(skip = 0, take = 10) {
        try {
            const existsRows = await this.prisma.$queryRaw `
        SELECT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE lower(table_name) = 'user' AND lower(column_name) = 'lastlogin'
        ) AS exists`;
            const hasLastLogin = Array.isArray(existsRows) ? Boolean(existsRows[0]?.exists) : false;
            if (hasLastLogin) {
                return this.prisma.user.findMany({
                    skip,
                    take,
                    orderBy: { createdAt: 'desc' },
                    select: { id: true, email: true, name: true, image: true, role: true, createdAt: true, lastLogin: true },
                });
            }
        }
        catch {
        }
        return this.prisma.user.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
        });
    }
    async usersCount() {
        return this.prisma.user.count();
    }
    async updateUserRole(userId, role) {
        try {
            const existsRows = await this.prisma.$queryRaw `
        SELECT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE lower(table_name) = 'user' AND lower(column_name) = 'lastlogin'
        ) AS exists`;
            const hasLastLogin = Array.isArray(existsRows) ? Boolean(existsRows[0]?.exists) : false;
            if (hasLastLogin) {
                return this.prisma.user.update({
                    where: { id: userId },
                    data: { role: role },
                    select: { id: true, email: true, name: true, image: true, role: true, createdAt: true, lastLogin: true },
                });
            }
        }
        catch { }
        return this.prisma.user.update({
            where: { id: userId },
            data: { role: role },
            select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
        });
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.Query)(() => [GqlUser]),
    __param(0, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "usersCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => GqlUser),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUserRole", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => GqlUser),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map