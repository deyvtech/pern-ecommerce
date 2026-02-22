import config from "../config.js"
import logger from "../utils/logger.js";
export const getUserByEmail = async (email: string) => {
    try {
        const textQuery = `
        SELECT 
        u.id, 
        u.full_name, 
        u.email, 
        u.role, 
        u_a.password_hash
        FROM users u
        INNER JOIN user_auths u_a ON  u.id = u_a.id 
        WHERE u.email = $1 AND u_a.provider = 'local'`;

        const user = await config.pool.query(textQuery, [email]);
        logger.info(user.rows[0])
        return user.rows[0];
    } catch (error) {
        console.log(error)
        throw new Error('Database query error');
    }
}    