import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import { addRefreshToken } from "../../model/addRefreshToken.js";

import { AppError } from "../../middlewares/error.js";

import { loginSchema } from "../../validators/userValidator.js";
// import model functions
import { getUserByEmail } from "../../model/getUserByEmail.js";
import { updateLogin } from "../../model/updateLogin.js";
// import types
import type { TokenPayload } from "../../types/tokenPayload.types.js";
import config from "../../config.js";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const { email: parsedEmail, password: parsedPassword } = await loginSchema.parseAsync({ email, password });

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
		const payload: TokenPayload = {
			sub: existingUser.id,
			role: existingUser.role,
			name: existingUser.name,
		};
		const accessToken = jwt.sign(payload, config.jwt_access_secret, {
			expiresIn: config.jwt_access_expires_in
		} as jwt.SignOptions)

		// generate refresh token
		const refreshToken = jwt.sign({id: existingUser.id}, config.jwt_refresh_secret, {
			expiresIn: config.jwt_refresh_expires_in
		} as jwt.SignOptions)
		// send and set cookie for refresh token
		const isProduction = config.env === 'production'
		res.cookie("jwt", refreshToken,  {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? 'none' : 'lax',
			maxAge: 1000 *  60 * 60 * 24 * 7 // 7 days in ms
		})

		// update refresh token at db
		await addRefreshToken(existingUser.id, refreshToken);
		// update user db
		await updateLogin(existingUser.id);

		return res.status(200).json({ success: true, message: "Login successful", token: accessToken });
	} catch (error: any) {
		next(error);
	}
};
