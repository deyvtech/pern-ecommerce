import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/request.types.js";
import { AppError } from "./error.js";

export const verifyRole = (requiredRole: "customer" | "admin") => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			if (!req.userData?.role) throw new AppError("No role found", 401);
			const hasRole = requiredRole.includes(req.userData.role);
			if (!hasRole) {
				throw new AppError("Forbidden", 403);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};
