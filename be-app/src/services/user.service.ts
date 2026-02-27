import config from "../config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/logger.js";
import type { User } from "../types/user.types.js";

// CREATE
export const addUser = async (user: User) => {
	const client = await config.pool.connect();
	console.log("Connected to the database");
	try {
		await client.query("BEGIN");

		const queryText = `INSERT INTO users(name, email) VALUES($1, $2) RETURNING id`;
		const res = await client.query(queryText, [user.name, user.email]);

		const queryText2 = `INSERT INTO user_auths(user_id, password_hash) VALUES($1, $2)`;
		await client.query(queryText2, [res.rows[0].id, user.password]);
		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");
		logger.error(error)
		throw new DatabaseError("Database query error", 500);
	} finally {
		client.release();
	}
};

// READ
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
}

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

