import jwt from "jsonwebtoken";
import config from "../../config/config.js";
// import model
import TokenModel from "../../model/token.model.js";
// import types
import type { Response, Request } from "express";
import type { UserResponseType } from "../../types/user.types.js";
import type { TokenPayload } from "../../types/token.types.js";
// import utils
import { hashToken, rotateRefreshToken } from "../../utils/tokenHelper.js";
import logger from "../../utils/loggerHelper.js";
// custom error
import { AppError } from "../../middlewares/error.js";

interface refreshTokenPayload {
	sub: string;
	jti: string;
}

export const refreshUserToken = async (
	token: string,
	res: Response,
	req: Request,
): Promise<UserResponseType> => {
	// Remove the refresh token in the cookie
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: config.env === "production",
		sameSite: "lax",
		path: "/auth",
	});
	//Verify the token
	let decoded: refreshTokenPayload;
	try {
		decoded = jwt.verify(
			token,
			config.jwt_refresh_secret,
		) as refreshTokenPayload;
	} catch (error) {
		throw new AppError("Invalid or expired token", 400);
	}

	// Hash the token and get User from this token
	const user = await TokenModel.findRefreshTokenAndUser(
		decoded.jti,
	);
	if (!user) {
		throw new AppError("Token not found", 400);
	}
	if (user.revoked_at) {
		// TODO: Implement revoke all token from this specific user functionality
		// TODO: implement send email notification to user when refresh token is revoked
		// await TokenModel.deleteRefreshToken(user.refresh_token_id);
		throw new AppError("Token is revoked", 400);
	}
	if (new Date(user.expires_at) < new Date()) {
		throw new AppError("Token is expired", 400);
	}
	if (!user.is_active) {
		throw new AppError("User account is deactivated", 403);
	}
	// Rotate token or set Another token
	const refreshTokenPayload: TokenPayload = {
		sub: user.id,
		role: user.role,
	};
	const { accessToken } = await rotateRefreshToken(
		user.refresh_token_id,
		refreshTokenPayload,
		req,
		res,
	);

	// Response to the client
	logger.info(`Refresh token rotated successfully for user ${user.email}`);
	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message: "Refresh successfully",
		token: accessToken,
		user: {
			role: user.role,
			username: user.username,
			email: user.email,
		},
	};
	return userResponse;
};
