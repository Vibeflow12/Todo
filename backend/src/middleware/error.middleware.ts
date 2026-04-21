import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (!(error instanceof AppError)) {
        error = new AppError(
            (err as Error)?.message || "Internal Server Error",
            500,
            "INTERNAL_ERROR",
            { cause: err }
        );
    }

    const appError = error as AppError;

    if (process.env.NODE_ENV === 'development') {
        return res.status(appError.statusCode).json({
            status: appError.status,
            message: appError.message,
            stack: appError.stack,
            error: appError,
            cause: (appError as any).cause
        });
    } else {
        res.status(appError.statusCode).json({
            status: appError.status,
            message: appError.isOperational ? appError.message : "something went wrong",
        });
    }
};