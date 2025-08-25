import { AuthService } from './auth.service';
import { AuthPayload } from './auth.types';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<AuthPayload>;
    register(email: string, password: string, name?: string): Promise<AuthPayload>;
}
