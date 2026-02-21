import type { Request, Response, NextFunction } from "express";
import * as z from "zod"; 
import bcrypt from "bcrypt";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const result = await loginSchema.parseAsync({ email, password }); 
        const saltedPassword = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(result.password, saltedPassword);

        res.status(200).json({ success: true, message: "Login successful", hashedPassword });
    } catch (error: any) {
        next(error);
    }
};