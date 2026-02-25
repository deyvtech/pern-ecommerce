import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/logger.js";

export const getUserById = async (userId: string | undefined | null) => {
	const { pool } = config;
	const query = `
        SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role,
        u.is_active,
        u.is_verified
        FROM users u
        WHERE u.id = $1
    `;
	const values = [userId];
	try {
		const result = await pool.query(query, values);
		const data = result.rows[0];
		return data;
	} catch (error) {
		logger.error(error)
		throw new DatabaseError("Database query error", 500);
	}
};
