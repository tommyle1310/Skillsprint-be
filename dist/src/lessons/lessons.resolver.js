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
exports.LessonsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
const courses_types_1 = require("../courses/courses.types");
let LessonsResolver = class LessonsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLesson(courseId, title, order, videoUrl, avatar) {
        const nextOrder = order ?? (await this.prisma.lesson.count({ where: { courseId } })) + 1;
        return this.prisma.lesson.create({
            data: { courseId, title, order: nextOrder, videoUrl, avatar },
        });
    }
    async updateLesson(id, title, order, videoUrl, avatar, visible) {
        return this.prisma.lesson.update({
            where: { id },
            data: { title, order, videoUrl, avatar, visible },
        });
    }
    async deleteLesson(id) {
        await this.prisma.lesson.delete({ where: { id } });
        return true;
    }
    async reorderLessons(ids) {
        await this.prisma.$transaction(ids.map((id, index) => this.prisma.lesson.update({ where: { id }, data: { order: index + 1 } })));
        return true;
    }
    async toggleLessonVisibility(id, visible) {
        await this.prisma.lesson.update({ where: { id }, data: { visible } });
        return true;
    }
};
exports.LessonsResolver = LessonsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => courses_types_1.Lesson),
    __param(0, (0, graphql_1.Args)('courseId')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('order', { type: () => graphql_1.Int, nullable: true })),
    __param(3, (0, graphql_1.Args)('videoUrl', { nullable: true })),
    __param(4, (0, graphql_1.Args)('avatar', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "createLesson", null);
__decorate([
    (0, graphql_1.Mutation)(() => courses_types_1.Lesson),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('title', { nullable: true })),
    __param(2, (0, graphql_1.Args)('order', { type: () => graphql_1.Int, nullable: true })),
    __param(3, (0, graphql_1.Args)('videoUrl', { nullable: true })),
    __param(4, (0, graphql_1.Args)('avatar', { nullable: true })),
    __param(5, (0, graphql_1.Args)('visible', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "updateLesson", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "deleteLesson", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'ids', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "reorderLessons", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('visible')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "toggleLessonVisibility", null);
exports.LessonsResolver = LessonsResolver = __decorate([
    (0, graphql_1.Resolver)(() => courses_types_1.Lesson),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsResolver);
//# sourceMappingURL=lessons.resolver.js.map