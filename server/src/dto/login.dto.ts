export interface LoginDTO {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role:string;
    };
    accessToken: string;
    refreshToken: string;
}