import config from "../config.js"
export const updateLogin = async (userId: string) => {
    try {
        const response = await config.pool.query(
            `UPDATE users SET last_sign_in_at = NOW() WHERE id = $1`,
            [userId],
        );
    } catch (err) {
        console.error(err)
        throw new Error('Database query error');
    }
}