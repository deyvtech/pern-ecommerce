import config from "../config.js"
import type { NextFunction } from "express";

export const getUser = async (email: string, next: NextFunction) => {
    try {
         const user = await config.pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return user.rows[0];
    } catch (error) {
        throw new Error('Database query error');
    }
}    