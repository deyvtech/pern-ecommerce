// import packages
import bcrypt from "bcryptjs";
// import error middleware
import { AppError } from "../../middlewares/error.js";
// import validators
import { loginSchema } from "../../validators/userValidator.js";
// import services functions
import { getUserByEmail } from "../../services/user.service.js";
import { updateLogin } from "../../services/auth.service.js";
// import types
import type { TokenPayload } from "../../types/token.types.js";
import type { Request, Response, NextFunction } from "express";
// helper functions
import logger from "../../utils/logger.js";
import { createJti, persistRefreshToken, setRefreshCookie, signAccessToken, signRefreshToken } from "../../utils/tokenHelper.js";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const { email: parsedEmail, password: parsedPassword } = await loginSchema.parseAsync({
			email,
			password,
		});

		// Check if the user exists
		const existingUser = await getUserByEmail(parsedEmail);
		if (!existingUser) {
			throw new AppError("Invalid email or password", 401);
		}

		// Check if the password is correct
		const comparePassword = await bcrypt.compare(parsedPassword, existingUser.password_hash);
		if (!comparePassword) {
			throw new AppError("Invalid email or password", 401);
		}

		// check if user is verified
		if (!existingUser.is_verified) {
			throw new AppError("User is not verified", 401);
		}

		// check if user is active
		if (!existingUser.is_active) {
			throw new AppError("User is not active", 403);
		}

		// generate access token
		const accessTokenPayload: TokenPayload = {
			sub: existingUser.id,
			role: existingUser.role,
			name: existingUser.name,
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
			ip: req.ip ?? req.socket.remoteAddress ?? 'unknown',
			userAgent: req.headers["user-agent"] || "Unknown Device",
		})
		setRefreshCookie(res, refreshToken);

		// update user login db
		await updateLogin(existingUser.id);

		logger.info(`User ${existingUser.email} logged in successfully`);
		return res
			.status(200)
			.json({ success: true, message: "Login successful", token: accessToken });
	} catch (error: any) {
		next(error);
	}
};
