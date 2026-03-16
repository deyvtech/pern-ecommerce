import bcrypt from "bcryptjs"
export const hashPassword = async (password: string) => {
    const saltedPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, saltedPassword)
    return hashedPassword
}