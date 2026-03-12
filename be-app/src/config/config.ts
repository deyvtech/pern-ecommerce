import dotenv from "dotenv";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

dotenv.config();
const getEnv = (key: string): string => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Config error: ${key} is missing in .env`);
	}
	return value;
};

const pool: Pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	connectionTimeoutMillis: 15000, // Max time to wait for a connection (5s)
	// idleTimeoutMillis: 30000,      // How long a client sits idle before closing
	// max: 10,                       // Maximum number of clients in the pool

	ssl: { rejectUnauthorized: false },
});

// Test the connection immediately on startup
pool.connect((err, client, release) => {
	if (err) {
		return console.error("Error connecting to Supabase:", err.stack);
		// return process.exit(1)
	}
	console.log("Successfully connected to Supabase.");
	release();
});

interface Config {
	port: string | number;
	pool: Pool;
	env: string;
	jwt_refresh_secret: jwt.Secret;
	jwt_access_secret: jwt.Secret;
	jwt_refresh_expires_in: string | number;
	jwt_access_expires_in: string | number;
	frontend_url?: string;
	resend_api_key: string | undefined;
	rate_limit_window_ms: number;
	rate_limit_max: number;
	auth_rate_limit_max: number;
}

const config: Config = {
	port: process.env.PORT || 5000,
	pool: pool,
	env: getEnv("NODE_ENV"),
	jwt_refresh_secret:
		getEnv("JWT_REFRESH_SECRET") || "agalagamMOGO_refresh_secret",
	jwt_access_secret:
		getEnv("JWT_ACCESS_SECRET") || "agalagamMOGO_access_secret",
	jwt_refresh_expires_in: getEnv("JWT_REFRESH_EXPIRES_IN"),
	jwt_access_expires_in: getEnv("JWT_ACCESS_EXPIRES_IN"),
	frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
	resend_api_key: process.env.RESEND_API_KEY || undefined,
	rate_limit_window_ms: Number(process.env.RATE_LIMIT_WINDOW_MS),
	rate_limit_max: Number(process.env.RATE_LIMIT_MAX) || 100,
	auth_rate_limit_max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 10,
};

export default config;
