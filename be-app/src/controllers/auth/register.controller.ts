import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "../../services/user.service.js";
import { addUser } from "../../services/user.service.js";

import { registerSchema } from "../../validators/userValidator.js";

import { AppError } from "../../middlewares/error.js";
import logger from "../../utils/logger.js";

import type { User } from "../../types/user.types.js";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password } = req.body;

	try {
		const parsedUser = await registerSchema.parseAsync({ name, email, password });
		const saltedPassword = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(parsedUser.password, saltedPassword);
		
		const existingUser = await getUserByEmail(parsedUser.email);
		if (existingUser) {
			throw new AppError("User already exist", 401);
		}
		const user: User = {
			name: parsedUser.name,
			email: parsedUser.email,
			password: hashedPassword,
		};

		await addUser(user);
		logger.info(`User ${user.email} registered successfully`);
		return res.status(201).json({ success: true, message: "Registration successful" });
	} catch (error) {
		next(error);
	}
};
