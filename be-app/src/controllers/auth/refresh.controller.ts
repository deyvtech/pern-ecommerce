import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../middlewares/error.js";
import config from "../../config.js";
import { hashToken, rotateRefreshToken } from "../../utils/tokenHelper.js";
import { getRefreshTokenAndUser, deleteRefreshToken } from "../../services/token.service.js";
import type { TokenPayload } from "../../types/token.types.js";
import logger from "../../utils/loggerHelper.js";
interface refreshTokenPayload {
	sub: string;
	jti: string;
}

export const refreshController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token = req.cookies?.jwt;
		if (!token) {
			throw new AppError("No token provided", 401);
		}
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: config.env === "production",
			sameSite: "lax",
			path: "/auth/refresh",
		});
		let decoded: refreshTokenPayload;
		try {
			decoded = jwt.verify(token, config.jwt_refresh_secret) as refreshTokenPayload;
		} catch (error) {
			throw new AppError("Invalid or expired token", 401);
		}

		const tokenHash = hashToken(token);
		const user = await getRefreshTokenAndUser(tokenHash, decoded.jti);
		if (!user) {
			throw new AppError("Token not found", 401);
		}
		if (user.revoked_at) {
			// TODO: Implement revoke all token from this specific user functionality
			// TODO: implement send email notification to user when refresh token is revoked
			// await deleteRefreshToken(user.refresh_token_id);
			throw new AppError("Token is revoked", 401);
		}
		if (new Date(user.expires_at) < new Date()) {
			throw new AppError("Token is expired", 401);
		}
		if (!user.is_active) {
			throw new AppError("User account is deactivated", 403);
		}
		// Rotate token
		const refreshTokenPayload: TokenPayload = {
			sub: user.id,
			role: user.role,
			name: user.name,
		};
		const { accessToken } = await rotateRefreshToken(user.refresh_token_id, refreshTokenPayload, req, res);
		logger.info(`Refresh token rotated successfully for user ${user.email}`);
		return res.status(200).json({ success: true, message: "Refresh successfully", token: accessToken });
	} catch (error) {
		next(error);
	}
};
