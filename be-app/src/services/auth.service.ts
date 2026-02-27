import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/loggerHelper.js";
import type { RefreshTokenValue } from "../types/token.types.js";

export const updateLogin = async (userId: string) => {
	try {
		const response = await config.pool.query(`UPDATE users SET last_sign_in_at = NOW() WHERE id = $1`, [
			userId,
		]);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query error", 500);
	}
};
