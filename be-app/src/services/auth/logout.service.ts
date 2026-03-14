import config from "../../config/config.js";
// import model
import TokenModel from "../../model/token.model.js";
// import types
import type { Response } from "express";
import type { UserResponseType } from "../../types/user.types.js";
// import utils
import { hashToken } from "../../utils/tokenHelper.js";
import logger from "../../utils/loggerHelper.js";

export const logoutUser = async (
	token: string,
	res: Response,
): Promise<UserResponseType> => {
	const tokenHash = hashToken(token);
	await TokenModel.revokeUserTokens(tokenHash);
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: config.env === "production",
		sameSite: "lax",
		path: "/auth",
	});
	logger.info("User logged out successfully");
	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message: "Logged out successfully",
	};
	return userResponse;
};
