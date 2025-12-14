import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// * A Higher order function receives a function as a parameter and returns a function. 
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(500).json({message: "You're not allowed"});
            }
            const decoded = jwt.verify(token as string, config.jwt_secret as string);
            console.log({decoded});
            req.user = decoded as JwtPayload;
            next();
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default auth;