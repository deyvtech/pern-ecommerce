import bcrypt from "bcryptjs";
import z from "zod";

// import Model
import UserModel from "../../model/user.model.js";
// import custom error
import { AppError } from "../../middlewares/error.js";
// import schemas
import { loginSchema } from "../../schemas/user.schemas.js";
// import utils
import logger from "../../utils/loggerHelper.js";
import {
	signAccessToken,
	createJti,
	signRefreshToken,
	setRefreshCookie,
	persistRefreshToken,
} from "../../utils/tokenHelper.js";
// types
import type { UserResponseType } from "../../types/user.types.js";
import type { TokenPayload } from "../../types/token.types.js";
import type { Request, Response } from "express";

export const loginUser = async (
	validatedData: z.infer<typeof loginSchema>,
	req: Request,
	res: Response,
): Promise<UserResponseType> => {
	// Check if the user exists
	const { email, password }: z.infer<typeof loginSchema> = validatedData;
	const existingUser = await UserModel.findByEmail(email);
	if (!existingUser) {
		throw new AppError("User doesn't exists", 400);
	}

	// Check if the password is correct
	const comparePassword = await bcrypt.compare(
		password,
		existingUser.password_hash,
	);
	if (!comparePassword) {
		throw new AppError("Invalid email or password", 400);
	}

	// check if user is verified
	if (!existingUser.is_verified) {
		throw new AppError("User is not verified", 401);
	}

	// check if user is active
	if (!existingUser.is_active) {
		throw new AppError("User account is deactivated", 403);
	}

	// generate access token
	const accessTokenPayload: TokenPayload = {
		sub: existingUser.id,
		role: existingUser.role,
	};
	const accessToken = signAccessToken(accessTokenPayload);

	// generate refresh token
	const jti = createJti();
	const refreshToken = signRefreshToken(existingUser.id, jti);

	// Save refresh token in DB
	await persistRefreshToken({
		userId: existingUser.id,
		refreshToken,
		jti,
		ip: req.ip ?? req.socket.remoteAddress ?? "unknown",
		userAgent: req.headers["user-agent"] || "Unknown Device",
	});

	// Add Refresh token to the cookie
	setRefreshCookie(res, refreshToken);

	// update user login db
	await UserModel.updateUserLogin(existingUser.id);

	// Response to the client
	logger.info(`User ${existingUser.email} logged in successful`);
	const userResponse: UserResponseType = {
		status: 200,
		success: true,
		message: "Logged in successful",
		token: accessToken,
		user: {
			role: existingUser.role,
			username: existingUser.username,
			email: existingUser.email,
		},
	};
	return userResponse;
};
