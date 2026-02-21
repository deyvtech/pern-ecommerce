import type { Request, Response, NextFunction } from "express";
import * as z from "zod"; 
import bcrypt from "bcrypt";

import { getUser } from "../../model/getUser.js";
import { addUser } from "../../model/addUser.js";
const registerSchema = z.object({
    fullname: z.string().min(3).max(100, "Username must be between 3 and 100 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    const { fullname, email, password } = req.body;

    try {
        const result = await registerSchema.parseAsync({ fullname, email, password });
        const saltedPassword = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(result.password, saltedPassword);

        const existingUser = await getUser(result.email, next);
        if(existingUser) {
            throw new Error("User already exist")
        }
        const user = {
            fullname: result.fullname,
            email: result.password,
            password: hashedPassword
        }
        const responseDatabase = await addUser(user, next)
        res.status(200).json({ success: true, message: "Registration successful", hashedPassword });
    } catch (error: any) {
        next(error);
    }
}

