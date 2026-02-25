import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/logger.js";

export const getUserByEmail = async (email: string) => {
	const query = `
        SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role,
        u.is_active,
        u.is_verified, 
        ua.password_hash
        FROM users u
        INNER JOIN user_auths ua ON u.id = ua.user_id 
        WHERE u.email = $1 AND ua.provider = 'local'`;
	const values = [email];
	try {
		const user = await config.pool.query(query, values);
		const data = user.rows[0];
		return data;
	} catch (error) {
		logger.error(error);
		throw new DatabaseError("Database query error", 500);
	}
};
