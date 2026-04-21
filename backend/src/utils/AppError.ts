export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;
    public code?: string | undefined;

    constructor(message: string, statusCode: number = 500, code?: string, options?: { cause?: unknown }) {
        super(message, options)

        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.code = code

        Error.captureStackTrace(this, this.constructor)
    }
}