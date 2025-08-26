import { PrismaService } from '../prisma/prisma.service';
import { Course } from './courses.types';
export declare class CoursesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    courses(): Promise<({
        lessons: {
            id: string;
            title: string;
            avatar: string | null;
            order: number;
            courseId: string;
            videoUrl: string | null;
            visible: boolean;
        }[];
        quizzes: {
            id: string;
            title: string;
            avatar: string | null;
            order: number;
            courseId: string;
            visible: boolean;
            questions: import("@prisma/client/runtime/library").JsonValue;
        }[];
        orders: {
            id: string;
            createdAt: Date;
            courseId: string;
            userId: string | null;
            amount: number;
            status: string;
        }[];
        createdBy: {
            id: string;
            avatar: string | null;
            createdAt: Date;
            name: string | null;
            email: string;
            emailVerified: Date | null;
            password: string | null;
            image: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        title: string;
        slug: string;
        avatar: string | null;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdAt: Date;
        createdById: string | null;
    })[]>;
    course(slug: string): Promise<{
        lessons: {
            id: string;
            title: string;
            avatar: string | null;
            order: number;
            courseId: string;
            videoUrl: string | null;
            visible: boolean;
        }[];
        quizzes: {
            id: string;
            title: string;
            avatar: string | null;
            order: number;
            courseId: string;
            visible: boolean;
            questions: import("@prisma/client/runtime/library").JsonValue;
        }[];
        createdBy: {
            id: string;
            avatar: string | null;
            createdAt: Date;
            name: string | null;
            email: string;
            emailVerified: Date | null;
            password: string | null;
            image: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        title: string;
        slug: string;
        avatar: string | null;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdAt: Date;
        createdById: string | null;
    }>;
    createCourse(title: string, description: string, price: number, slug: string, createdById: string, avatar?: string): Promise<{
        id: string;
        title: string;
        slug: string;
        avatar: string | null;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdAt: Date;
        createdById: string | null;
    }>;
    lessons(course: Course): Promise<{
        id: string;
        title: string;
        avatar: string | null;
        order: number;
        courseId: string;
        videoUrl: string | null;
        visible: boolean;
    }[]>;
}
