import { PrismaService } from '../prisma/prisma.service';
export declare class LeadsResolver {
    private prisma;
    constructor(prisma: PrismaService);
    leads(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }[]>;
    createLead(email: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
}
