import config from "../../config.js";
import logger from "../../utils/loggerHelper.js";
import { hashToken } from "../../utils/tokenHelper.js";
import { revokeUserTokens } from "../../services/token.service.js";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../middlewares/error.js";

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies?.jwt;
		console.log(token);
		if (!token) {
			return res.status(204);
		}
		const tokenHash = hashToken(token);
		await revokeUserTokens(tokenHash);
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: config.env === "production",
			sameSite: "lax",
			path: "/auth",
		});
		logger.info("User logged out successfully");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		logger.error("Error during logout", error);
		new AppError("An error occurred during logout", 500);
		next(error);
	}
};
