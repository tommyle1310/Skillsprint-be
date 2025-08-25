export declare class User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: Date;
}
export declare class AuthPayload {
    access_token: string;
    user: User;
}
