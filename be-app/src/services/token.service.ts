import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/logger.js";
import type { RefreshTokenValue } from "../types/token.types.js";

export const addRefreshToken = async (refreshTokenValue: RefreshTokenValue): Promise<void> => {
	const { user_id, token_hash, jti, ip_address, user_agent } = refreshTokenValue;

	const REFRESH_TTL_SEC = 60 * 60 * 24 * 7;

	const expires_at = new Date(Date.now() + REFRESH_TTL_SEC * 1000);

	const query = `INSERT INTO refresh_tokens (user_id, token_hash, jti, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5, $6)`;
	const values = [user_id, token_hash, jti, expires_at, ip_address, user_agent];
	try {
		await config.pool.query(query, values);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed", 500);
	}
};

export const updateRefreshToken = async (jti: string, newJti: string) => {
	const revoked_at = new Date();
	const query = `UPDATE refresh_tokens SET revoked_at = $1, replaced_by = $2 WHERE jti = $3`;
	const values = [revoked_at, newJti, jti];
	try {
		await config.pool.query(query, values);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed", 500);
	}
};