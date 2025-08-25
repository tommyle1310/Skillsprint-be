import { PrismaService } from '../prisma/prisma.service';
import { Course } from './courses.types';
export declare class CoursesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    courses(): Promise<({
        lessons: {
            id: string;
            title: string;
            order: number;
            avatar: string | null;
            videoUrl: string | null;
            visible: boolean;
            courseId: string;
        }[];
        quizzes: {
            id: string;
            title: string;
            order: number;
            avatar: string | null;
            visible: boolean;
            courseId: string;
            questions: import("@prisma/client/runtime/library").JsonValue;
        }[];
        createdBy: {
            id: string;
            avatar: string | null;
            name: string | null;
            createdAt: Date;
            email: string;
            emailVerified: Date | null;
            password: string | null;
            image: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        title: string;
        avatar: string | null;
        slug: string;
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
            order: number;
            avatar: string | null;
            videoUrl: string | null;
            visible: boolean;
            courseId: string;
        }[];
        quizzes: {
            id: string;
            title: string;
            order: number;
            avatar: string | null;
            visible: boolean;
            courseId: string;
            questions: import("@prisma/client/runtime/library").JsonValue;
        }[];
        createdBy: {
            id: string;
            avatar: string | null;
            name: string | null;
            createdAt: Date;
            email: string;
            emailVerified: Date | null;
            password: string | null;
            image: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        title: string;
        avatar: string | null;
        slug: string;
        description: string;
        price: number;
        categories: string[];
        purchaseCount: number;
        rating: number;
        createdAt: Date;
        createdById: string | null;
    }>;
    createCourse(title: string, description: string, price: number, slug: string, avatar?: string, createdById?: string): Promise<{
        id: string;
        title: string;
        avatar: string | null;
        slug: string;
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
        order: number;
        avatar: string | null;
        videoUrl: string | null;
        visible: boolean;
        courseId: string;
    }[]>;
}
