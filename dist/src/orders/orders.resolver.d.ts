import { PrismaService } from '../prisma/prisma.service';
declare class GqlOrder {
    id: string;
    amount: number;
    status: string;
    createdAt: Date;
}
export declare class OrdersResolver {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(courseId: string, amount: number, status?: string, userId?: string): Promise<GqlOrder>;
    hasPurchased(userId: string, courseId: string): Promise<boolean>;
}
export {};
