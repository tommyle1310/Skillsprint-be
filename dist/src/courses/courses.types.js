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
exports.Lesson = exports.Course = void 0;
const graphql_1 = require("@nestjs/graphql");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Course.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Lesson], { nullable: true }),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
exports.Course = Course = __decorate([
    (0, graphql_1.ObjectType)()
], Course);
let Lesson = class Lesson {
};
exports.Lesson = Lesson;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "videoUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Course),
    __metadata("design:type", Course)
], Lesson.prototype, "course", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Lesson.prototype, "courseId", void 0);
exports.Lesson = Lesson = __decorate([
    (0, graphql_1.ObjectType)()
], Lesson);
//# sourceMappingURL=courses.types.js.map