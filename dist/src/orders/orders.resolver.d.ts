import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersResolver {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: string, courseId: string, amount: number): Promise<string>;
    hasPurchased(userId: string, courseId: string): Promise<boolean>;
}
