import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/loggerHelper.js";
import type { RefreshTokenValue } from "../types/token.types.js";

export const getRefreshTokenAndUser = async (tokenHash: string, jti: string) => {
	const query = `
	SELECT 
	u.id, 
	u.name, 
	u.email,
	u.role,
	u.is_active, 
	rt.id as refresh_token_id, 
	rt.revoked_at, 
	rt.expires_at  
	FROM refresh_tokens rt
	INNER JOIN users u ON u.id = rt.user_id
	WHERE rt.token_hash = $1 AND rt.jti = $2;
	`;
	const values = [tokenHash, jti];
	try {
		const result = await config.pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed", 500);
	}
};

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

export const updateRefreshToken = async (refreshTokenId: string, newJti: string) => {
	const revoked_at = new Date();
	const query = `UPDATE refresh_tokens SET revoked_at = $1, replaced_by = $2 WHERE id = $3`;
	const values = [revoked_at, newJti, refreshTokenId];
	try {
		await config.pool.query(query, values);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed", 500);
	}
};

export const deleteRefreshToken = async (refreshTokenId: string) => {
	const query = `DELETE FROM refresh_tokens WHERE id = $1`;
	const values = [refreshTokenId];
	try {
		await config.pool.query(query, values);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed", 500);
	}
};

export const revokeUserTokens = async (tokenHash: string) => {
	const revoked_at = new Date();
	const query = `UPDATE refresh_tokens SET revoked_at = $1 WHERE token_hash = $2 AND revoked_at IS NULL`;
	const values = [revoked_at, tokenHash];
	try {
		await config.pool.query(query, values);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed", 500);
	}
};