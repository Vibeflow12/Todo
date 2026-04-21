import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    // Better Auth needs the headers to find the session cookie
    const session = await auth.api.getSession({
        headers: new Headers(req.headers as any)
    });

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to the request for your controllers
    (req as any).user = session.user;
    (req as any).session = session.session;

    next();
};