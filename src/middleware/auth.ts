import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import config from "../config";

// * A Higher order function receives a function as a parameter and returns a function. 
const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(500).json({message: "You're not allowed"})
        }
        const decoded = jwt.verify(token, config.jwt_secret as string);
        console.log({decoded});
        next();
    }
}

export default auth;