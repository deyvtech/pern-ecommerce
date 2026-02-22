import type { Request, Response, NextFunction } from "express"
import config from "../config.js";
import jwt from "jsonwebtoken";
export const isLoggedIn = (req: Request, res: Response, next: NextFunction  ) => {
    let token;
    if(req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if(!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.jwt_secret) as { sub: string, role: string, name: string };
    console.log(decoded);
    next();
}