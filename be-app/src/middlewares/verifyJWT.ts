import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { isUserActive } from "../utils/isUserActive.js";

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader =
			req.headers.authorization || req.headers.Authorization;
		if (!authHeader || !authHeader.toString().startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized" });
		}
		const token = authHeader.toString().split(" ")[1];

		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized" });
		}

		const decoded = jwt.verify(token, config.jwt_refresh_secret) as jwt.JwtPayload;
		if(!decoded){
			return res.status(401).json({ success: false, message: "Invalid token" });
		}
		if(!(await isUserActive(decoded.sub))) {
			return res.status(403).json({ success: false, message: "Forbidden" });
		}
        
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ success: false, message: "Invalid token" });
		}
	}
};
