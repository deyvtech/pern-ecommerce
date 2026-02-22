import dotenv from 'dotenv';
import { Pool } from 'pg';

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
    jwt_secret: string,
    jwt_expires_in: string,
}

const config: Config = {
    port: process.env.PORT || 5000,
    pool: pool,
    env: getEnv('NODE_ENV'),
    jwt_secret: getEnv('JWT_SECRET'),
    jwt_expires_in: getEnv('JWT_EXPIRES_IN')
}

export default config;