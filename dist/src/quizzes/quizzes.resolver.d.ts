import { PrismaService } from '../prisma/prisma.service';
export declare class QuizzesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    createQuiz(courseId: string, title: string, questionsJson: string, order?: number): Promise<string>;
    updateQuiz(id: string, title?: string, questionsJson?: string, order?: number, visible?: boolean): Promise<boolean>;
    deleteQuiz(id: string): Promise<boolean>;
    reorderQuizzes(ids: string[]): Promise<boolean>;
}
