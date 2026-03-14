import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../middlewares/error.js";
import { refreshUserToken } from "../../services/auth/refresh.service.js";

export const refreshController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Check if token is provided
		let token = req.cookies?.refreshToken;
		if (!token) {
			throw new AppError("No token provided", 401);
		}
		const {
			status,
			success,
			message,
			token: newAccessToken,
			user,
		} = await refreshUserToken(token, res, req);
		return res
			.status(status)
			.json({ success, message, token: newAccessToken, user });
	} catch (error) {
		next(error);
	}
};
