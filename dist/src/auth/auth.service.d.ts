import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            avatar: any;
            createdAt: any;
        };
    }>;
    register(email: string, password: string, name?: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            avatar: any;
            createdAt: any;
        };
    }>;
}
