import { PrismaService } from '../prisma/prisma.service';
export declare class PromotionsResolver {
    private prisma;
    constructor(prisma: PrismaService);
    promotions(): Promise<{
        id: string;
        code: string;
        discountPercentage: number;
        expiresAt: Date;
        courseId: string | null;
    }[]>;
    createPromotion(code: string, discountPercentage: number, expiresAt: string): Promise<{
        id: string;
        code: string;
        discountPercentage: number;
        expiresAt: Date;
        courseId: string | null;
    }>;
    updatePromotion(id: string, code?: string, discountPercentage?: number, expiresAt?: string): Promise<{
        id: string;
        code: string;
        discountPercentage: number;
        expiresAt: Date;
        courseId: string | null;
    }>;
    deletePromotion(id: string): Promise<boolean>;
}
export declare class PromotionGQL {
    id: string;
    code: string;
    discountPercentage: number;
    expiresAt: Date;
}
