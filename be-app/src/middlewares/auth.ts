import type { Response, NextFunction } from "express";
import config from "../config.js";
import jwt from "jsonwebtoken";
import type { Token } from "../types/Token.js";

import type { AuthRequest } from "../types/Request.js";

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Check for token in Authorization header (Bearer token) or cookies
		const authHeader = req.headers.authorization;
		const bearerToken = authHeader?.startsWith("Bearer ")
			? authHeader.split(" ")[1]
			: undefined;

		const token = req.cookies.jwt || bearerToken;

		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized" });
		}

		const decoded = jwt.verify(token, config.jwt_secret) as Token;
		req.userData = decoded;
		next();
	} catch (error) {
		return res
			.status(403)
			.json({ success: false, message: "Invalid token" });
	}
};

export const verifyAdmin = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.userData?.role !== "admin") {
		return res
			.status(403)
			.json({ success: false, message: "Forbidden: Admins only" });
	}
	next();
};
