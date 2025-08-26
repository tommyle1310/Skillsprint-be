import { PrismaService } from '../prisma/prisma.service';
import { Course } from './courses.types';
export declare class CoursesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    courses(): Promise<({
        orders: {
            id: string;
            createdAt: Date;
            courseId: string;
            amount: number;
            status: string;
            userId: string | null;
        }[];
        lessons: {
            id: string;
            avatar: string | null;
            title: string;
            order: number;
            videoUrl: string | null;
            visible: boolean;
            courseId: string;
        }[];
        quizzes: {
            id: string;
            avatar: string | null;
            title: string;
            order: number;
            visible: boolean;
            courseId: string;
            questions: import("@prisma/client/runtime/library").JsonValue;
        }[];
        createdBy: {
            id: string;
            email: string;
            emailVerified: Date | null;
            password: string | null;
            name: string | null;
            image: string | null;
            avatar: string | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            lastLogin: Date | null;
        };
    } & {
        id: string;
        avatar: string | null;
        createdAt: Date;
        title: string;
        slug: string;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdById: string | null;
    })[]>;
    course(slug: string): Promise<{
        lessons: {
            id: string;
            avatar: string | null;
            title: string;
            order: number;
            videoUrl: string | null;
            visible: boolean;
            courseId: string;
        }[];
        quizzes: {
            id: string;
            avatar: string | null;
            title: string;
            order: number;
            visible: boolean;
            courseId: string;
            questions: import("@prisma/client/runtime/library").JsonValue;
        }[];
        createdBy: {
            id: string;
            email: string;
            emailVerified: Date | null;
            password: string | null;
            name: string | null;
            image: string | null;
            avatar: string | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            lastLogin: Date | null;
        };
    } & {
        id: string;
        avatar: string | null;
        createdAt: Date;
        title: string;
        slug: string;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdById: string | null;
    }>;
    createCourse(title: string, description: string, price: number, slug: string, createdById: string, avatar?: string): Promise<{
        id: string;
        avatar: string | null;
        createdAt: Date;
        title: string;
        slug: string;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdById: string | null;
    }>;
    lessons(course: Course): Promise<{
        id: string;
        avatar: string | null;
        title: string;
        order: number;
        videoUrl: string | null;
        visible: boolean;
        courseId: string;
    }[]>;
}
