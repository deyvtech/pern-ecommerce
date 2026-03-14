import config from "../config/config.js";
import { DatabaseError } from "../middlewares/error.js";
import logger from "../utils/loggerHelper.js";
import type { User } from "../types/user.types.js";
import { generateExpirationDate } from "../utils/expiresAt.js";
const UserModel = {
	create: async (user: User) => {
		const client = await config.pool.connect();
		console.log("Connected to the database");
		try {
			await client.query("BEGIN");
			const expires_at = generateExpirationDate(60 * 5 * 1000);

			const queryText = `INSERT INTO users(username, email, otp, otp_expires_at) VALUES($1, $2, $3, $4) RETURNING id`;
			const res = await client.query(queryText, [
				user.username,
				user.email,
				user.otp,
				expires_at,
			]);

			const queryText2 = `INSERT INTO user_auths(user_id, password_hash) VALUES($1, $2)`;
			await client.query(queryText2, [res.rows[0].id, user.password]);
			await client.query("COMMIT");
		} catch (error) {
			await client.query("ROLLBACK");
			logger.error(error);
			throw new DatabaseError("Database query error", 500);
		} finally {
			client.release();
		}
	},
	findByEmail: async (email: string) => {
		const query = `
        SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.role,
        u.is_active,
        u.is_verified,
		u.otp,
		u.otp_expires_at, 
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
	},
	findById: async (id: string) => {
		const query = `
        SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.role,
        u.is_active,
        u.is_verified,
		u.otp,
		u.otp_expires_at
        FROM users u
        WHERE u.id = $1
    `;
		const values = [id];
		try {
			const result = await config.pool.query(query, values);
			const data = result.rows[0];
			return data;
		} catch (error) {
			logger.error(error);
			throw new DatabaseError("Database query error", 500);
		}
	},
	verifyUser: async (email: string) => {
		const query = `
		UPDATE users
		SET otp = NULL, otp_expires_at = NULL, is_verified = TRUE
		WHERE email = $1`;
		const values = [email];
		try {
			await config.pool.query(query, values);
		} catch (error) {
			logger.error(error);
			throw new DatabaseError("Database query error", 500);
		}
	},
	updateOTP: async (email: string, otp: number | null) => {
		const query = `
		UPDATE users
		SET otp = $1, otp_expires_at = $2
		WHERE email = $3
	`;
		const expires_at = generateExpirationDate(60 * 5 * 1000);
		const values = [otp, expires_at, email];
		try {
			await config.pool.query(query, values);
		} catch (error) {
			logger.error(error);
			throw new DatabaseError("Database query error", 500);
		}
	},
	updateUserLogin: async (userId: string) => {
		try {
			await config.pool.query(
				`UPDATE users SET last_sign_in_at = NOW() WHERE id = $1`,
				[userId],
			);
		} catch (error) {
			logger.error(error);
			throw new DatabaseError("Database query error", 500);
		}
	},
	createUserResetToken: async (resetToken: string, email: string) => {
		const resetTokenExpiresAt = generateExpirationDate(1000 * 60 * 15);
		try {
			const query = `
			UPDATE users 
			SET reset_token = $1, 
			reset_token_expires_at = $2 
			WHERE email = $3`;
			const values = [resetToken, resetTokenExpiresAt, email];
			await config.pool.query(query, values);
		} catch (error) {
			logger.error(error);
			throw new DatabaseError("Database query error", 500);
		}
	},
	verifyResetToken: () => {

	}
};
export default UserModel;
