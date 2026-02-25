import config from "../config.js"
export const getUserByEmail = async (email: string) => {
    const query = `
        SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role, 
        ua.password_hash
        FROM users u
        INNER JOIN user_auths ua ON u.id = ua.user_id 
        WHERE u.email = $1 AND ua.provider = 'local'`;
    const values  = [email];
    try {
        const user = await config.pool.query(query, values);
        return user.rows[0];
    } catch (err) {
        console.error(err)
        throw new Error('Database query error');
    }
}    