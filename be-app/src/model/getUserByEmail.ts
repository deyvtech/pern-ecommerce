import config from "../config.js"
export const getUserByEmail = async (email: string) => {
    try {
        const textQuery = `
        SELECT 
        u.id, 
        u.full_name AS fullname, 
        u.email, 
        u.role, 
        ua.password_hash
        FROM users u
        INNER JOIN user_auths ua ON u.id = ua.user_id 
        WHERE u.email = $1 AND ua.provider = 'local'`;

        const user = await config.pool.query(textQuery, [email]);
        return user.rows[0];
    } catch (err) {
        console.log(err)
        throw new Error('Database query error');
    }
}    