import { PrismaService } from '../prisma/prisma.service';
import { Course } from './courses.types';
export declare class CoursesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    courses(): Promise<({
        lessons: {
            id: string;
            avatar: string | null;
            title: string;
            order: number;
            videoUrl: string | null;
            courseId: string;
        }[];
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
    })[]>;
    course(slug: string): Promise<{
        lessons: {
            id: string;
            avatar: string | null;
            title: string;
            order: number;
            videoUrl: string | null;
            courseId: string;
        }[];
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
    }>;
    lessons(course: Course): Promise<{
        id: string;
        avatar: string | null;
        title: string;
        order: number;
        videoUrl: string | null;
        courseId: string;
    }[]>;
}
