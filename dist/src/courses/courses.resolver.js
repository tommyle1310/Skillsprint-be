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
exports.CoursesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma/prisma.service");
const courses_types_1 = require("./courses.types");
const graphql_2 = require("@nestjs/graphql");
let CoursesResolver = class CoursesResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async courses() {
        return this.prisma.course.findMany({
            include: {
                lessons: {
                    orderBy: { order: 'asc' }
                },
                quizzes: {
                    orderBy: { order: 'asc' }
                },
                createdBy: true,
            }
        });
    }
    async course(slug) {
        return this.prisma.course.findUnique({
            where: { slug },
            include: {
                lessons: {
                    orderBy: { order: 'asc' }
                },
                quizzes: {
                    orderBy: { order: 'asc' }
                },
                createdBy: true,
            }
        });
    }
    async createCourse(title, description, price, slug, createdById, avatar) {
        console.log('cehckec create by id', createdById);
        const exists = await this.prisma.course.findUnique({ where: { slug } });
        if (exists) {
            throw new Error('Slug already exists');
        }
        return this.prisma.course.create({
            data: {
                title,
                description,
                price,
                slug,
                avatar,
                createdBy: { connect: { id: createdById } },
            },
        });
    }
    async lessons(course) {
        return this.prisma.lesson.findMany({
            where: { courseId: course.id },
            orderBy: { order: 'asc' }
        });
    }
};
exports.CoursesResolver = CoursesResolver;
__decorate([
    (0, graphql_1.Query)(() => [courses_types_1.Course]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "courses", null);
__decorate([
    (0, graphql_1.Query)(() => courses_types_1.Course, { nullable: true }),
    __param(0, (0, graphql_1.Args)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "course", null);
__decorate([
    (0, graphql_1.Mutation)(() => courses_types_1.Course),
    __param(0, (0, graphql_1.Args)('title')),
    __param(1, (0, graphql_1.Args)('description')),
    __param(2, (0, graphql_1.Args)('price', { type: () => graphql_2.Int })),
    __param(3, (0, graphql_1.Args)('slug')),
    __param(4, (0, graphql_1.Args)('createdById')),
    __param(5, (0, graphql_1.Args)('avatar', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "createCourse", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [courses_types_1.Lesson]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [courses_types_1.Course]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "lessons", null);
exports.CoursesResolver = CoursesResolver = __decorate([
    (0, graphql_1.Resolver)(() => courses_types_1.Course),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesResolver);
//# sourceMappingURL=courses.resolver.js.map