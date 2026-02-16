import dotenv from 'dotenv';
import { Pool, Client } from 'pg';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

const config = {
    port: process.env.PORT || 5000,
    pool: pool,
    client: client,
}

export default config;