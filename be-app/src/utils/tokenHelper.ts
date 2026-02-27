import jwt from "jsonwebtoken";
import crypto from "node:crypto"; // token hashing
import type { Response, Request } from "express";

import type { TokenPayload, PersistRefreshTokenParams } from "../types/token.types.js";

import config from "../config.js";

import { addRefreshToken, updateRefreshToken } from "../services/token.service.js";


// FAST HASH: Always produces the exact same string, allowing instant database lookups
const hashToken = (token: string) => {
	return crypto.createHash("sha256").update(token).digest("hex");
}

// Generate serial number
const createJti = () => {
	return crypto.randomBytes(16).toString("hex");
}

// Mint Access Token
const signAccessToken = (user: TokenPayload) => {
	const payload = { sub: user.sub, role: user.role, name: user.name };
	return jwt.sign(payload, config.jwt_access_secret, {
		expiresIn: config.jwt_access_expires_in,
	} as jwt.SignOptions);
}

// Mint Refresh Token
const signRefreshToken = (userId: string, jti: string) => {
	const payload = { userId, jti };
	return jwt.sign(payload, config.jwt_refresh_secret, {
		expiresIn: config.jwt_refresh_expires_in,
	} as jwt.SignOptions);
}

// Save hash to DB
const persistRefreshToken = async ({ userId, refreshToken, jti, ip, userAgent }: PersistRefreshTokenParams) => {
	const tokenHash = hashToken(refreshToken);
	await addRefreshToken({
		user_id: userId,
		token_hash: tokenHash,
		jti,
		ip_address: ip,
		user_agent: userAgent
	});
}

// Set secure cookie
const setRefreshCookie = (res: Response, refreshToken: string) => {
	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		secure: config.env === 'production',
		sameSite: 'lax',
		path: "/auth/refresh",
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in ms
	});
}

// Rotate token
const rotateRefreshToken = async (refreshTokenId: string, user: TokenPayload, req: Request, res: Response) => {
	const newJti = createJti();
    await updateRefreshToken(refreshTokenId, newJti);

	const newAccessToken = signAccessToken(user);
	const newRefreshToken = signRefreshToken(user.sub, newJti);

	await persistRefreshToken({
		userId: user.sub,
		refreshToken: newRefreshToken,
		jti: newJti,
		ip: req.ip ?? req.socket.remoteAddress ?? 'unknown',
		userAgent: req.headers["user-agent"] || "Unknown Device",
	});

	setRefreshCookie(res, newRefreshToken);
	return { accessToken: newAccessToken };
}

export {
	hashToken,
	createJti,
	signAccessToken,
	signRefreshToken,
	persistRefreshToken,
	setRefreshCookie,
	rotateRefreshToken,
};
