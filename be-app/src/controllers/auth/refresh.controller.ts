import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../middlewares/error.js";
import config from "../../config.js";
import { hashToken, rotateRefreshToken } from "../../utils/tokenHelper.js";
import { getRefreshTokenAndUser, deleteRefreshToken } from "../../services/token.service.js";
import type { TokenPayload } from "../../types/token.types.js";
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
		const data = await getRefreshTokenAndUser(tokenHash, decoded.jti);
		if (!data) {
			throw new AppError("Token not found", 401);
		}
		if (data.revoked_at) {
			// TODO: Implement revoke all token from this specific user functionality
			// TODO: implement send email notification to user when refresh token is revoked
			// await deleteRefreshToken(data.refresh_token_id);
			throw new AppError("Token is revoked", 401);
		}
		if (new Date(data.expires_at) < new Date()) {
			throw new AppError("Token is expired", 401);
		}
		if (!data.is_active) {
			throw new AppError("User account is deactivated", 403);
		}
		// Rotate token
		const user: TokenPayload = {
			sub: data.id,
			role: data.role,
			name: data.name,
		};
		const { accessToken } = await rotateRefreshToken(data.refresh_token_id, user, req, res);
		return res.status(200).json({ success: true, message: "Refresh successfully", token: accessToken });
	} catch (error) {
		next(error);
	}
};
