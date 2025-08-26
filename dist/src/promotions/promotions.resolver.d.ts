import { PrismaService } from '../prisma/prisma.service';
export declare class PromotionsResolver {
    private prisma;
    constructor(prisma: PrismaService);
    promotions(): Promise<{
        id: string;
        courseId: string | null;
        code: string;
        discountPercentage: number;
        expiresAt: Date;
    }[]>;
    createPromotion(code: string, discountPercentage: number, expiresAt: string): Promise<{
        id: string;
        courseId: string | null;
        code: string;
        discountPercentage: number;
        expiresAt: Date;
    }>;
    updatePromotion(id: string, code?: string, discountPercentage?: number, expiresAt?: string): Promise<{
        id: string;
        courseId: string | null;
        code: string;
        discountPercentage: number;
        expiresAt: Date;
    }>;
    deletePromotion(id: string): Promise<boolean>;
}
export declare class PromotionGQL {
    id: string;
    code: string;
    discountPercentage: number;
    expiresAt: Date;
}
