export interface APIError {
    code: string;
    message: string;
    errors: { code: string; message: string }[];
    status: number;
}
