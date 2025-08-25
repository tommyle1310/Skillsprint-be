import { PrismaService } from '../prisma/prisma.service';
export declare class UsersResolver {
    private prisma;
    constructor(prisma: PrismaService);
    users(skip?: number, take?: number): Promise<{
        id: string;
        email: string;
        name: string;
        image: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    usersCount(): Promise<number>;
    updateUserRole(userId: string, role: string): Promise<{
        id: string;
        email: string;
        name: string;
        image: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
}
