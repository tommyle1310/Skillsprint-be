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
exports.QuizzesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
let QuizzesResolver = class QuizzesResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuiz(courseId, title, questionsJson, order) {
        const parsed = JSON.parse(questionsJson);
        const nextOrder = order ?? (await this.prisma.quiz.count({ where: { courseId } }));
        const q = await this.prisma.quiz.create({
            data: { courseId, title, questions: parsed, order: nextOrder },
        });
        return q.id;
    }
    async updateQuiz(id, title, questionsJson, order, visible) {
        const data = { title, order, visible };
        if (questionsJson)
            data.questions = JSON.parse(questionsJson);
        await this.prisma.quiz.update({ where: { id }, data });
        return true;
    }
    async deleteQuiz(id) {
        await this.prisma.quiz.delete({ where: { id } });
        return true;
    }
    async reorderQuizzes(ids) {
        await this.prisma.$transaction(ids.map((id, index) => this.prisma.quiz.update({ where: { id }, data: { order: index } })));
        return true;
    }
};
exports.QuizzesResolver = QuizzesResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('courseId')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('questions', { type: () => String })),
    __param(3, (0, graphql_1.Args)('order', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], QuizzesResolver.prototype, "createQuiz", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('title', { nullable: true })),
    __param(2, (0, graphql_1.Args)('questions', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('order', { type: () => graphql_1.Int, nullable: true })),
    __param(4, (0, graphql_1.Args)('visible', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Boolean]),
    __metadata("design:returntype", Promise)
], QuizzesResolver.prototype, "updateQuiz", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesResolver.prototype, "deleteQuiz", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'ids', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], QuizzesResolver.prototype, "reorderQuizzes", null);
exports.QuizzesResolver = QuizzesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizzesResolver);
//# sourceMappingURL=quizzes.resolver.js.map