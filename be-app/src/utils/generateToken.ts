import config from "../config.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { Token } from "../types/Token.js";
import type { Response } from "express";

export const generateToken = ({ sub, role, name }: Token, res: Response) => {
	const token = jwt.sign({ sub, role, name }, config.jwt_secret, {
		expiresIn: config.jwt_expires_in || "7d",
	} as SignOptions);

	const isProduction = config.env === 'production';
	
	if (token) {
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? 'none' : 'lax',
			maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
		});
	}
};
