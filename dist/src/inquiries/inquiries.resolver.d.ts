import { PrismaService } from '../prisma/prisma.service';
export declare class InquiriesResolver {
    private prisma;
    constructor(prisma: PrismaService);
    inquiries(skip?: number, take?: number): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        status: string;
        subject: string;
        message: string;
    }[]>;
    inquiriesCount(): Promise<number>;
    createInquiry(name: string, email: string, subject: string, message: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        status: string;
        subject: string;
        message: string;
    }>;
    updateInquiryStatus(id: string, status: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        status: string;
        subject: string;
        message: string;
    }>;
}
