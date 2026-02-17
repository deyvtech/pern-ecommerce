import dotenv from 'dotenv';
import { Pool, Client } from 'pg';

dotenv.config();

const pool: Pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const client: Client = new Client({
  connectionString: process.env.DATABASE_URL,
})

interface Config {
    port: string | number;
    pool: Pool;
    client: Client;
}

const config: Config = {
    port: process.env.PORT || 5000,
    pool: pool,
    client: client,
}

export default config;