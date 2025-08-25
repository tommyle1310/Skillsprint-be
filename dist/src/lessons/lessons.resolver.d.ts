import { PrismaService } from '../prisma/prisma.service';
export declare class LessonsResolver {
    private prisma;
    constructor(prisma: PrismaService);
    createLesson(courseId: string, title: string, order?: number, videoUrl?: string, avatar?: string): Promise<{
        id: string;
        title: string;
        order: number;
        avatar: string | null;
        videoUrl: string | null;
        visible: boolean;
        courseId: string;
    }>;
    updateLesson(id: string, title?: string, order?: number, videoUrl?: string, avatar?: string, visible?: boolean): Promise<{
        id: string;
        title: string;
        order: number;
        avatar: string | null;
        videoUrl: string | null;
        visible: boolean;
        courseId: string;
    }>;
    deleteLesson(id: string): Promise<boolean>;
    reorderLessons(ids: string[]): Promise<boolean>;
    toggleLessonVisibility(id: string, visible: boolean): Promise<boolean>;
}
