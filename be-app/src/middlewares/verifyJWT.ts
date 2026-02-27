import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config.js";

import { AppError } from "./error.js";

import type { AuthRequest } from "../types/request.types.js";
import type { TokenPayload } from "../types/token.types.js";

export const verifyJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization || req.headers.Authorization;
		if (!authHeader || !authHeader.toString().startsWith("Bearer ")) {
			throw new AppError("Unauthorized", 401);
		}
		const token = authHeader.toString().split(" ")[1];

		if (!token) {
			throw new AppError("Unauthorized", 401);
		}

		const decoded = jwt.verify(token, config.jwt_access_secret) as TokenPayload;
		req.userData = decoded;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return next(new AppError("Invalid token", 403));
		}
		if (error instanceof jwt.TokenExpiredError) {
			return next(new AppError("Token expired", 403));
		}
		next(error);
	}
};
