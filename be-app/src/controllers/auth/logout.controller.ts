import logger from "../../utils/loggerHelper.js";

import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../middlewares/error.js";
import { logoutUser } from "../../services/auth/logout.service.js";

export const logoutController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies?.refreshToken;
		if (!token) {
			return res.status(204);
		}
		const { status, success, message } = await logoutUser(token, res);
		res.status(status).json({
			success,
			message,
		});
	} catch (error) {
		logger.error("Error during logout", error);
		new AppError("An error occurred during logout", 500);
		next(error);
	}
};
