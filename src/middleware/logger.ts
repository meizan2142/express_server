import { NextFunction, Request, Response } from "express";

// * Logger Middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`, "Logger Middleware");
    next();
}