import config from "../config.js"

export const getUserById = async (userId: string) => {
    const { pool } = config;
    const query = `
        SELECT 
        u.id,
        u.name,
        u.email,
        u.role
        FROM users u
        WHERE u.id = $1
    `;
    const values = [userId];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error(error)
        throw new Error('Database query error');
    }
}