import { PrismaService } from '../prisma/prisma.service';
export declare class InquiriesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    inquiries(): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        subject: string;
        message: string;
    }[]>;
    createInquiry(name: string, email: string, subject: string, message: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        subject: string;
        message: string;
    }>;
}
