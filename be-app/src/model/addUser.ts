import config from "../config.js";
import type { NextFunction } from "express";
interface User {
	name: string;
	email: string;
	password: string;
}
export const addUser = async (user: User, next: NextFunction) => {
	const client = await config.pool.connect();
    console.log("Connected to the database");
	try {
		await client.query("BEGIN");

		const queryText = `INSERT INTO users(full_name, email) VALUES($1, $2) RETURNING id`;
		const res = await client.query(queryText, [user.name, user.email]);

        const queryText2 = `INSERT INTO user_auths(user_id, password_hash) VALUES($1, $2)`;
        await client.query(queryText2, [res.rows[0].id, user.password])
		await client.query("COMMIT");
	} catch (error: any) {
		await client.query("ROLLBACK");
        console.error(error);
        throw new Error('Database query error'); 
	} finally {
		client.release();
	}
};
