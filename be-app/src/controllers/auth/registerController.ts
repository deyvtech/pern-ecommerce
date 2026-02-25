import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "../../model/getUserByEmail.js";
import { addUser } from "../../model/addUser.js";
import { registerSchema } from "../../validators/userValidator.js";

import { AppError } from "../../middlewares/error.js";
import logger from "../../utils/logger.js";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password } = req.body;

	try {
		const result = await registerSchema.parseAsync({ name, email, password });
		const saltedPassword = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(result.password, saltedPassword);

		const existingUser = await getUserByEmail(result.email);
		if (existingUser) {
			throw new AppError("User already exist", 401);
		}
		const user = {
			name: result.name,
			email: result.email,
			password: hashedPassword,
		};
		await addUser(user, next);
		logger.info(`User ${user.email} registered successfully`);
		return res.status(201).json({ success: true, message: "Registration successful" });
	} catch (error) {
		next(error);
	}
};
