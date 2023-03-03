export interface AuthResultModel {
    result: boolean;
    errors: string[];
    token: string;
    userId: string;
    userName: string;
    email: string;
}
