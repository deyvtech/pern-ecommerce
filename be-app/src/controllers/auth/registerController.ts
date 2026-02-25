import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "../../model/getUserByEmail.js";
import { addUser } from "../../model/addUser.js";
import { registerSchema } from "../../validators/userValidator.js";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try {
        const result = await registerSchema.parseAsync({ name, email, password });
        const saltedPassword = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(result.password, saltedPassword);

        const existingUser = await getUserByEmail(result.email);
        if(existingUser) {
            return res.status(401).json({ success: false, message: "User already exist"});
        }
        const user = {
            name: result.name,
            email: result.email,
            password: hashedPassword
        }
        await addUser(user, next)

        return res.status(201).json({ success: true, message: "Registration successful"});
    } catch (err: any) {
        next(err);
    }
}

