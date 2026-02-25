import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/logger.js";

export const addRefreshToken = async (userId: string, token: string): Promise<void> => {
	const query = `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)`;
	const values = [userId, token];
	try {
		await config.pool.query(query, values);
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query failed");
	}
};
