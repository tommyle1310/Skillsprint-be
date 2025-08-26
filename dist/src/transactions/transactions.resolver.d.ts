import { PrismaService } from '../prisma/prisma.service';
declare class PurchaseResult {
    success: boolean;
    orderId?: string;
    transactionId?: string;
}
export declare class TransactionsResolver {
    private prisma;
    constructor(prisma: PrismaService);
    purchaseCourse(courseId: string, provider: string, userId?: string): Promise<PurchaseResult>;
}
export {};
