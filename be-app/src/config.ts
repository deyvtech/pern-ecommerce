import dotenv from 'dotenv';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

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
});

interface Config {
    port: string | number;
    pool: Pool;
    env: string,
    jwt_refresh_secret: jwt.Secret,
    jwt_access_secret: jwt.Secret,
    jwt_refresh_expires_in: string | number,
    jwt_access_expires_in: string | number,
    frontend_url?: string,
}

const config: Config = {
    port: process.env.PORT || 5000,
    pool: pool,
    env: getEnv('NODE_ENV'),
    jwt_refresh_secret: getEnv('JWT_REFRESH_SECRET') || 'agalagamMOGO_refresh_secret',
    jwt_access_secret: getEnv('JWT_ACCESS_SECRET') || 'agalagamMOGO_access_secret',
    jwt_refresh_expires_in: getEnv('JWT_REFRESH_EXPIRES_IN'),
    jwt_access_expires_in: getEnv('JWT_ACCESS_EXPIRES_IN'),
    frontend_url: process.env.FRONTEND_URL || 'http://localhost:5173',
}

export default config;